import type { VercelRequest, VercelResponse } from "@vercel/node";
import { put } from "@vercel/blob";
import { verifyAdmin, applyCors } from "./_lib/verifyAdmin.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

function safeName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]+/g, "-").slice(0, 120) || "image";
}

function hasBlobCredentials(): boolean {
  return Boolean(process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN);
}

function blobCredentialOptions() {
  const storeId = process.env.BLOB_STORE_ID?.trim();
  // Do not pass BLOB_READ_WRITE_TOKEN explicitly here. On Vercel, @vercel/blob
  // can authenticate with the linked Blob store through OIDC + BLOB_STORE_ID;
  // passing a stale token explicitly overrides that and causes "Access denied".
  return storeId ? { storeId } : {};
}

async function readMultipartFile(
  req: VercelRequest,
): Promise<{ filename: string; contentType: string; buffer: Buffer } | null> {
  const ct = req.headers["content-type"] || "";
  const m = /boundary=(?:"?)([^";]+)/i.exec(ct);
  if (!m) return null;
  const boundary = Buffer.from(`--${m[1]}`);
  const chunks: Buffer[] = [];
  for await (const c of req as unknown as AsyncIterable<Buffer>) {
    chunks.push(typeof c === "string" ? Buffer.from(c) : c);
  }
  const body = Buffer.concat(chunks);
  let start = body.indexOf(boundary);
  if (start < 0) return null;
  while (start >= 0) {
    const next = body.indexOf(boundary, start + boundary.length);
    if (next < 0) break;
    const part = body.slice(start + boundary.length, next);
    const headerEnd = part.indexOf("\r\n\r\n");
    if (headerEnd < 0) { start = next; continue; }
    const header = part.slice(2, headerEnd).toString("utf8"); // skip initial CRLF
    const data = part.slice(headerEnd + 4, part.length - 2); // trim trailing CRLF
    const disp = /name="([^"]+)"(?:; filename="([^"]*)")?/i.exec(header);
    const ctMatch = /content-type:\s*([^\r\n]+)/i.exec(header);
    if (disp && disp[1] === "file" && disp[2]) {
      return {
        filename: disp[2],
        contentType: ctMatch ? ctMatch[1].trim() : "application/octet-stream",
        buffer: data,
      };
    }
    start = next;
  }
  return null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  applyCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  const auth = await verifyAdmin(req);
  if (!auth.ok) return res.status(auth.status).json({ error: auth.error });

  if (!hasBlobCredentials()) {
    return res.status(500).json({ error: "Blob storage is not configured. Set BLOB_STORE_ID on Vercel or BLOB_READ_WRITE_TOKEN for local fallback." });
  }

  try {
    const file = await readMultipartFile(req);
    if (!file) return res.status(400).json({ error: "No file in request" });
    if (!file.contentType.startsWith("image/")) {
      return res.status(400).json({ error: "Only image uploads are allowed" });
    }
    if (file.buffer.length > 15 * 1024 * 1024) {
      return res.status(413).json({ error: "File too large (max 15 MB)" });
    }
    const key = `cms/${Date.now()}-${safeName(file.filename)}`;
    const result = await put(key, file.buffer, {
      access: "private",
      contentType: file.contentType,
      addRandomSuffix: true,
      ...blobCredentialOptions(),
    });
    return res.status(200).json({ url: result.url });
  } catch (e: any) {
    return res.status(500).json({ error: e.message || "Upload failed" });
  }
}

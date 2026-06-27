import type { VercelRequest, VercelResponse } from "@vercel/node";
import { get } from "@vercel/blob";
import { Readable } from "node:stream";

function blobCredentialOptions() {
  const storeId = process.env.BLOB_STORE_ID?.trim();
  return storeId ? { storeId } : {};
}

function parseBlobUrl(input: unknown): URL | null {
  if (typeof input !== "string" || !input.trim()) return null;
  try {
    const url = new URL(input);
    if (url.protocol !== "https:") return null;
    if (!/\.(public|private)\.blob\.vercel-storage\.com$/i.test(url.hostname)) return null;
    return url;
  } catch {
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const blobUrl = parseBlobUrl(req.query.url);
  if (!blobUrl) return res.status(400).json({ error: "Valid Vercel Blob url required" });

  const access = blobUrl.hostname.includes(".private.") ? "private" : "public";

  try {
    const result = await get(blobUrl.toString(), {
      access,
      ...blobCredentialOptions(),
      ifNoneMatch: req.headers["if-none-match"] as string | undefined,
    });

    if (!result) return res.status(404).json({ error: "Blob not found" });
    if (result.statusCode === 304) return res.status(304).end();
    if (!result.blob.contentType?.startsWith("image/")) {
      return res.status(415).json({ error: "Only image blobs can be served here" });
    }

    res.setHeader("Content-Type", result.blob.contentType);
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("ETag", result.blob.etag);
    res.setHeader("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
    if (req.method === "HEAD") return res.status(200).end();

    return Readable.fromWeb(result.stream as any).pipe(res);
  } catch (e: any) {
    return res.status(500).json({ error: e.message || "Blob fetch failed" });
  }
}
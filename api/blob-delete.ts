import type { VercelRequest, VercelResponse } from "@vercel/node";
import { del } from "@vercel/blob";
import { verifyAdmin, applyCors } from "./_lib/verifyAdmin.js";

function hasBlobCredentials(): boolean {
  return Boolean(process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN);
}

function blobCredentialOptions() {
  const storeId = process.env.BLOB_STORE_ID?.trim();
  // Prefer Vercel's linked-store OIDC auth when BLOB_STORE_ID is available.
  // Explicitly passing BLOB_READ_WRITE_TOKEN would override OIDC and can keep
  // using an old/bad token even after the Blob store is correctly linked.
  return storeId ? { storeId } : {};
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
    const body = (typeof req.body === "string" ? JSON.parse(req.body) : req.body) || {};
    const url: string | undefined = body.url;
    if (!url || typeof url !== "string") return res.status(400).json({ error: "url required" });
    if (!url.includes(".public.blob.vercel-storage.com") && !url.includes(".private.blob.vercel-storage.com")) {
      return res.status(200).json({ ok: true, skipped: "not a Vercel Blob URL" });
    }
    await del(url, blobCredentialOptions());
    return res.status(200).json({ ok: true });
  } catch (e: any) {
    return res.status(500).json({ error: e.message || "Delete failed" });
  }
}

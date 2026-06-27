const VERCEL_BLOB_HOST_RE = /\.(public|private)\.blob\.vercel-storage\.com$/i;

export function isVercelBlobUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && VERCEL_BLOB_HOST_RE.test(parsed.hostname);
  } catch {
    return false;
  }
}

export function blobImageSrc(url: string | null | undefined): string {
  if (!url) return "";
  if (!isVercelBlobUrl(url)) return url;
  if (url.includes(".private.blob.vercel-storage.com")) {
    return `/api/blob-file?url=${encodeURIComponent(url)}`;
  }
  return url;
}

export function absoluteBlobImageSrc(url: string | null | undefined): string {
  const src = blobImageSrc(url);
  if (!src || !src.startsWith("/")) return src;
  const origin = typeof window !== "undefined" ? window.location.origin : "https://llmclicks.ai";
  return `${origin}${src}`;
}
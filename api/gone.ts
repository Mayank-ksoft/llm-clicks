// Vercel serverless function: returns HTTP 410 Gone for legacy WordPress paths
// (/wp-admin/*, /wp-content/plugins/*, /wp-*.php). This protects crawl budget
// by signalling permanent removal instead of 404 or soft-404 to homepage.
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.status(410).send("410 Gone — this URL has been permanently removed.");
}

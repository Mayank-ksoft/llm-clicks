// Convert a markdown string into the BlogSection[] / DocSection[] / KHSection[]
// block shape the public renderers already understand. Keeps the existing
// FAQ accordion, internal-link, and image-caption logic working untouched.
//
// Supported syntax (intentionally small — matches what the block types model):
//   # / ## / ###  → h2 / h2 / h3   (h1 promoted to h2; we render a single page H1)
//   paragraph     → { type: "p" }
//   - item        → { type: "ul", items: [...] }
//   * item        → { type: "ul", items: [...] }
//   > quote       → { type: "quote" }
//   ![alt](src)   → { type: "img", src, alt }
//   inline [text](href) is converted to <a href="href">text</a> so the existing
//   renderTextWithLinks() picks it up.
//   **bold** / *italic* are passed through as HTML-safe markers the renderer
//   already handles via plain text (they will appear literally if not parsed —
//   acceptable for now; we can extend later).

export type AnyBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "img"; src: string; alt: string; caption?: string };

const inlineLinks = (s: string) =>
  s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, href) => `<a href="${href}">${text}</a>`);

export function markdownToBlocks(md: string): AnyBlock[] {
  if (!md || !md.trim()) return [];
  const lines = md.replace(/\r\n?/g, "\n").split("\n");
  const out: AnyBlock[] = [];
  let i = 0;
  let para: string[] = [];

  const flushPara = () => {
    if (para.length) {
      const text = inlineLinks(para.join(" ").trim());
      if (text) out.push({ type: "p", text });
      para = [];
    }
  };

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trim();

    if (!line) {
      flushPara();
      i++;
      continue;
    }

    // image: ![alt](src "caption")
    const img = line.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/);
    if (img) {
      flushPara();
      out.push({ type: "img", src: img[2], alt: img[1] || "", caption: img[3] });
      i++;
      continue;
    }

    // headings
    const h = line.match(/^(#{1,6})\s+(.+?)\s*#*$/);
    if (h) {
      flushPara();
      const level = h[1].length;
      const text = inlineLinks(h[2].trim());
      out.push({ type: level >= 3 ? "h3" : "h2", text });
      i++;
      continue;
    }

    // blockquote (group consecutive > lines)
    if (line.startsWith(">")) {
      flushPara();
      const buf: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        buf.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      out.push({ type: "quote", text: inlineLinks(buf.join(" ").trim()) });
      continue;
    }

    // unordered list (group consecutive - / * lines)
    if (/^[-*]\s+/.test(line)) {
      flushPara();
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(inlineLinks(lines[i].trim().replace(/^[-*]\s+/, "")));
        i++;
      }
      out.push({ type: "ul", items });
      continue;
    }

    // ordered list — treat as ul (renderer has no ol type)
    if (/^\d+\.\s+/.test(line)) {
      flushPara();
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(inlineLinks(lines[i].trim().replace(/^\d+\.\s+/, "")));
        i++;
      }
      out.push({ type: "ul", items });
      continue;
    }

    // accumulate paragraph
    para.push(line);
    i++;
  }
  flushPara();
  return out;
}

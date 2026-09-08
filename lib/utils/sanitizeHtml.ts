import sanitizeHtmlLib from "sanitize-html";

const ALLOWED_TAGS = [
  "p",
  "h2",
  "h3",
  "blockquote",
  "strong",
  "em",
  "ul",
  "ol",
  "li",
  "a",
  "img",
  "br",
];

export function sanitizeHtml(dirty: string): string {
  return sanitizeHtmlLib(dirty, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height"],
    },
    allowedSchemes: ["http", "https", "mailto"],
  });
}

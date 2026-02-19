import sanitize from "sanitize-html";

/**
 * Sanitize an HTML string to prevent stored XSS attacks.
 * Allows common content tags including media embeds while stripping
 * dangerous elements like <script>, event handlers, etc.
 */
export function cleanHtml(dirty: string): string {
  return sanitize(dirty, {
    allowedTags: sanitize.defaults.allowedTags.concat([
      "img",
      "iframe",
      "video",
      "source",
      "figure",
      "figcaption",
    ]),
    allowedAttributes: {
      ...sanitize.defaults.allowedAttributes,
      img: ["src", "alt", "width", "height", "class", "loading"],
      iframe: [
        "src",
        "width",
        "height",
        "frameborder",
        "allowfullscreen",
        "class",
      ],
      video: ["src", "controls", "width", "height", "class"],
      source: ["src", "type"],
      a: ["href", "target", "rel", "class"],
      "*": ["class"],
    },
    allowedIframeHostnames: ["www.youtube.com", "player.vimeo.com"],
  });
}

/**
 * Sanitize a string value that may be null/undefined.
 * Returns the original null/undefined if the input is falsy.
 */
export function cleanHtmlNullable(
  dirty: string | null | undefined
): string | null {
  if (!dirty) return dirty as null;
  return cleanHtml(dirty);
}

/**
 * Sanitize all `contentHtml` fields in an array of page section rows.
 * Commonly used before passing CMS sections to client components.
 */
export function sanitizeSections<
  T extends { contentHtml: string | null },
>(sections: T[]): T[] {
  return sections.map((s) => ({
    ...s,
    contentHtml: cleanHtmlNullable(s.contentHtml),
  }));
}

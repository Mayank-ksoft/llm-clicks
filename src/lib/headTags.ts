const syncSingleHeadTag = <T extends HTMLElement>(
  selector: string,
  createTag: () => T,
  updateTag: (tag: T) => void,
) => {
  const tags = Array.from(document.head.querySelectorAll<T>(selector));
  const tag = tags[0] ?? createTag();

  updateTag(tag);
  if (!tag.parentElement) document.head.appendChild(tag);
  tags.slice(1).forEach((duplicate) => duplicate.remove());
};

export const syncRouteHeadTags = (
  title: string,
  description: string,
  canonical: string,
  ogTitle = title,
  ogDescription = description,
) => {
  document.title = title;

  syncSingleHeadTag(
    'meta[name="description"]',
    () => {
      const tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      return tag;
    },
    (tag) => tag.setAttribute("content", description),
  );

  syncSingleHeadTag(
    'link[rel="canonical"]',
    () => {
      const tag = document.createElement("link");
      tag.setAttribute("rel", "canonical");
      return tag;
    },
    (tag) => tag.setAttribute("href", canonical),
  );

  [
    ["og:title", ogTitle],
    ["og:description", ogDescription],
    ["og:url", canonical],
  ].forEach(([property, content]) => {
    syncSingleHeadTag(
      `meta[property="${property}"]`,
      () => {
        const tag = document.createElement("meta");
        tag.setAttribute("property", property);
        return tag;
      },
      (tag) => tag.setAttribute("content", content),
    );
  });

  [
    ["twitter:title", ogTitle],
    ["twitter:description", ogDescription],
  ].forEach(([name, content]) => {
    syncSingleHeadTag(
      `meta[name="${name}"]`,
      () => {
        const tag = document.createElement("meta");
        tag.setAttribute("name", name);
        return tag;
      },
      (tag) => tag.setAttribute("content", content),
    );
  });
};
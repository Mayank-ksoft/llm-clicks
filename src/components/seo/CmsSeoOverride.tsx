import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePageSeo } from "@/hooks/usePageSeo";
import { getCanonicalUrl, getPageMeta } from "@/lib/pageMeta";
import { syncRouteHeadTags } from "@/lib/headTags";

/**
 * Overrides head tags with admin-edited SEO from Lovable Cloud when present.
 * Falls back silently to whatever Layout/Helmet has already set.
 */
const CmsSeoOverride = () => {
  const { pathname } = useLocation();
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
  const { data } = usePageSeo(normalized);
  const fallback = getPageMeta(normalized);

  useEffect(() => {
    if (!data) return;
    syncRouteHeadTags(
      data.meta_title || fallback.title,
      data.meta_description || fallback.description,
      data.canonical_url || getCanonicalUrl(normalized),
      data.og_title || data.meta_title || fallback.title,
      data.og_description || data.meta_description || fallback.description,
    );
  }, [data, fallback.description, fallback.title, normalized]);

  if (!data) return null;

  const schemaText =
    data.schema_jsonld != null
      ? typeof data.schema_jsonld === "string"
        ? data.schema_jsonld
        : JSON.stringify(data.schema_jsonld)
      : null;

  return (
    <Helmet>
      {data.meta_title && <title>{data.meta_title}</title>}
      {data.meta_description && <meta name="description" content={data.meta_description} />}
      {data.canonical_url && <link rel="canonical" href={data.canonical_url} />}
      {data.og_title && <meta property="og:title" content={data.og_title} />}
      {data.og_description && <meta property="og:description" content={data.og_description} />}
      {data.canonical_url && <meta property="og:url" content={data.canonical_url} />}
      {data.og_image && <meta property="og:image" content={data.og_image} />}
      <meta name="twitter:card" content="summary_large_image" />
      {(data.twitter_title || data.og_title) && (
        <meta name="twitter:title" content={(data.twitter_title || data.og_title)!} />
      )}
      {(data.twitter_description || data.og_description) && (
        <meta name="twitter:description" content={(data.twitter_description || data.og_description)!} />
      )}
      {(data.twitter_image || data.og_image) && (
        <meta name="twitter:image" content={(data.twitter_image || data.og_image)!} />
      )}
      {data.robots && <meta name="robots" content={data.robots} />}
      {data.keywords && <meta name="keywords" content={data.keywords} />}
      {schemaText && <script type="application/ld+json">{schemaText}</script>}
    </Helmet>
  );
};

export default CmsSeoOverride;
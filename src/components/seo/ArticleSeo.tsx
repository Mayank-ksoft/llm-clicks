import { Helmet } from "react-helmet-async";
import type { CmsArticleSeo } from "@/hooks/useCmsArticleSeo";
import { absoluteBlobImageSrc } from "@/lib/blobUrls";

/**
 * Renders per-article SEO + Open Graph + Twitter card tags from the CMS.
 * Silently no-ops when no row is loaded so static defaults stay in effect.
 */
const ArticleSeo = ({ data }: { data: CmsArticleSeo | null | undefined }) => {
  if (!data) return null;
  const ogTitle = data.og_title || data.meta_title || data.title || undefined;
  const ogDesc = data.og_description || data.meta_description || data.excerpt || undefined;
  const ogImage = absoluteBlobImageSrc(data.og_image || data.hero_image) || undefined;
  const twTitle = data.twitter_title || ogTitle;
  const twDesc = data.twitter_description || ogDesc;
  const twImage = data.twitter_image || ogImage;
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
      {data.keywords && <meta name="keywords" content={data.keywords} />}
      {data.robots && <meta name="robots" content={data.robots} />}
      {ogTitle && <meta property="og:title" content={ogTitle} />}
      {ogDesc && <meta property="og:description" content={ogDesc} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {data.canonical_url && <meta property="og:url" content={data.canonical_url} />}
      <meta property="og:type" content="article" />
      <meta name="twitter:card" content="summary_large_image" />
      {twTitle && <meta name="twitter:title" content={twTitle} />}
      {twDesc && <meta name="twitter:description" content={twDesc} />}
      {twImage && <meta name="twitter:image" content={twImage} />}
      {schemaText && <script type="application/ld+json">{schemaText}</script>}
    </Helmet>
  );
};

export default ArticleSeo;
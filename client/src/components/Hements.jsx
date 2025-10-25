import { Helmet } from "react-helmet-async";

function Hements({ title, imageUrl, url, children }) {
  return (
    <>
      <Helmet>
        {/* Page Title */}
        <title>TopBlog - | {title}</title>

        {/* Open Graph Meta */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        {url && <meta property="og:url" content={url} />}
        {imageUrl && <meta property="og:image" content={imageUrl} />}

        {/* Twitter Meta */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        {url && <meta name="twitter:url" content={url} />}
        {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      </Helmet>

      {children}
    </>
  );
}

export default Hements;

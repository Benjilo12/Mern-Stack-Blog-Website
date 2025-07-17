import { useEffect } from "react";

function Hements({ title, imageUrl, url, children }) {
  useEffect(() => {
    // Update the document title
    document.title = `TopBlog - | ${title}`;

    // Set or update meta tags for social sharing
    const setMetaTag = (name, content) => {
      let tag =
        document.querySelector(`meta[name="${name}"]`) ||
        document.querySelector(`meta[property="${name}"]`);

      if (!tag) {
        tag = document.createElement("meta");
        if (name.startsWith("og:")) {
          tag.setAttribute("property", name);
        } else {
          tag.setAttribute("name", name);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    // Basic meta tags
    setMetaTag("og:type", "website");
    setMetaTag("og:title", title);
    setMetaTag("og:url", url);

    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:url", url);

    // Image meta tags if provided
    if (imageUrl) {
      setMetaTag("og:image", imageUrl);
      setMetaTag("twitter:image", imageUrl);
    }

    return () => {
      // Cleanup if needed
    };
  }, [title, imageUrl, url]);

  return <div>{children}</div>;
}

export default Hements;

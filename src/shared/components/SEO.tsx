import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
}

export default function SEO({ title, description, url = window.location.href, image = "/preview.png" }: SEOProps) {
  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />

      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "LabConnect",
            "url": "${url}",
            "logo": "${image}"
          }
        `}
      </script>
    </Helmet>
  );
}
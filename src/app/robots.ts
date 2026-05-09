import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"], // Usually, we don't want search engines indexing API routes
    },
    sitemap: "https://quantumblaze.lk/sitemap.xml",
  };
}

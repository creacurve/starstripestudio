import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/pricing", "/login", "/signup"],
        disallow: ["/dashboard", "/generate", "/gallery", "/settings", "/api/"],
      },
    ],
    sitemap: "https://www.starstripestudio.com/sitemap.xml",
  };
}

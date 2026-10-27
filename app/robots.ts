import type { MetadataRoute } from "next";
import { SITE_BASE_URL } from "@/lib/api";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/checkout", "/cart", "/orders/", "/login"] },
    sitemap: `${SITE_BASE_URL}/sitemap.xml`,
  };
}

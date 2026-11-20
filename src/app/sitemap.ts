import type { MetadataRoute } from "next";
import { site, nav, policyNav } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [...nav, ...policyNav].map((item) => item.href);
  const unique = Array.from(new Set(routes));
  const now = new Date();

  return unique.map((href) => {
    const isHome = href === "/";
    const isProduct = href === "/product";
    return {
      url: `${site.url}${isHome ? "" : href}`,
      lastModified: now,
      changeFrequency: isHome || isProduct ? "weekly" : "monthly",
      priority: isHome ? 1 : isProduct ? 0.9 : 0.6,
    };
  });
}

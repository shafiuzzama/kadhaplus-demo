import type { MetadataRoute } from "next";
import { site, nav, policyNav } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [...nav, ...policyNav].map((item) => item.href);
  const unique = Array.from(new Set(routes));
  return unique.map((href) => ({
    url: `${site.url}${href === "/" ? "" : href}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: href === "/" ? 1 : 0.7,
  }));
}

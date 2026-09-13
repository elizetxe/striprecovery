import type { MetadataRoute } from "next";
import { site } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ["", "/book", "/legal"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}

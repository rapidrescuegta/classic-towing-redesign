import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // Single-page site — only the root URL is a real crawlable address.
  // Anchor fragments (#services, #fleet, etc.) are ignored by crawlers
  // and would just dilute the sitemap.
  return [
    {
      url: 'https://classictowing.ca/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ]
}

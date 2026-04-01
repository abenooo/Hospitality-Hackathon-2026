import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const now = new Date();
  const paths = ['', '/homepage', '/guest-experience', '/operator-dashboard'];
  return paths.map((path) => ({
    url: `${base}${path || '/'}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' || path === '/homepage' ? 1 : 0.8,
  }));
}

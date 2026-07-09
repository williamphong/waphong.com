import type { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/data';

const BASE_URL = 'https://waphong.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/experience', '/projects', '/gallery', '/blog'].map(
    (path) => ({
      url: `${BASE_URL}${path}`,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.8,
    })
  );

  const posts = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.id}`,
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }));

  return [...pages, ...posts];
}

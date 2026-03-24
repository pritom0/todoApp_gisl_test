import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const domain = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || 'localhost:3000';
  const protocol = domain.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${domain}`;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/practice/parallelRoute/loginAction'], // Block private or action routes
      },
    ],
    // This dynamically points to the sitemap we just built!
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

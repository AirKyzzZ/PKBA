import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/admin/*',
          '/_next/',
          '/checkout/',
          '/checkout/*',
          '/donations/',
          '/donations/*',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/admin/*',
          '/api/',
          '/checkout/',
          '/checkout/*',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/admin/',
          '/admin/*',
          '/api/',
          '/checkout/',
          '/checkout/*',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'Slurp',
        allow: '/',
        disallow: [
          '/admin/',
          '/admin/*',
          '/api/',
          '/checkout/',
          '/checkout/*',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        disallow: [
          '/admin/',
          '/admin/*',
          '/api/',
          '/checkout/',
          '/checkout/*',
        ],
        crawlDelay: 1,
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/sitemap.xml`,
    host: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  }
} 
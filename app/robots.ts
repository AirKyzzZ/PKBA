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
    sitemap: 'https://pkba.vertiflow.fr/sitemap.xml',
    host: 'https://pkba.vertiflow.fr',
  }
} 
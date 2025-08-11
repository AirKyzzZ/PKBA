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
        ],
      },
      {
        userAgent: 'Googlebot',
        disallow: ['/admin/', '/admin/*'],
      },
      {
        userAgent: 'Bingbot',
        disallow: ['/admin/', '/admin/*'],
      },
    ],
    sitemap: 'https://pkba.vertiflow.fr/sitemap.xml',
  }
} 
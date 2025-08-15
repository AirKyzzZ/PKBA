import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const currentDate = new Date()
  
  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/boutique`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/boutique/tshirt`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/inscription`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/actualites`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/donations`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politique-confidentialite`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/reglement-interieur`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cgv`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
} 
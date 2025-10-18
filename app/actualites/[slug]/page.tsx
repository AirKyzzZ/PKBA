import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { articles, getArticleBySlug } from '@/content/articles'
import StructuredData from '@/components/StructuredData'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const canonicalUrl = `${baseUrl}/actualites/${article.slug}`
  const title = `${article.title} | Actualités PKBA`
  const description = article.excerpt

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    keywords: [
      'PKBA',
      'Parkour Bassin d\'Arcachon',
      'Actualités PKBA',
      'Club Parkour',
      article.category,
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      url: canonicalUrl,
      publishedTime: new Date(article.date).toISOString(),
      authors: [article.author],
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [article.image],
    },
  }
}

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug)
  if (!article) return notFound()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: [`${baseUrl}${article.image}`],
    author: {
      '@type': 'Organization',
      name: article.author,
    },
    datePublished: new Date(article.date).toISOString(),
    dateModified: new Date(article.date).toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/actualites/${article.slug}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'PKBA - Parkour Bassin d\'Arcachon',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/transparent_full.png`,
      },
    },
  }

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
      <StructuredData type={'organization'} data={{}} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-cheddar font-bold mb-3">
            {article.title}
          </h1>
          <p className="text-white/90 font-montserrat">{article.excerpt}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-gray-200">
            <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-montserrat font-medium">
              {article.category}
            </span>
            <span className="text-gray-600 font-montserrat text-sm">{formatDate(article.date)}</span>
            <span className="text-gray-600 font-montserrat text-sm">{article.author}</span>
            <span className="text-gray-600 font-montserrat text-sm">{article.readTime}</span>
          </div>

          <div
            className="prose prose-lg max-w-none font-montserrat text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </section>
    </div>
  )
}



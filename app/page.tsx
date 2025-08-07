import Hero from '@/components/Hero'
import Mission from '@/components/Mission'
import Features from '@/components/Features'
import CTA from '@/components/CTA'

export default function Home() {
  return (
    <div className="pt-16 lg:pt-20">
      <Hero />
      <Mission />
      <Features />
      <CTA />
    </div>
  )
} 
import Hero from '@/components/Hero'
import Mission from '@/components/Mission'
import Features from '@/components/Features'
import ScheduleHighlight from '@/components/ScheduleHighlight'
import CTA from '@/components/CTA'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Mission />
      <Features />
      <ScheduleHighlight />
      <CTA />
    </div>
  )
} 
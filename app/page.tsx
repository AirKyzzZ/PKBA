import Hero from '@/components/Hero'
import VideoReportage from '@/components/VideoReportage'
import Mission from '@/components/Mission'
import Features from '@/components/Features'
import ScheduleHighlight from '@/components/ScheduleHighlight'
import CTA from '@/components/CTA'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <VideoReportage />
      <Mission />
      <Features />
      <ScheduleHighlight />
      <CTA />
    </div>
  )
} 
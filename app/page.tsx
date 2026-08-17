import Hero from '@/components/Hero'
import VideoReportage from '@/components/VideoReportage'
import Mission from '@/components/Mission'
import Features from '@/components/Features'
import ScheduleHighlight from '@/components/ScheduleHighlight'
import { getUpcomingStages } from '@/content/stages'
import Location from '@/components/Location'
import GalaSection from '@/components/GalaSection'
import CTA from '@/components/CTA'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero initialStageIds={getUpcomingStages().map((stage) => stage.id)} />
      <VideoReportage />
      <GalaSection />
      <Mission />
      <Location />
      <Features />
      <ScheduleHighlight initialStageIds={getUpcomingStages().map((stage) => stage.id)} />
      <CTA />
    </div>
  )
}

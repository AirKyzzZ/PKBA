'use client'

import { STAGES } from '@/content/stages'
import type { StageId } from '@/content/stages'
import { useUpcomingStageIds } from '@/lib/use-upcoming-stages'
import StagesHighlight from './StagesHighlight'
import SeasonHighlight from './SeasonHighlight'

const ScheduleHighlight = ({ initialStageIds }: { initialStageIds: StageId[] }) => {
  const stageIds = useUpcomingStageIds(initialStageIds)

  if (stageIds.length === 0) return <SeasonHighlight />

  return <StagesHighlight stages={stageIds.map((id) => STAGES[id])} />
}

export default ScheduleHighlight

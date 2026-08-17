'use client'

import { useEffect, useState } from 'react'
import { getUpcomingStages } from '@/content/stages'
import type { StageId } from '@/content/stages'

export function useUpcomingStageIds(initial: StageId[]): StageId[] {
  const [ids, setIds] = useState<StageId[]>(initial)

  useEffect(() => {
    setIds(getUpcomingStages().map((stage) => stage.id))
  }, [])

  return ids
}

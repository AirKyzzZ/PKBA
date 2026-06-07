import { Clock, User, Lock } from 'lucide-react'
import {
  WEEKLY_SCHEDULE,
  SCHEDULE_CATEGORIES,
  SELECTION_NOTE,
} from '@/content/schedule'

export function WeeklySchedule() {
  return (
    <div>
      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-4">
        {Object.values(SCHEDULE_CATEGORIES).map((cat) => (
          <span key={cat.label} className="inline-flex items-center gap-2 text-sm font-montserrat">
            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
            <span className="font-semibold text-gray-800">{cat.label}</span>
            {cat.note && <span className="text-gray-500">({cat.note})</span>}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mb-8 text-sm font-montserrat font-semibold text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2 max-w-xl mx-auto">
        <Lock size={16} className="flex-shrink-0" />
        <span>{SELECTION_NOTE}</span>
      </div>

      {/* Day rows */}
      <div className="space-y-3">
        {WEEKLY_SCHEDULE.map((day) => (
          <div key={day.day} className="flex flex-col sm:flex-row gap-3">
            <div className="sm:w-36 flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white font-cheddar font-bold uppercase tracking-wide py-2 sm:py-0 text-lg">
              {day.day}
            </div>
            <div className="flex-1 flex flex-wrap gap-2">
              {day.slots.map((slot, i) => {
                const cat = SCHEDULE_CATEGORIES[slot.category]
                return (
                  <div
                    key={`${day.day}-${i}`}
                    className="flex-1 min-w-[230px] bg-white rounded-xl border border-gray-100 shadow-sm p-3"
                    style={{ borderLeft: `5px solid ${cat.color}` }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Clock size={15} className="text-primary flex-shrink-0" />
                      <span className="font-montserrat font-bold text-gray-900">{slot.time}</span>
                    </div>
                    <div className="font-montserrat font-semibold text-gray-800 text-sm leading-tight">
                      {slot.group}
                    </div>
                    <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-1.5 text-xs font-montserrat text-gray-500">
                      <span className="inline-flex items-center gap-1">
                        <User size={13} />
                        {slot.coach}
                      </span>
                      {cat.selection && (
                        <span className="font-semibold" style={{ color: cat.color }}>
                          sur sélection
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

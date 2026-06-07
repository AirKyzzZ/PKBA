import { AlertCircle, Euro } from 'lucide-react'
import {
  SEASON_TARIFS,
  INCLUDED_FEES,
  INCLUDED_FEES_TOTAL,
  TARIFS_PROVISIONAL,
  TARIFS_DISCLAIMER,
} from '@/content/tarifs'

export function TarifsTable() {
  return (
    <div className="max-w-3xl mx-auto">
      {TARIFS_PROVISIONAL && (
        <div className="flex items-center gap-2 mb-6 text-sm font-montserrat font-semibold text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
          <AlertCircle size={18} className="flex-shrink-0" />
          <span>{TARIFS_DISCLAIMER}</span>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-primary to-secondary text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-montserrat font-semibold">Groupe</th>
              <th className="px-4 py-3 text-left text-sm font-montserrat font-semibold hidden sm:table-cell">
                Durée par semaine
              </th>
              <th className="px-4 py-3 text-right text-sm font-montserrat font-semibold">Tarif annuel</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {SEASON_TARIFS.map((row) => (
              <tr key={row.group} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="font-montserrat font-semibold text-gray-900">{row.group}</div>
                  <div className="text-xs text-gray-500 font-montserrat sm:hidden">{row.duration}</div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 font-montserrat hidden sm:table-cell">
                  {row.duration}
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="inline-flex items-center gap-1 font-montserrat font-bold text-primary text-lg">
                    {row.price}
                    <Euro size={16} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 bg-gray-50 rounded-xl p-5 sm:p-6">
        <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-4 text-center">
          Inclus dans tous les tarifs
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {INCLUDED_FEES.map((fee) => (
            <div
              key={fee.item}
              className="flex items-center justify-between bg-white rounded-lg px-4 py-3 shadow-sm"
            >
              <span className="text-sm font-montserrat text-gray-700 font-medium">{fee.item}</span>
              <span className="text-sm font-montserrat text-primary font-semibold">{fee.price}€</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-sm font-montserrat text-gray-600">
          Total des frais inclus :{' '}
          <span className="font-semibold text-primary">{INCLUDED_FEES_TOTAL}€</span>
        </p>
      </div>
    </div>
  )
}

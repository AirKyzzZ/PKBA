import PréinscriptionsList from '@/components/PréinscriptionsList'
import AdminAuth from '@/components/AdminAuth'

export const metadata = {
  title: 'Administration - Préinscriptions | PKBA',
  description: 'Gestion des préinscriptions de l\'association PKBA'
}

export default function AdminInscriptionsPage() {
  return (
    <AdminAuth>
      <PréinscriptionsList />
    </AdminAuth>
  )
}

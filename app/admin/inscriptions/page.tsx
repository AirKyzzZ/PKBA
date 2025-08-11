import InscriptionsList from '@/components/InscriptionsList'
import AdminAuth from '@/components/AdminAuth'

export const metadata = {
  title: 'Administration - Inscriptions | PKBA',
  description: 'Gestion des inscriptions de l\'association PKBA'
}

export default function AdminInscriptionsPage() {
  return (
    <AdminAuth>
      <InscriptionsList />
    </AdminAuth>
  )
}

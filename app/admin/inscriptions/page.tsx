import PreInscriptionsList from '@/components/PreInscriptionsList'
import AdminAuth from '@/components/AdminAuth'

export const metadata = {
  title: 'Administration - Pré-inscriptions | PKBA',
  description: 'Gestion des pré-inscriptions de l\'association PKBA'
}

export default function AdminInscriptionsPage() {
  return (
    <AdminAuth>
      <PreInscriptionsList />
    </AdminAuth>
  )
}

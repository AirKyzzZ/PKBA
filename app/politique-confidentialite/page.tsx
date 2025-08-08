export const metadata = {
  title: 'Politique de Confidentialité - PKBA',
  description: 'Politique de confidentialité et protection des données personnelles - PKBA.',
}

export default function PolitiqueConfidentialite() {
  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-cheddar font-bold text-gray-900 mb-8">
          Politique de Confidentialité
        </h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8 font-montserrat text-gray-700">
          <section>
            <h2 className="text-2xl font-cheddar font-bold text-gray-900 mb-4">
              Introduction
            </h2>
            <p>
              PKBA - Parkour Bassin d'Arcachon s'engage à protéger la vie privée de ses utilisateurs. Cette politique de confidentialité décrit comment nous collectons, utilisons et protégeons vos informations personnelles conformément au Règlement Général sur la Protection des Données (RGPD).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-cheddar font-bold text-gray-900 mb-4">
              Responsable du traitement
            </h2>
            <p>
              <strong>PKBA - Parkour Bassin d'Arcachon</strong><br />
              Association loi 1901<br />
              Bassin d'Arcachon, France<br />
              Email : parkourBA33@gmail.com<br />
              Téléphone : 06 60 14 71 44
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-cheddar font-bold text-gray-900 mb-4">
              Données collectées
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Données d'identification
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Nom et prénom</li>
                  <li>Adresse email</li>
                  <li>Numéro de téléphone</li>
                  <li>Date de naissance</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Données de commande
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Adresse de livraison</li>
                  <li>Informations de paiement (via Stripe)</li>
                  <li>Historique des commandes</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Données de don
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Nom, prénom et coordonnées complètes</li>
                  <li>Raison sociale (si applicable)</li>
                  <li>Montant du don</li>
                  <li>Signature électronique</li>
                  <li>Informations de paiement (via Stripe)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Données techniques
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Adresse IP</li>
                  <li>Données de navigation</li>
                  <li>Cookies</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-cheddar font-bold text-gray-900 mb-4">
              Finalités du traitement
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Gestion des inscriptions
                </h3>
                <p>Collecte et traitement des informations nécessaires à l'inscription au club et à la gestion des adhérents.</p>
              </div>
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Gestion des commandes
                </h3>
                <p>Traitement des commandes de la boutique en ligne et gestion des paiements.</p>
              </div>
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Gestion des dons
                </h3>
                <p>Traitement des dons, génération des reçus fiscaux et conformité aux obligations légales.</p>
              </div>
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Communication
                </h3>
                <p>Envoi d'informations relatives aux activités du club, planning d'entraînement, et actualités.</p>
              </div>
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Support client
                </h3>
                <p>Réponse aux demandes de contact et support technique.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-cheddar font-bold text-gray-900 mb-4">
              Base légale
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Exécution d'un contrat
                </h3>
                <p>Pour la gestion des inscriptions et des commandes.</p>
              </div>
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Intérêt légitime
                </h3>
                <p>Pour la communication relative aux activités du club et l'amélioration de nos services.</p>
              </div>
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Consentement
                </h3>
                <p>Pour l'envoi de communications marketing (avec possibilité de désinscription).</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-cheddar font-bold text-gray-900 mb-4">
              Destinataires des données
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Interne
                </h3>
                <p>Les membres de l'équipe PKBA autorisés à accéder aux données pour les finalités définies.</p>
              </div>
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Prestataires externes
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Stripe (paiements)</li>
                  <li>EmailJS (notifications)</li>
                  <li>Formspree (formulaires)</li>
                  <li>Netlify (hébergement)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-cheddar font-bold text-gray-900 mb-4">
              Durée de conservation
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Données d'inscription
                </h3>
                <p>Conservées pendant la durée d'adhésion + 3 ans après la fin de l'adhésion.</p>
              </div>
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Données de commande
                </h3>
                <p>Conservées pendant 10 ans pour des raisons comptables et fiscales.</p>
              </div>
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Données de don
                </h3>
                <p>Conservées pendant 10 ans pour des raisons comptables, fiscales et légales (conformité aux articles 200, 200 bis et 238 bis du code des Impôts).</p>
              </div>
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Données de contact
                </h3>
                <p>Conservées pendant 3 ans après le dernier contact.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-cheddar font-bold text-gray-900 mb-4">
              Vos droits
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Droit d'accès
                </h3>
                <p>Vous pouvez demander à connaître les données que nous détenons sur vous.</p>
              </div>
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Droit de rectification
                </h3>
                <p>Vous pouvez demander la correction de données inexactes.</p>
              </div>
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Droit à l'effacement
                </h3>
                <p>Vous pouvez demander la suppression de vos données dans certaines conditions.</p>
              </div>
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Droit à la portabilité
                </h3>
                <p>Vous pouvez demander la récupération de vos données dans un format structuré.</p>
              </div>
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Droit d'opposition
                </h3>
                <p>Vous pouvez vous opposer au traitement de vos données pour certaines finalités.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-cheddar font-bold text-gray-900 mb-4">
              Sécurité
            </h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre la perte, l'accès non autorisé, la divulgation, l'altération et la destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-cheddar font-bold text-gray-900 mb-4">
              Cookies
            </h2>
            <p>
              Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela peut affecter certaines fonctionnalités du site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-cheddar font-bold text-gray-900 mb-4">
              Contact
            </h2>
            <p>
              Pour exercer vos droits ou pour toute question concernant cette politique de confidentialité, contactez-nous à : parkourBA33@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-cheddar font-bold text-gray-900 mb-4">
              Modifications
            </h2>
            <p>
              Cette politique de confidentialité peut être mise à jour. Nous vous informerons de tout changement significatif par email ou via notre site web.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
} 
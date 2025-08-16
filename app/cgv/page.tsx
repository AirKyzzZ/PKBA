export const metadata = {
  title: 'Conditions Générales de Vente - PKBA',
  description: 'Conditions générales de vente de la boutique PKBA - Parkour Bassin d\'Arcachon.',
}

export default function CGV() {
  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-cheddar font-bold text-gray-900 mb-8">
          Conditions Générales de Vente
        </h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8 font-montserrat text-gray-700">
          <section>
            <h2 className="text-2xl font-cheddar font-bold text-gray-900 mb-4">
              Préambule
            </h2>
            <p>
              Les présentes Conditions Générales de Vente (CGV) s'appliquent à toutes les commandes passées sur le site web de {process.env.NEXT_PUBLIC_SITE_NAME}. En passant commande, vous acceptez sans réserve les présentes conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-cheddar font-bold text-gray-900 mb-4">
              Éditeur
            </h2>
            <p>
              <strong>{process.env.NEXT_PUBLIC_SITE_NAME}</strong><br />
              Association loi 1901<br />
              SIREN : 990115685<br />
              SIRET (siège social) : 99011568500010<br />
              Code APE : 93.12Z<br />
              Bassin d'Arcachon, France<br />
              Email : parkourBA33@gmail.com<br />
              Téléphone : 06 60 14 71 44
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-cheddar font-bold text-gray-900 mb-4">
              Produits
            </h2>
            <p>
              PKBA propose à la vente des vêtements et accessoires officiels du club, notamment des T-shirts personnalisables. Les produits sont décrits avec le plus de précision possible sur le site. Les images des produits sont non contractuelles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-cheddar font-bold text-gray-900 mb-4">
              Commandes
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Processus de commande
                </h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Sélection des produits dans la boutique</li>
                  <li>Personnalisation (nom de l'athlète) si applicable</li>
                  <li>Validation du panier</li>
                  <li>Saisie des informations de livraison</li>
                  <li>Paiement sécurisé via Stripe</li>
                  <li>Confirmation de commande par email</li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Validation
                </h3>
                <p>La commande est considérée comme ferme à réception de l'email de confirmation. PKBA se réserve le droit de refuser toute commande pour des motifs légitimes.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-cheddar font-bold text-gray-900 mb-4">
              Prix
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Prix affichés
                </h3>
                <p>Les prix sont exprimés en euros, toutes taxes comprises (TVA incluse). Les frais de livraison sont calculés selon le mode de livraison choisi.</p>
              </div>
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Modification des prix
                </h3>
                <p>PKBA se réserve le droit de modifier ses prix à tout moment. Les prix applicables sont ceux en vigueur au jour de la commande.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-cheddar font-bold text-gray-900 mb-4">
              Paiement
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Moyens de paiement
                </h3>
                <p>Le paiement s'effectue en ligne via la plateforme sécurisée Stripe. Les moyens de paiement acceptés sont : cartes bancaires (Visa, Mastercard, American Express).</p>
              </div>
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Sécurité
                </h3>
                <p>Les données de paiement sont cryptées et transmises de manière sécurisée. PKBA ne conserve aucune donnée bancaire.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-cheddar font-bold text-gray-900 mb-4">
              Livraison
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Délais de livraison
                </h3>
                <p>Les commandes sont expédiées sous 3 à 5 jours ouvrés après validation du paiement. Les délais de livraison dépendent du transporteur choisi.</p>
              </div>
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Zones de livraison
                </h3>
                <p>Livraison en France métropolitaine uniquement.</p>
              </div>
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Frais de livraison
                </h3>
                <p>Les frais de livraison rapide sont systématiques et calculés selon le poids et la destination.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-cheddar font-bold text-gray-900 mb-4">
              Droit de rétractation
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Délai de rétractation
                </h3>
                <p>Vous disposez d'un délai de 14 jours à compter de la réception de votre commande pour exercer votre droit de rétractation sans avoir à justifier de motifs ni à payer de pénalités.</p>
              </div>
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Modalités de retour
                </h3>
                <p>Pour exercer votre droit de rétractation, vous devez nous informer de votre décision par email à parkourBA33@gmail.com. Les produits doivent être retournés dans leur état d'origine, non utilisés et dans leur emballage d'origine.</p>
              </div>
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Remboursement
                </h3>
                <p>Le remboursement sera effectué dans un délai maximum de 14 jours à compter de la réception de votre demande de rétractation.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-cheddar font-bold text-gray-900 mb-4">
              Garanties
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Garantie légale
                </h3>
                <p>Les produits bénéficient de la garantie légale de conformité et de la garantie des vices cachés, dans les conditions prévues par le Code de la consommation.</p>
              </div>
              <div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  Garantie commerciale
                </h3>
                <p>PKBA garantit la qualité de ses produits pendant 2 ans à compter de la livraison.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-cheddar font-bold text-gray-900 mb-4">
              Protection des données
            </h2>
            <p>
              La collecte et le traitement de vos données personnelles sont régis par notre Politique de Confidentialité, accessible sur notre site web.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-cheddar font-bold text-gray-900 mb-4">
              Droit applicable
            </h2>
            <p>
              Les présentes CGV sont soumises au droit français. En cas de litige, les tribunaux français sont seuls compétents.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-cheddar font-bold text-gray-900 mb-4">
              Contact
            </h2>
            <p>
              Pour toute question concernant ces conditions générales de vente, contactez-nous à : parkourBA33@gmail.com
            </p>
          </section>
        </div>
      </div>
    </div>
  )
} 
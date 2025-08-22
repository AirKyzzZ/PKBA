'use client'

import { useState } from 'react'
import { Download, FileText, User, Calendar, FileDown } from 'lucide-react'
import { motion } from 'framer-motion'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const ReglementPDF = () => {
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePDF = async () => {
    setIsGenerating(true)
    
    try {
      // Créer le contenu HTML pour le PDF
      const content = `
        <div style="font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; max-width: 800px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 40px; border-bottom: 2px solid #333; padding-bottom: 20px;">
            <div style="font-size: 24px; font-weight: bold; margin-bottom: 10px;">RÈGLEMENT INTÉRIEUR</div>
            <div style="font-size: 16px; color: #666;">ASSOCIATION PKBA - PARKOUR BASSIN D'ARCACHON</div>
          </div>

          <div style="margin-bottom: 30px;">
            <div style="font-size: 18px; font-weight: bold; margin-bottom: 15px; color: #333;">1. ADHÉSION ET INSCRIPTION</div>
            <div style="margin-bottom: 8px; padding-left: 20px;">• L'adhésion est ouverte à toute personne âgée d'au moins 6 ans</div>
            <div style="margin-bottom: 8px; padding-left: 20px;">• Un certificat médical de non-contre-indication à la pratique du parkour est obligatoire</div>
            <div style="margin-bottom: 8px; padding-left: 20px;">• L'inscription se fait sur présentation d'une pièce d'identité et du certificat médical</div>
            <div style="margin-bottom: 8px; padding-left: 20px;">• Les mineurs doivent fournir une autorisation parentale signée</div>
            <div style="margin-bottom: 8px; padding-left: 20px;">• L'adhésion est valable pour la saison sportive (septembre à juillet)</div>
          </div>

          <div style="margin-bottom: 30px;">
            <div style="font-size: 18px; font-weight: bold; margin-bottom: 15px; color: #333;">2. RÈGLES DE SÉCURITÉ</div>
            <div style="margin-bottom: 8px; padding-left: 20px;">• Le port de chaussures de sport adaptées est obligatoire</div>
            <div style="margin-bottom: 8px; padding-left: 20px;">• Les bijoux et accessoires dangereux sont interdits pendant l'entraînement</div>
            <div style="margin-bottom: 8px; padding-left: 20px;">• Respecter les consignes de sécurité données par les encadrants</div>
            <div style="margin-bottom: 8px; padding-left: 20px;">• Ne pas pratiquer de figures dangereuses sans l'accord de l'encadrant</div>
            <div style="margin-bottom: 8px; padding-left: 20px;">• Signaler immédiatement tout incident ou blessure</div>
          </div>

          <div style="margin-bottom: 30px;">
            <div style="font-size: 18px; font-weight: bold; margin-bottom: 15px; color: #333;">3. HORAIRES ET PONCTUALITÉ</div>
            <div style="margin-bottom: 8px; padding-left: 20px;">• Les entraînements ont lieu aux horaires définis en début de saison</div>
            <div style="margin-bottom: 8px; padding-left: 20px;">• Arriver 10 minutes avant le début de l'entraînement</div>
            <div style="margin-bottom: 8px; padding-left: 20px;">• En cas de retard, demander l'autorisation de rejoindre le groupe</div>
            <div style="margin-bottom: 8px; padding-left: 20px;">• Prévenir l'encadrant en cas d'absence prévue</div>
            <div style="margin-bottom: 8px; padding-left: 20px;">• Les entraînements commencent et finissent à l'heure précise</div>
          </div>

          <div style="margin-bottom: 30px;">
            <div style="font-size: 18px; font-weight: bold; margin-bottom: 15px; color: #333;">4. LIEUX D'ENTRAÎNEMENT</div>
            <div style="margin-bottom: 8px; padding-left: 20px;">• Respecter les lieux d'entraînement et leur environnement</div>
            <div style="margin-bottom: 8px; padding-left: 20px;">• Ne pas dégrader le matériel ou les installations</div>
            <div style="margin-bottom: 8px; padding-left: 20px;">• Ranger le matériel utilisé après chaque séance</div>
            <div style="margin-bottom: 8px; padding-left: 20px;">• Respecter les règles spécifiques de chaque lieu</div>
            <div style="margin-bottom: 8px; padding-left: 20px;">• Signaler tout problème constaté sur les installations</div>
          </div>

          <div style="margin-bottom: 30px;">
            <div style="font-size: 18px; font-weight: bold; margin-bottom: 15px; color: #333;">5. COMPORTEMENT ET RESPECT</div>
            <div style="margin-bottom: 8px; padding-left: 20px;">• Respecter les autres adhérents et l'équipe d'encadrement</div>
            <div style="margin-bottom: 8px; padding-left: 20px;">• Respecter les encadrants</div>
            <div style="margin-bottom: 8px; padding-left: 20px;">• Adopter un langage correct et respectueux</div>
            <div style="margin-bottom: 8px; padding-left: 20px;">• Éviter les comportements dangereux ou perturbateurs</div>
            <div style="margin-bottom: 8px; padding-left: 20px;">• Participer activement et positivement aux entraînements</div>
            <div style="margin-bottom: 8px; padding-left: 20px;">• Respecter les valeurs de l'association : solidarité, respect, progression</div>
          </div>

          <div style="margin-bottom: 30px;">
            <div style="font-size: 18px; font-weight: bold; margin-bottom: 15px; color: #333;">6. SANCTIONS ET EXCLUSIONS</div>
            <div style="margin-bottom: 8px; padding-left: 20px;">• Tout manquement aux règles peut entraîner un avertissement</div>
            <div style="margin-bottom: 8px; padding-left: 20px;">• En cas de récidive, une suspension temporaire peut être prononcée</div>
            <div style="margin-bottom: 8px; padding-left: 20px;">• Les comportements graves peuvent entraîner l'exclusion définitive</div>
            <div style="margin-bottom: 8px; padding-left: 20px;">• Les décisions sont prises par le conseil d'administration</div>
            <div style="margin-bottom: 8px; padding-left: 20px;">• Un recours est possible auprès du bureau de l'association</div>
          </div>

          <div style="margin-top: 60px; border-top: 1px solid #ccc; padding-top: 30px;">
            <div style="border: 2px solid #333; padding: 20px; margin: 20px 0; text-align: center;">
              <div style="margin-bottom: 20px;">Signature de l'adhérent (ou du représentant légal si mineur)</div>
              <div style="border-bottom: 1px solid #333; width: 200px; margin: 10px auto; height: 40px;"></div>
              <div style="margin-top: 20px;">
                <strong>Nom et Prénom :</strong> _________________________________<br>
                <strong>Date :</strong> _________________________________<br>
                <strong>Lieu :</strong> _________________________________
              </div>
            </div>
          </div>

          <div style="margin-top: 40px; font-size: 12px; color: #666; text-align: center;">
            <p>Ce règlement intérieur est approuvé par le conseil d'administration de l'association PKBA.</p>
            <p>Il peut être modifié à tout moment par décision du conseil d'administration.</p>
            <p>Dernière mise à jour : ${new Date().toLocaleDateString('fr-FR')}</p>
            <p>Contact : contact@pkba.fr - Tél : 06 60 14 71 44</p>
          </div>
        </div>
      `

      // Créer un élément temporaire pour le contenu
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = content
      tempDiv.style.position = 'absolute'
      tempDiv.style.left = '-9999px'
      tempDiv.style.top = '0'
      document.body.appendChild(tempDiv)

      // Convertir le HTML en canvas
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      })

      // Nettoyer l'élément temporaire
      document.body.removeChild(tempDiv)

      // Créer le PDF
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      // Ajouter la première page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      // Ajouter des pages supplémentaires si nécessaire
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      // Télécharger le PDF
      pdf.save('reglement-interieur-pkba.pdf')
      
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error)
      alert('Erreur lors de la génération du PDF. Veuillez réessayer.')
    } finally {
      setIsGenerating(false)
    }
  }

  const generateHTML = async () => {
    try {
      // Créer le contenu HTML pour le PDF
      const content = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Règlement Intérieur - PKBA</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #333; padding-bottom: 20px; }
            .title { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .subtitle { font-size: 16px; color: #666; }
            .section { margin-bottom: 30px; }
            .section-title { font-size: 18px; font-weight: bold; margin-bottom: 15px; color: #333; }
            .rule-item { margin-bottom: 8px; padding-left: 20px; }
            .rule-item:before { content: "• "; color: #333; font-weight: bold; }
            .signature-section { margin-top: 60px; border-top: 1px solid #ccc; padding-top: 30px; }
            .signature-box { border: 2px solid #333; padding: 20px; margin: 20px 0; text-align: center; }
            .signature-line { border-bottom: 1px solid #333; width: 200px; margin: 10px auto; }
            .footer { margin-top: 40px; font-size: 12px; color: #666; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">RÈGLEMENT INTÉRIEUR</div>
            <div class="subtitle">ASSOCIATION PKBA - PARKOUR BASSIN D'ARCACHON</div>
          </div>

          <div class="section">
            <div class="section-title">1. ADHÉSION ET INSCRIPTION</div>
            <div class="rule-item">L'adhésion est ouverte à toute personne âgée d'au moins 6 ans</div>
            <div class="rule-item">Un certificat médical de non-contre-indication à la pratique du parkour est obligatoire</div>
            <div class="rule-item">L'inscription se fait sur présentation d'une pièce d'identité et du certificat médical</div>
            <div class="rule-item">Les mineurs doivent fournir une autorisation parentale signée</div>
            <div class="rule-item">L'adhésion est valable pour la saison sportive (septembre à juillet)</div>
          </div>

          <div class="section">
            <div class="section-title">2. RÈGLES DE SÉCURITÉ</div>
            <div class="rule-item">Le port de chaussures de sport adaptées est obligatoire</div>
            <div class="rule-item">Les bijoux et accessoires dangereux sont interdits pendant l'entraînement</div>
            <div class="rule-item">Respecter les consignes de sécurité données par les encadrants</div>
            <div class="rule-item">Ne pas pratiquer de figures dangereuses sans l'accord de l'encadrant</div>
            <div class="rule-item">Signaler immédiatement tout incident ou blessure</div>
          </div>

          <div class="section">
            <div class="section-title">3. HORAIRES ET PONCTUALITÉ</div>
            <div class="rule-item">Les entraînements ont lieu aux horaires définis en début de saison</div>
            <div class="rule-item">Arriver 10 minutes avant le début de l'entraînement</div>
            <div class="rule-item">En cas de retard, demander l'autorisation de rejoindre le groupe</div>
            <div class="rule-item">Prévenir l'encadrant en cas d'absence prévue</div>
            <div class="rule-item">Les entraînements commencent et finissent à l'heure précise</div>
          </div>

          <div class="section">
            <div class="section-title">4. LIEUX D'ENTRAÎNEMENT</div>
            <div class="rule-item">Respecter les lieux d'entraînement et leur environnement</div>
            <div class="rule-item">Ne pas dégrader le matériel ou les installations</div>
            <div class="rule-item">Ranger le matériel utilisé après chaque séance</div>
            <div class="rule-item">Respecter les règles spécifiques de chaque lieu</div>
            <div class="rule-item">Signaler tout problème constaté sur les installations</div>
          </div>

          <div class="section">
            <div class="section-title">5. COMPORTEMENT ET RESPECT</div>
            <div class="rule-item">Respecter les autres adhérents et l'équipe d'encadrement</div>
            <div class="rule-item">Respecter les encadrants</div>
            <div class="rule-item">Adopter un langage correct et respectueux</div>
            <div class="rule-item">Éviter les comportements dangereux ou perturbateurs</div>
            <div class="rule-item">Participer activement et positivement aux entraînements</div>
            <div class="rule-item">Respecter les valeurs de l'association : solidarité, respect, progression</div>
          </div>

          <div class="section">
            <div class="section-title">6. SANCTIONS ET EXCLUSIONS</div>
            <div class="rule-item">Tout manquement aux règles peut entraîner un avertissement</div>
            <div class="rule-item">En cas de récidive, une suspension temporaire peut être prononcée</div>
            <div class="rule-item">Les comportements graves peuvent entraîner l'exclusion définitive</div>
            <div class="rule-item">Les décisions sont prises par le conseil d'administration</div>
            <div class="rule-item">Un recours est possible auprès du bureau de l'association</div>
          </div>

          <div class="signature-section">
            <div class="signature-box">
              <div>Signature de l'adhérent (ou du représentant légal si mineur)</div>
              <div class="signature-line"></div>
              <div style="margin-top: 20px;">
                <strong>Nom et Prénom :</strong> _________________________________<br>
                <strong>Date :</strong> _________________________________<br>
                <strong>Lieu :</strong> _________________________________
              </div>
            </div>
          </div>

          <div class="footer">
            <p>Ce règlement intérieur est approuvé par le conseil d'administration de l'association PKBA.</p>
            <p>Il peut être modifié à tout moment par décision du conseil d'administration.</p>
            <p>Dernière mise à jour : ${new Date().toLocaleDateString('fr-FR')}</p>
            <p>Contact : contact@pkba.fr - Tél : 06 60 14 71 44</p>
          </div>
        </body>
        </html>
      `

      // Créer un blob avec le contenu HTML
      const blob = new Blob([content], { type: 'text/html' })
      
      // Créer un lien de téléchargement
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'reglement-interieur-pkba.html'
      
      // Déclencher le téléchargement
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Libérer l'URL
      window.URL.revokeObjectURL(url)
      
    } catch (error) {
      console.error('Erreur lors de la génération du HTML:', error)
      alert('Erreur lors de la génération du document. Veuillez réessayer.')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
    >
      <div className="text-center mb-6">
        <FileText size={48} className="mx-auto mb-4 text-primary" />
        <h3 className="text-xl font-cheddar font-bold text-gray-900 mb-2">
          Télécharger le Règlement
        </h3>
        <p className="text-gray-600 font-montserrat">
          Choisissez le format qui vous convient le mieux
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center text-sm text-gray-600">
          <User size={16} className="mr-2" />
          <span>Inclut un cadre de signature pour l'adhérent</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar size={16} className="mr-2" />
          <span>Date de mise à jour automatique</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <FileText size={16} className="mr-2" />
          <span>Deux formats disponibles : PDF et HTML</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={generatePDF}
          disabled={isGenerating}
          className="bg-primary hover:bg-secondary disabled:bg-gray-400 text-white font-montserrat font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Génération...
            </>
          ) : (
            <>
              <Download size={20} className="mr-2" />
              Version PDF
            </>
          )}
        </button>

        <button
          onClick={generateHTML}
          className="bg-secondary hover:bg-primary text-white font-montserrat font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          <FileDown size={20} className="mr-2" />
          Version HTML
        </button>
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        <p><strong>PDF :</strong> Format professionnel, parfait pour l'impression et la signature électronique.</p>
        <p><strong>HTML :</strong> Format léger, peut être ouvert dans n'importe quel navigateur et imprimé.</p>
      </div>
    </motion.div>
  )
}

export default ReglementPDF

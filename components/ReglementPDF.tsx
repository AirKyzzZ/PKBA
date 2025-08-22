'use client'

import { useState } from 'react'
import { Download, FileText, User, Calendar, FileDown } from 'lucide-react'
import { motion } from 'framer-motion'
import jsPDF from 'jspdf'

const ReglementPDF = () => {
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePDF = async () => {
    setIsGenerating(true)
    
    try {
      // Créer le PDF avec jsPDF
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      // Configuration des polices et couleurs
      pdf.setFont('helvetica')
      pdf.setFontSize(12)
      
      // Marges
      const margin = 20
      const pageWidth = 210
      const contentWidth = pageWidth - (2 * margin)
      let yPosition = 30
      
      // Fonction pour ajouter du texte avec gestion des sauts de ligne
      const addText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 12) => {
        pdf.setFontSize(fontSize)
        const lines = pdf.splitTextToSize(text, maxWidth)
        pdf.text(lines, x, y)
        return lines.length * (fontSize * 0.4) // Retourne la hauteur utilisée
      }
      
      // En-tête
      pdf.setFontSize(20)
      pdf.setFont('helvetica', 'bold')
      pdf.text('RÈGLEMENT INTÉRIEUR', pageWidth / 2, yPosition, { align: 'center' })
      yPosition += 15
      
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'normal')
      pdf.text('ASSOCIATION PKBA - PARKOUR BASSIN D\'ARCACHON', pageWidth / 2, yPosition, { align: 'center' })
      yPosition += 25
      
      // Ligne de séparation
      pdf.line(margin, yPosition, pageWidth - margin, yPosition)
      yPosition += 20
      
      // Section 1: Adhésion et Inscription
      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'bold')
      pdf.text('1. ADHÉSION ET INSCRIPTION', margin, yPosition)
      yPosition += 10
      
      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'normal')
      const rules1 = [
        '• L\'adhésion est ouverte à toute personne âgée d\'au moins 6 ans',
        '• Un certificat médical de non-contre-indication à la pratique du parkour est obligatoire',
        '• L\'inscription se fait sur présentation d\'une pièce d\'identité et du certificat médical',
        '• Les mineurs doivent fournir une autorisation parentale signée',
        '• L\'adhésion est valable pour la saison sportive (septembre à juillet)'
      ]
      
      rules1.forEach(rule => {
        if (yPosition > 250) {
          pdf.addPage()
          yPosition = 30
        }
        pdf.text(rule, margin + 5, yPosition)
        yPosition += 7
      })
      yPosition += 15
      
      // Section 2: Règles de Sécurité
      if (yPosition > 250) {
        pdf.addPage()
        yPosition = 30
      }
      
      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'bold')
      pdf.text('2. RÈGLES DE SÉCURITÉ', margin, yPosition)
      yPosition += 10
      
      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'normal')
      const rules2 = [
        '• Le port de chaussures de sport adaptées est obligatoire',
        '• Les bijoux et accessoires dangereux sont interdits pendant l\'entraînement',
        '• Respecter les consignes de sécurité données par les encadrants',
        '• Ne pas pratiquer de figures dangereuses sans l\'accord de l\'encadrant',
        '• Signaler immédiatement tout incident ou blessure'
      ]
      
      rules2.forEach(rule => {
        if (yPosition > 250) {
          pdf.addPage()
          yPosition = 30
        }
        pdf.text(rule, margin + 5, yPosition)
        yPosition += 7
      })
      yPosition += 15
      
      // Section 3: Horaires et Ponctualité
      if (yPosition > 250) {
        pdf.addPage()
        yPosition = 30
      }
      
      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'bold')
      pdf.text('3. HORAIRES ET PONCTUALITÉ', margin, yPosition)
      yPosition += 10
      
      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'normal')
      const rules3 = [
        '• Les entraînements ont lieu aux horaires définis en début de saison',
        '• Arriver 10 minutes avant le début de l\'entraînement',
        '• En cas de retard, demander l\'autorisation de rejoindre le groupe',
        '• Prévenir l\'encadrant en cas d\'absence prévue',
        '• Les entraînements commencent et finissent à l\'heure précise'
      ]
      
      rules3.forEach(rule => {
        if (yPosition > 250) {
          pdf.addPage()
          yPosition = 30
        }
        pdf.text(rule, margin + 5, yPosition)
        yPosition += 7
      })
      yPosition += 15
      
      // Section 4: Lieux d'Entraînement
      if (yPosition > 250) {
        pdf.addPage()
        yPosition = 30
      }
      
      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'bold')
      pdf.text('4. LIEUX D\'ENTRAÎNEMENT', margin, yPosition)
      yPosition += 10
      
      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'normal')
      const rules4 = [
        '• Respecter les lieux d\'entraînement et leur environnement',
        '• Ne pas dégrader le matériel ou les installations',
        '• Ranger le matériel utilisé après chaque séance',
        '• Respecter les règles spécifiques de chaque lieu',
        '• Signaler tout problème constaté sur les installations'
      ]
      
      rules4.forEach(rule => {
        if (yPosition > 250) {
          pdf.addPage()
          yPosition = 30
        }
        pdf.text(rule, margin + 5, yPosition)
        yPosition += 7
      })
      yPosition += 15
      
      // Section 5: Comportement et Respect
      if (yPosition > 250) {
        pdf.addPage()
        yPosition = 30
      }
      
      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'bold')
      pdf.text('5. COMPORTEMENT ET RESPECT', margin, yPosition)
      yPosition += 10
      
      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'normal')
      const rules5 = [
        '• Respecter les autres adhérents et l\'équipe d\'encadrement',
        '• Respecter les encadrants',
        '• Adopter un langage correct et respectueux',
        '• Éviter les comportements dangereux ou perturbateurs',
        '• Participer activement et positivement aux entraînements',
        '• Respecter les valeurs de l\'association : solidarité, respect, progression'
      ]
      
      rules5.forEach(rule => {
        if (yPosition > 250) {
          pdf.addPage()
          yPosition = 30
        }
        pdf.text(rule, margin + 5, yPosition)
        yPosition += 7
      })
      yPosition += 15
      
      // Section 6: Sanctions et Exclusions
      if (yPosition > 250) {
        pdf.addPage()
        yPosition = 30
      }
      
      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'bold')
      pdf.text('6. SANCTIONS ET EXCLUSIONS', margin, yPosition)
      yPosition += 10
      
      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'normal')
      const rules6 = [
        '• Tout manquement aux règles peut entraîner un avertissement',
        '• En cas de récidive, une suspension temporaire peut être prononcée',
        '• Les comportements graves peuvent entraîner l\'exclusion définitive',
        '• Les décisions sont prises par le conseil d\'administration',
        '• Un recours est possible auprès du bureau de l\'association'
      ]
      
      rules6.forEach(rule => {
        if (yPosition > 250) {
          pdf.addPage()
          yPosition = 30
        }
        pdf.text(rule, margin + 5, yPosition)
        yPosition += 7
      })
      yPosition += 20
      
      // Section Signature
      if (yPosition > 250) {
        pdf.addPage()
        yPosition = 30
      }
      
      // Ligne de séparation
      pdf.line(margin, yPosition, pageWidth - margin, yPosition)
      yPosition += 20
      
      // Cadre de signature
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Signature de l\'adhérent (ou du représentant légal si mineur)', pageWidth / 2, yPosition, { align: 'center' })
      yPosition += 15
      
      // Rectangle pour la signature
      const signatureWidth = 80
      const signatureHeight = 30
      const signatureX = (pageWidth - signatureWidth) / 2
      pdf.rect(signatureX, yPosition, signatureWidth, signatureHeight)
      yPosition += 40
      
      // Champs de saisie
      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'normal')
      pdf.text('Nom et Prénom : _________________________________', margin, yPosition)
      yPosition += 8
      pdf.text('Date : _________________________________', margin, yPosition)
      yPosition += 8
      pdf.text('Lieu : _________________________________', margin, yPosition)
      yPosition += 20
      
      // Pied de page
      if (yPosition > 250) {
        pdf.addPage()
        yPosition = 30
      }
      
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'italic')
      pdf.text('Ce règlement intérieur est approuvé par le conseil d\'administration de l\'association PKBA.', pageWidth / 2, yPosition, { align: 'center' })
      yPosition += 6
      pdf.text('Il peut être modifié à tout moment par décision du conseil d\'administration.', pageWidth / 2, yPosition, { align: 'center' })
      yPosition += 6
      pdf.text(`Dernière mise à jour : ${new Date().toLocaleDateString('fr-FR')}`, pageWidth / 2, yPosition, { align: 'center' })
      yPosition += 6
      pdf.text('Contact : parkourBA33@gmail.com - Tél : 06 60 14 71 44', pageWidth / 2, yPosition, { align: 'center' })
      
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
            <p>Contact : parkourBA33@gmail.com - Tél : 06 60 14 71 44</p>
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
        <p><strong>PDF :</strong> Format professionnel avec texte lisible, parfait pour l'impression et la signature électronique.</p>
        <p><strong>HTML :</strong> Format léger, peut être ouvert dans n'importe quel navigateur et imprimé.</p>
      </div>
    </motion.div>
  )
}

export default ReglementPDF

#!/usr/bin/env node

/**
 * Script de test de production pour PKBA
 * Vérifie toutes les fonctionnalités avant la mise en production
 */

const https = require('https');
const http = require('http');

console.log('🔧 PKBA Production Test Suite');
console.log('==============================\n');

// Configuration
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pkba.vertiflow.fr';
const TEST_ENDPOINTS = [
  '/',
  '/boutique',
  '/contact',
  '/inscription',
  '/donations',
  '/actualites',
  '/sitemap.xml',
  '/robots.txt'
];

// Couleurs pour la console
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function testEndpoint(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    
    const req = client.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const status = res.statusCode;
        const headers = res.headers;
        
        resolve({
          url,
          status,
          headers,
          data: data.substring(0, 200) + '...',
          success: status >= 200 && status < 400
        });
      });
    });
    
    req.on('error', (err) => {
      resolve({
        url,
        status: 0,
        error: err.message,
        success: false
      });
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        url,
        status: 0,
        error: 'Timeout',
        success: false
      });
    });
  });
}

async function runTests() {
  log('🚀 Démarrage des tests de production...\n', 'blue');
  
  let passedTests = 0;
  let totalTests = 0;
  
  // Test des endpoints principaux
  log('📋 Test des endpoints principaux:', 'bold');
  for (const endpoint of TEST_ENDPOINTS) {
    const fullUrl = SITE_URL + endpoint;
    const result = await testEndpoint(fullUrl);
    
    if (result.success) {
      log(`  ✅ ${endpoint} - ${result.status}`, 'green');
      passedTests++;
    } else {
      log(`  ❌ ${endpoint} - ${result.error || result.status}`, 'red');
    }
    totalTests++;
    
    // Vérifier les headers de sécurité
    if (result.headers) {
      const securityHeaders = [
        'x-frame-options',
        'x-content-type-options',
        'referrer-policy',
        'permissions-policy',
        'strict-transport-security'
      ];
      
      securityHeaders.forEach(header => {
        if (result.headers[header]) {
          log(`    🔒 ${header}: ${result.headers[header]}`, 'blue');
        }
      });
    }
  }
  
  console.log('\n🔍 Test des métadonnées SEO:');
  
  // Test de la page d'accueil pour les métadonnées
  const homeResult = await testEndpoint(SITE_URL);
  if (homeResult.success && homeResult.data) {
    const seoChecks = [
      { name: 'Title PKBA', pattern: /<title.*PKBA.*<\/title>/i },
      { name: 'Description', pattern: /<meta.*description.*content=/i },
      { name: 'Open Graph', pattern: /<meta.*property="og:/i },
      { name: 'Structured Data', pattern: /<script.*application\/ld\+json/i },
      { name: 'Canonical', pattern: /<link.*rel="canonical"/i }
    ];
    
    seoChecks.forEach(check => {
      if (check.pattern.test(homeResult.data)) {
        log(`  ✅ ${check.name}`, 'green');
        passedTests++;
      } else {
        log(`  ❌ ${check.name}`, 'red');
      }
      totalTests++;
    });
  }
  
  console.log('\n📊 Test des fichiers statiques:');
  
  // Test des fichiers statiques
  const staticFiles = [
    '/sitemap.xml',
    '/robots.txt',
    '/manifest.json'
  ];
  
  for (const file of staticFiles) {
    const result = await testEndpoint(SITE_URL + file);
    if (result.success) {
      log(`  ✅ ${file} accessible`, 'green');
      passedTests++;
    } else {
      log(`  ❌ ${file} non accessible`, 'red');
    }
    totalTests++;
  }
  
  // Résumé final
  console.log('\n' + '='.repeat(50));
  log(`📈 Résumé des tests: ${passedTests}/${totalTests} réussis`, 'bold');
  
  const successRate = Math.round((passedTests / totalTests) * 100);
  
  if (successRate >= 90) {
    log(`🎉 Excellent! Score: ${successRate}% - Prêt pour la production!`, 'green');
  } else if (successRate >= 80) {
    log(`⚠️  Bon score: ${successRate}% - Quelques ajustements nécessaires`, 'yellow');
  } else {
    log(`❌ Score faible: ${successRate}% - Tests échoués, vérification requise`, 'red');
  }
  
  console.log('\n🔧 Actions recommandées:');
  console.log('1. Vérifier Google Search Console');
  console.log('2. Tester les formulaires en production');
  console.log('3. Vérifier les paiements Stripe');
  console.log('4. Tester la responsivité mobile');
  console.log('5. Vérifier la vitesse de chargement');
  
  console.log('\n📚 Documentation:');
  console.log('- Checklist: PRODUCTION_CHECKLIST.md');
  console.log('- Page de test: /test');
  console.log('- Configuration: netlify.toml');
  
  console.log('\n🚀 Bonne chance pour la production!');
}

// Exécuter les tests
runTests().catch(console.error);

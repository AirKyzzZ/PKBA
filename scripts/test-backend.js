#!/usr/bin/env node

/**
 * Backend Services Test Script for PKBA
 * 
 * This script helps you test your EmailJS, Formspree, and Stripe configurations
 * Run with: node scripts/test-backend.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 PKBA Backend Services Test\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local file not found!');
  console.log('Please create a .env.local file with your configuration.');
  console.log('See BACKEND_SETUP.md for detailed instructions.\n');
  process.exit(1);
}

// Read and parse .env.local
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    envVars[key.trim()] = valueParts.join('=').trim();
  }
});

console.log('📋 Environment Variables Check:\n');

// Check EmailJS variables (Donations only)
console.log('📧 EmailJS Configuration (Donations):');
const emailjsVars = [
  'NEXT_PUBLIC_EMAILJS_SERVICE_ID',
  'NEXT_PUBLIC_EMAILJS_TEMPLATE_ID', 
  'NEXT_PUBLIC_EMAILJS_PUBLIC_KEY'
];

emailjsVars.forEach(varName => {
  const value = envVars[varName];
  if (value && value !== 'your_service_id_here' && !value.includes('your_')) {
    console.log(`  ✅ ${varName}: ${value.substring(0, 10)}...`);
  } else {
    console.log(`  ❌ ${varName}: Not configured`);
  }
});

// Check Formspree variables
console.log('\n📝 Formspree Configuration:');
const formspreeVars = [
  'NEXT_PUBLIC_FORMSPREE_CONTACT_FORM_ID',
  'NEXT_PUBLIC_FORMSPREE_REGISTRATION_FORM_ID',
  'NEXT_PUBLIC_FORMSPREE_ORDER_FORM_ID'
];

formspreeVars.forEach(varName => {
  const value = envVars[varName];
  if (value && value !== 'your_contact_form_id_here' && !value.includes('your_')) {
    console.log(`  ✅ ${varName}: ${value}`);
  } else {
    console.log(`  ❌ ${varName}: Not configured`);
  }
});

// Check Stripe variables
console.log('\n💳 Stripe Configuration:');
const stripeVars = [
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
  'STRIPE_SECRET_KEY'
];

stripeVars.forEach(varName => {
  const value = envVars[varName];
  if (value && value !== 'pk_test_your_publishable_key_here' && !value.includes('your_')) {
    const prefix = varName.includes('PUBLIC') ? 'pk_test_' : 'sk_test_';
    if (value.startsWith(prefix)) {
      console.log(`  ✅ ${varName}: ${value.substring(0, 15)}...`);
    } else {
      console.log(`  ⚠️  ${varName}: ${value.substring(0, 15)}... (not test key)`);
    }
  } else {
    console.log(`  ❌ ${varName}: Not configured`);
  }
});

console.log('\n🧪 Testing Instructions:\n');

console.log('1. EmailJS Test:');
console.log('   - Go to /donations page');
console.log('   - Fill out donation form');
console.log('   - Submit with test payment');
console.log('   - Check your email for receipt\n');

console.log('2. Formspree Test:');
console.log('   - Go to /contact page');
console.log('   - Fill out contact form');
console.log('   - Submit form');
console.log('   - Check Formspree dashboard\n');

console.log('3. Stripe Test:');
console.log('   - Go to /boutique page');
console.log('   - Add items to cart');
console.log('   - Proceed to checkout');
console.log('   - Use test card: 4242 4242 4242 4242');
console.log('   - Complete payment');
console.log('   - Check Stripe dashboard\n');

console.log('📚 For detailed setup instructions, see BACKEND_SETUP.md');
console.log('�� Happy testing!');

# Backend Setup Guide for PKBA

This guide will help you set up all the backend services for your PKBA website: EmailJS, Formspree, and Stripe.

## 1. EmailJS Setup

### Step 1: Create EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/) and create a free account
2. Verify your email address

### Step 2: Configure Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" or "Outlook" (recommended: Gmail)
4. Connect your email account (parkourBA33@gmail.com)
5. Note down the **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Templates

#### Template 1: Donation Receipt
1. Go to "Email Templates"
2. Click "Create New Template"
3. Name it "Donation Receipt"
4. Use this template:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Reçu de Don - PKBA</title>
</head>
<body>
    <h2>Reçu de Don - PKBA</h2>
    <p>Bonjour {{to_name}},</p>
    
    <p>Nous vous remercions pour votre don de {{montant}}€ à PKBA.</p>
    
    <h3>Informations du donateur :</h3>
    <ul>
        <li><strong>Nom :</strong> {{nom}} {{prenom}}</li>
        <li><strong>Email :</strong> {{email}}</li>
        <li><strong>Téléphone :</strong> {{telephone}}</li>
        <li><strong>Adresse :</strong> {{adresse}}, {{code_postal}} {{ville}}</li>
        <li><strong>Raison sociale :</strong> {{raison_sociale}}</li>
        <li><strong>Montant :</strong> {{montant}}€</li>
        <li><strong>Date :</strong> {{date}}</li>
    </ul>
    
    <p>Ce reçu vous permet de bénéficier des dispositions des articles 200, 200 bis et 238 bis du code des Impôts.</p>
    
    <p>Cordialement,<br>L'équipe PKBA</p>
</body>
</html>
```

5. Note down the **Template ID** (e.g., `template_abc123`)

#### Template 2: Shop Order Notification
1. Create another template named "Shop Order"
2. Use this template:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Nouvelle Commande - PKBA</title>
</head>
<body>
    <h2>Nouvelle Commande - PKBA</h2>
    
    <h3>Informations client :</h3>
    <ul>
        <li><strong>Nom :</strong> {{customer_name}}</li>
        <li><strong>Email :</strong> {{customer_email}}</li>
    </ul>
    
    <h3>Détails de la commande :</h3>
    <pre>{{items_summary}}</pre>
    
    <p><strong>Montant total :</strong> {{total_amount}}€</p>
    
    <h3>Détails complets :</h3>
    <pre>{{order_details}}</pre>
</body>
</html>
```

### Step 4: Get EmailJS Public Key
1. Go to "Account" → "API Keys"
2. Copy your **Public Key**

### Step 5: Update Environment Variables
Create a `.env.local` file in your project root and add:

```env
# EmailJS Configuration - Donations
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_donation_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_donation_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# EmailJS Configuration - Shop Orders
NEXT_PUBLIC_EMAILJS_SHOP_SERVICE_ID=your_shop_service_id
NEXT_PUBLIC_EMAILJS_SHOP_TEMPLATE_ID=your_shop_template_id
NEXT_PUBLIC_EMAILJS_SHOP_PUBLIC_KEY=your_public_key
```

## 2. Formspree Setup

### Step 1: Create Formspree Account
1. Go to [Formspree](https://formspree.io/) and create a free account
2. Verify your email address

### Step 2: Create Contact Form
1. In your Formspree dashboard, click "New Form"
2. Name it "PKBA Contact"
3. Choose "Contact Form" template
4. Note down the **Form ID** (e.g., `xrgjabkd`)

### Step 3: Create Registration Form (Optional)
1. Create another form named "PKBA Registration"
2. Choose "Registration Form" template
3. Note down the **Form ID**

### Step 4: Create Order Tracking Form
1. Create another form named "PKBA Orders"
2. Choose "Custom Form" template
3. Add these fields to your form:
   - `type` (text) - for identifying order notifications
   - `customer_name` (text) - customer's full name
   - `customer_email` (email) - customer's email
   - `customer_phone` (text) - customer's phone
   - `customer_address` (text) - shipping address
   - `customer_city` (text) - city
   - `customer_postal_code` (text) - postal code
   - `payment_intent_id` (text) - Stripe payment intent ID
   - `items_summary` (textarea) - summary of ordered items
   - `total_amount` (number) - total order amount
   - `order_details` (textarea) - complete order details (JSON)
   - `order_date` (text) - order date
4. Note down the **Form ID**

### Step 5: Update Environment Variables
Add to your `.env.local`:

```env
# Formspree Configuration
NEXT_PUBLIC_FORMSPREE_CONTACT_FORM_ID=your_contact_form_id
NEXT_PUBLIC_FORMSPREE_REGISTRATION_FORM_ID=your_registration_form_id
NEXT_PUBLIC_FORMSPREE_ORDER_FORM_ID=your_order_form_id
```

## 3. Stripe Setup

### Step 1: Create Stripe Account
1. Go to [Stripe](https://stripe.com/) and create an account
2. Complete your business profile
3. Add your bank account for payouts

### Step 2: Get API Keys
1. In your Stripe dashboard, go to "Developers" → "API Keys"
2. Copy your **Publishable Key** (starts with `pk_test_` or `pk_live_`)
3. Copy your **Secret Key** (starts with `sk_test_` or `sk_live_`)

### Step 3: Configure Webhook (Optional but Recommended)
1. Go to "Developers" → "Webhooks"
2. Click "Add endpoint"
3. Set endpoint URL to: `https://your-domain.com/api/webhook`
4. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`

### Step 4: Update Environment Variables
Add to your `.env.local`:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
```

## 4. Testing Your Setup

### Test EmailJS
1. Start your development server: `npm run dev`
2. Go to the donations page
3. Fill out the donation form and submit
4. Check your email for the donation receipt

### Test Formspree
1. Go to the contact page
2. Fill out and submit the contact form
3. Check your Formspree dashboard for the submission
4. Check your email for the notification

### Test Stripe
1. Go to the boutique page
2. Add items to cart and proceed to checkout
3. Use Stripe test card: `4242 4242 4242 4242`
4. Complete the payment
5. Check your Stripe dashboard for the payment
6. Check your Formspree dashboard for the order notification

## 5. Production Deployment

### For Netlify/Vercel:
1. Add all environment variables to your hosting platform
2. Make sure to use production Stripe keys (`pk_live_`, `sk_live_`)
3. Update webhook URLs to your production domain

### For EmailJS Production:
1. Consider upgrading to a paid plan for more emails
2. Set up email templates with your branding
3. Test all email flows in production

## 6. Troubleshooting

### Common Issues:

1. **EmailJS not working:**
   - Check that all environment variables are set correctly
   - Verify your EmailJS service is connected
   - Check browser console for errors

2. **Formspree not working:**
   - Verify the form ID is correct
   - Check that the form is published
   - Look for CORS errors in browser console

3. **Stripe payment failing:**
   - Ensure you're using test keys in development
   - Check that the payment intent is created successfully
   - Verify the client secret is being passed correctly

### Support:
- EmailJS: [support@emailjs.com](mailto:support@emailjs.com)
- Formspree: [help@formspree.io](mailto:help@formspree.io)
- Stripe: [support@stripe.com](mailto:support@stripe.com)

## 7. Security Notes

1. **Never commit your `.env.local` file to version control**
2. **Use test keys for development, live keys for production**
3. **Regularly rotate your API keys**
4. **Monitor your Stripe dashboard for suspicious activity**
5. **Set up proper webhook signatures for production**

## 8. Cost Estimation

### Free Tier Limits:
- **EmailJS**: 200 emails/month
- **Formspree**: 50 submissions/month
- **Stripe**: No monthly fee, only transaction fees

### Recommended Upgrades:
- **EmailJS Pro**: $15/month for 10,000 emails
- **Formspree Pro**: $10/month for 1,000 submissions
- **Stripe**: 2.9% + 30¢ per successful transaction

---

**Next Steps:**
1. Follow this guide step by step
2. Test each service individually
3. Update your environment variables
4. Deploy to production
5. Monitor your services for any issues

Good luck with your PKBA website! 🚀

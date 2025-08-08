# PKBA Shop Setup Guide

## Overview

The PKBA shop is a complete e-commerce solution with the following features:

- **Cart System**: Persistent cart with cookies
- **Product Pages**: Detailed T-shirt product page with customization
- **Checkout**: Secure Stripe payment integration
- **Email Notifications**: EmailJS integration for order notifications
- **Responsive Design**: Mobile-first design with modern UI

## Current Products

### Available Now
- **T-shirt Officiel PKBA** (19.99€)
  - Colors: White, Black
  - Sizes: S, M, L, XL, 2XL
  - Customization: +5€ for athlete name
  - Shipping: 4.99€ (mandatory)

### Coming Soon
- Hoodie PKBA Premium
- Pantalon PKBA Sport

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file with the following variables:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# EmailJS Configuration
EMAILJS_SERVICE_ID=service_pkba
EMAILJS_TEMPLATE_ID=template_pkba_order
EMAILJS_USER_ID=your_user_id_here
```

### 2. Stripe Setup

1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe Dashboard
3. Update the environment variables with your keys
4. Test the payment flow in test mode

### 3. EmailJS Setup

1. Create an EmailJS account at https://emailjs.com
2. Create a new service (Gmail, Outlook, etc.)
3. Create a new email template with the following variables:
   - `to_email`: Customer email
   - `customer_name`: Customer full name
   - `customer_email`: Customer email
   - `items_summary`: List of ordered items
   - `total_amount`: Total order amount
4. Update the environment variables with your EmailJS credentials

### 4. Product Images

Replace the placeholder images with actual product photos:

- `/public/images/tshirt-white.jpg` - White T-shirt image
- `/public/images/tshirt-black.jpg` - Black T-shirt image

Recommended image specifications:
- Size: 600x600px
- Format: JPG or PNG
- Quality: High resolution

### 5. Product Details

The T-shirt product is based on the Gildan 5000 from Printful:
- Material: 100% cotton
- Weight: 5.3 oz
- Fit: Classic fit
- Sizes: S, M, L, XL, 2XL
- Colors: White, Black

## Features

### Cart System
- Persistent cart stored in cookies
- Add/remove items
- Update quantities
- Cart icon with item count badge
- Automatic price calculation

### Product Page
- Detailed product information
- Color and size selection
- Customization option (+5€)
- Size guide
- Add to cart functionality

### Checkout Process
- Cart review
- Customer information form
- Secure Stripe payment
- Order confirmation
- Email notifications

### Shipping
- Fixed shipping cost: 4.99€
- Delivery time: 5-8 business days
- Shipping information clearly displayed

## File Structure

```
app/
├── boutique/
│   ├── page.tsx (Shop homepage)
│   └── tshirt/
│       └── page.tsx (T-shirt product page)
├── checkout/
│   ├── page.tsx (Checkout page)
│   └── success/
│       └── page.tsx (Success page)
└── api/
    └── create-payment-intent/
        └── route.ts (Stripe API)

components/
├── CartContext.tsx (Cart state management)
├── CheckoutForm.tsx (Payment form)
├── BoutiquePage.tsx (Shop homepage)
├── ProductCard.tsx (Product cards)
└── Header.tsx (Navigation with cart icon)
```

## Deployment

### Netlify (Recommended)
1. Connect your GitHub repository
2. Set environment variables in Netlify dashboard
3. Deploy automatically on push

### Vercel
1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

## Testing

### Test Payment Flow
1. Add T-shirt to cart
2. Proceed to checkout
3. Fill customer information
4. Use Stripe test card: 4242 4242 4242 4242
5. Complete payment
6. Verify email notification

### Test Cart Functionality
1. Add multiple items to cart
2. Update quantities
3. Remove items
4. Verify cart persistence across page reloads

## Customization

### Adding New Products
1. Update the products array in `BoutiquePage.tsx`
2. Create product images
3. Add product page if needed
4. Update cart logic if necessary

### Modifying Prices
1. Update prices in product definitions
2. Update shipping cost in checkout page
3. Test payment flow with new prices

### Email Templates
1. Customize EmailJS template
2. Add more order details if needed
3. Test email delivery

## Support

For technical support or questions about the shop setup, contact:
- Email: contact@pkba.fr
- Technical issues: Check the console for error messages

## Security Notes

- Stripe handles all payment data securely
- No credit card information is stored
- Customer data is only used for order fulfillment
- EmailJS credentials should be kept secure

## Performance

- Images are optimized for web
- Cart data is stored locally in cookies
- Stripe Elements for secure payment forms
- Responsive design for all devices

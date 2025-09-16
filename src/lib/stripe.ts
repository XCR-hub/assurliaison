import Stripe from 'stripe';

// Initialize the Stripe client using the secret key.  Note that the key must
// always be loaded from environment variables and never hard-coded.  See
// `.env.example` for the list of required variables.

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-08-16',
  typescript: true
});
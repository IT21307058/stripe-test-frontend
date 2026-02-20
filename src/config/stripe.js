// Stripe configuration
export const stripeConfig = {
  publishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:8000',
};

// Validate Stripe configuration
export const validateStripeConfig = () => {
  if (!stripeConfig.publishableKey) {
    console.warn(
      'Stripe publishable key is not configured. Please add REACT_APP_STRIPE_PUBLISHABLE_KEY to your .env file.'
    );
    return false;
  }
  
  if (!stripeConfig.publishableKey.startsWith('pk_')) {
    console.error('Invalid Stripe publishable key format. Key should start with "pk_"');
    return false;
  }
  
  return true;
};

export default stripeConfig;

import { Stripe } from 'stripe';

export const isStripeProduct = (data: unknown): data is Stripe.Product => {
  const productArg = data as Record<string, unknown>;

  return (
    typeof productArg.object === 'string' &&
    productArg.object === 'product' &&
    typeof productArg.id === 'string' &&
    typeof productArg.active === 'boolean'
  );
};

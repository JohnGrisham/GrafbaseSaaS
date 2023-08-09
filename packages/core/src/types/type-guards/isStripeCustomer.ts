import { Stripe } from 'stripe';

export const isStripeCustomer = (data: unknown): data is Stripe.Customer => {
  const customerArg = data as Record<string, unknown>;

  return (
    typeof customerArg.object === 'string' &&
    customerArg.object === 'customer' &&
    typeof customerArg.id === 'string' &&
    (typeof customerArg.email === 'string' || customerArg.email === null)
  );
};

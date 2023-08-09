import { Stripe } from 'stripe';

interface Subscription extends Stripe.Subscription {
  plan: Stripe.Plan;
  quantity: number;
}

export const isStripeSubscription = (data: unknown): data is Subscription => {
  const subscriptionArg = data as Record<string, unknown>;

  return (
    typeof subscriptionArg.object === 'string' &&
    subscriptionArg.object === 'subscription' &&
    typeof subscriptionArg.id === 'string' &&
    typeof subscriptionArg.plan === 'object' &&
    typeof subscriptionArg.quantity === 'number'
  );
};

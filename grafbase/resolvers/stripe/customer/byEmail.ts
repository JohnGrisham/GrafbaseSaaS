import type { User } from 'client';
import Stripe from 'stripe';

export default async function Resolver(user: User) {
  try {
    const { email } = user;

    if (!email) return null;
    const stripe = new Stripe(
      process.env.STRIPE_SECRET_KEY_LIVE ?? process.env.STRIPE_SECRET_KEY ?? '',
      {
        apiVersion: '2022-11-15',
      },
    );

    const [existingStripeUser = null] = (
      await stripe.customers.list({
        email,
        limit: 1,
      })
    ).data;

    if (!existingStripeUser) {
      return null;
    }

    const rawSubscriptions = (
      await stripe.subscriptions.list({
        customer: existingStripeUser.id,
        status: 'all',
      })
    ).data;

    const subscriptions = await Promise.all(
      rawSubscriptions.map(async (sub) => {
        const items = (
          await stripe.subscriptionItems.list({
            subscription: sub.id,
            expand: ['data.price.product'],
          })
        ).data;
        return { ...sub, items: { data: items } };
      }) ?? [],
    );

    return {
      ...existingStripeUser,
      subscriptions: {
        data: subscriptions,
      },
    };
  } catch (err) {
    console.error(err);
  }
}

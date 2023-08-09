import { NextApiRequest } from 'next';
import Stripe from 'stripe';
import { buffer } from 'micro';

export const processWebhooks = async (
  req: NextApiRequest,
  stripe: Stripe,
  handler: (event: Stripe.Event) => Promise<void>,
) => {
  try {
    const buf = await buffer(req);
    const webhookSecret =
      process.env.STRIPE_WEBHOOK_SECRET_LIVE ??
      process.env.STRIPE_WEBHOOK_SECRET ??
      '';

    const sig = req.headers['stripe-signature'];

    const event =
      webhookSecret && sig
        ? stripe.webhooks.constructEvent(buf, sig, webhookSecret)
        : null;

    if (!event) {
      throw new Error(`Failed to construct webhook event`);
    }

    await handler(event);

    return true;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export default processWebhooks;

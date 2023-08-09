import { NextApiRequest, NextApiResponse } from 'next';
import { constructStripe } from 'payments-server';
import { getToken } from 'next-auth/jwt';

const ROOT = process.env.NEXT_PUBLIC_ROOT_URL as string;

const createCheckoutSession = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'POST') {
    const stripe = constructStripe({ name: 'test', version: '1.0.0' });
    const { price, quantity = 1, metadata = {} } = req.body;

    try {
      const token = await getToken({ req });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        billing_address_collection: 'required',
        customer: token?.sub,
        line_items: [
          {
            price: price.id,
            quantity,
          },
        ],
        mode: 'subscription',
        allow_promotion_codes: true,
        subscription_data: {
          trial_from_plan: true,
          metadata,
        },
        success_url: `${ROOT}/account`,
        cancel_url: `${ROOT}/`,
      });

      return res.status(200).json({ sessionId: session.id });
    } catch (err: any) {
      res
        .status(500)
        .json({ error: { statusCode: 500, message: err.message } });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).send('Method Not Allowed');
    res.end();
  }
};

export default createCheckoutSession;

import type { JWT } from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken, stripe } from '../../utils';
import jsonwebtoken from 'jsonwebtoken';

const ROOT = process.env.NEXT_PUBLIC_ROOT_URL as string;

const createPortalLink = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const rawToken = await getToken(req);

      if (!rawToken) {
        return res.status(401).send('Unauthorized');
      }

      const token = jsonwebtoken.verify(
        rawToken,
        process.env.NEXTAUTH_SECRET as string,
      ) as JWT;

      const { email = undefined } = token as JWT;
      if (!email) throw Error('Could not get customer email');
      const [customer] = (await stripe.customers.list({ email, limit: 1 }))
        .data;

      if (!customer) {
        throw new Error('Could not locate customer with that email');
      }

      const { url } = await stripe.billingPortal.sessions.create({
        customer: customer.id,
        return_url: `${ROOT}/account`,
      });

      return res.status(200).json({ url });
    } catch (err: any) {
      console.log(err);
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

export default createPortalLink;

import * as React from 'react';
import {
  loadStripe,
  Stripe,
  StripeConstructorOptions,
} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

interface StripeClientProps {
  children: React.ReactNode;
  publishableKey: string;
  options?: StripeConstructorOptions;
}

export const StripeClient: React.FC<StripeClientProps> = ({
  children,
  publishableKey,
  options,
}) => {
  const [stripe, setStripe] = React.useState<Stripe>();
  React.useEffect(() => {
    const loadStripeClient = async () => {
      const stripeClient = await loadStripe(publishableKey, options);

      if (stripeClient) {
        setStripe(stripeClient);
      } else {
        console.warn('Unable to load stripe client');
      }
    };

    if (publishableKey) {
      loadStripeClient();
    }
  }, [publishableKey, options]);

  if (!stripe) {
    console.log('stripe loading...');
    return <>{children}</>;
  }

  return <Elements stripe={stripe}>{children}</Elements>;
};

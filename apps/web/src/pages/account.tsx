import * as React from 'react';
import { Accordion, Button, useAuthSession } from 'ui';
import { StripeProduct, useGetUserSubscriptions } from 'client';
import Link from 'next/link';
import { useState, ReactNode } from 'react';

const ROOT = process.env.NEXT_PUBLIC_ROOT_URL as string;

interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

function Card({ title, description, footer, children }: Props) {
  return (
    <Accordion header={title} initialCollapsed={false}>
      <div className="p m-auto my-8 w-full max-w-3xl rounded-md border border-zinc-700">
        <div className="px-5 py-4 dark:bg-white">
          <p className="text-zinc-400">{description}</p>
          {children}
        </div>
        <div className="rounded-b-md border-t border-zinc-700 bg-zinc-900 p-4 text-white">
          {footer}
        </div>
      </div>
    </Accordion>
  );
}

export default function Account() {
  const [loading, setLoading] = useState(false);
  const {
    context: { data: session },
  } = useAuthSession();
  const { data } = useGetUserSubscriptions(session.user.email);

  const subscription = React.useMemo(() => {
    if (!data?.user?.customer?.subscriptions?.nodes?.length) {
      return null;
    }

    const subItems = data.user.customer.subscriptions.nodes.flatMap(
      (sub) => sub.items.nodes,
    );

    const subWithProduct = subItems.find(
      (item) => item.price.product.__typename === 'StripeProduct',
    );

    if (!subWithProduct) {
      return null;
    }

    const product = subWithProduct.price.product as StripeProduct;
    return {
      ...subWithProduct,
      canceled: data.user?.customer?.subscriptions.nodes.every(
        (sub) => sub.canceledAt,
      ),
      price: { ...subWithProduct?.price, product },
    };
  }, [data]);

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/create-portal-link', { method: 'POST' });

      if (res.ok) {
        const { url } = await res.json();
        window.location.assign(url);
      } else {
        const error = await res.text();
        throw new Error(error);
      }
    } catch (error) {
      if (error) return console.error((error as Error).message);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (!session?.user) {
      window.location.replace(ROOT);
    }
  }, [session]);

  if (!session?.user?.email || !data?.user) {
    return null;
  }

  return (
    <section className="mb-32 min-w-[60%] bg-inherit">
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-8 sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center dark:text-white sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold sm:text-center sm:text-6xl">
            Account
          </h1>
          <p className="m-auto mt-5 max-w-2xl text-xl sm:text-center sm:text-2xl">
            We partnered with Stripe for a simplified billing.
          </p>
        </div>
      </div>
      <div className="p-4">
        <Card
          title="Your Plan"
          description={
            subscription
              ? `${
                  !subscription.canceled
                    ? `You are currently on`
                    : `You have cancelled`
                } the ${subscription.price.product.name} plan.`
              : ''
          }
          footer={
            <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
              <p className="pb-4 sm:pb-0">
                Manage your subscription on Stripe.
              </p>
              <Button
                classNames="text-white"
                disabled={loading}
                onClick={redirectToCustomerPortal}
                link
              >
                {`${subscription?.canceled ? 'Renew' : 'Choose'} your plan`}
              </Button>
            </div>
          }
        >
          <div className="mt-8 mb-4 text-xl font-semibold text-zinc-600">
            {loading ? (
              <div className="mb-6 h-12">...</div>
            ) : (
              subscription &&
              !subscription.canceled &&
              `${
                subscription.price.unitAmount
              }/${subscription.price.recurring?.interval.toLowerCase()}/${
                subscription.price.currency
              }`
            )}
          </div>
        </Card>
        <Card
          title="Your Name"
          description="Please enter your full name, or a display name you are comfortable with."
          footer={<p>Please use 64 characters at maximum.</p>}
        >
          <div className="mt-8 mb-4 text-xl font-semibold text-zinc-600">
            {data.user.name ? (
              `${data.user.name}`
            ) : (
              <div className="mb-6 h-8">...</div>
            )}
          </div>
        </Card>
        <Card
          title="Your Email"
          description="Please enter the email address you want to use to login."
          footer={<p>We will email you to verify the change.</p>}
        >
          <p className="mt-8 mb-4 text-xl font-semibold text-zinc-600">
            {data.user.email}
          </p>
        </Card>
      </div>
    </section>
  );
}

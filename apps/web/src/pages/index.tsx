import * as React from 'react';
import Head from 'next/head';
import { Button } from 'ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useGetUserByEmailQuery } from 'client';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data } = useSession();
  const response = useGetUserByEmailQuery(data?.user?.email ?? '');
  console.log({ response });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Web - Turborepo Example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-auto px-4 pt-16 pb-8 mx-auto sm:pt-24 lg:px-8">
        <h1 className="mx-auto max-w-5xl text-center text-6xl font-extrabold leading-[1.1] tracking-tighter text-white sm:text-7xl lg:text-8xl xl:text-8xl">
          Web <br className="hidden lg:block" />
          <span className="inline-block text-transparent bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text">
            Turborepo Example
          </span>{' '}
        </h1>
        <div className="max-w-xl mx-auto mt-5 sm:flex sm:justify-center md:mt-8">
          <Button>
            <a href="https://turborepo.org/docs/getting-started">
              Read the docs <FontAwesomeIcon icon={faArrowRight} size="sm" />
            </a>
          </Button>
        </div>
      </main>
    </div>
  );
}

Home.auth = false;

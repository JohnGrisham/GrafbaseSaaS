# Turborepo/Grafbase SaaS starter

This is an unofficial starter for Turborepo.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `grafbase`: [Grafbase](https://grafbase.com/) Managed GQL service
- `web`: a [Next.js](https://nextjs.org) app with [Tailwind CSS](https://tailwindcss.com/)
- `ui`: a React component library with [Tailwind CSS](https://tailwindcss.com/) shared by applications
- `amplify`: a package for managing shared [Amplify](https://docs.amplify.aws) config/logic
- `auth`: shared [Auth.js](https://authjs.dev) configuration
- `client`: graphql client configuration, types, operations and provider
- `core`: shared utilites and other common logic
- `jest-config`: shared testing config
- `payments-client/payments-server`: Stripe functions and utilities
- `tailwind-config`: shared tailwind config
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [Tailwind CSS](https://tailwindcss.com/) for styles and theming
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Jest](https://jestjs.io/) for testing
- [Grafbase](https://grafbase.com/) for GQL backend
- [Storybook](https://storybook.js.org/) for previewing component library in isolation

## Environments and functionality

The template uses Stripe, Cognito and Google all of which will need to be configured before full use of the template. You can find documentation on setting up Stripe for development [here](https://dashboard.stripe.com/register) for Cognito [here](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-getting-started.html) and Google [here](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid).

### Grafbase

Import the project in grafbase: https://grafbase.com/docs/getting-started/first-use

`grafbase/.env` example

```
AWS_COGNITO_ACCESS_KEY=${AWS Key}
AWS_COGNITO_SECRET_ACCESS_KEY=${AWS Secret}
AWS_COGNITO_REGION=${AWS Region}
COGNITO_USER_POOL_ID=${Userpool ID}
NEXTAUTH_SECRET=${Next Auth Secret}
ISSUER_URL=https://grafbase.com
STRIPE_SECRET_KEY=${Stripe Secret}
```

The grafbase cli can be ran to use the pathfinder playground using `yarn dev:gql`.

### Web Application

`apps/web/.env` example

```
ISSUER_URL=https://grafbase.com
NEXTAUTH_SECRET={Next Auth Secret}
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_ROOT_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=%{Stripe Publishable Key}
```

Start the development environment with `yarn dev`.

### Client

`packages/client/.env` example

```
API_ENDPOINT=https://{your-project}.grafbase.app/graphql
```

Run codegen automatic type generation with `yarn codegen` while `yarn dev:gql` is running in another terminal.

### Amplify

When using Amplify in other packages the `configure` method must be called at the top of the file.

`packages/amplify/.env` example

```
COGNITO_REGION=${AWS Region}
COGNITO_DOMAIN=https://${your-app}.auth.${region}.amazoncognito.com
COGNITO_USER_POOL_ID=${user pool ID}
COGNITO_USER_POOL_CLIENT_ID=${Client ID}
```

### Auth

The Grafbase client authentication is primarily meant to token based but can still be authenticated via the API token. The API token is required for some operations that happen prior to getting the user's JWT access token. You will need to add the API key to the auth package `.env` file for this reason.

`packages/auth/.env` example

```
API_KEY=${Grafbase API key}
COGNITO_CLIENT_ID=${Cognito Client}
COGNITO_ISSUER=https://cognito-idp.us-east-1.amazonaws.com/${userpool ID}
GOOGLE_CLIENT_ID=${Google Client}
GOOGLE_CLIENT_SECRET=${Google Secret}
ISSUER_URL=https://grafbase.com
NEXTAUTH_SECRET={Next Auth Secret}
NEXTAUTH_URL=http://localhost:3000
STRIPE_TRIAL_PRODUCT_NAME=${Free trail product name}
```

### Payments (Server)

`packages/payments-server/.env` example

```
STRIPE_SECRET_KEY=${Stripe Secret Key}
```

### UI

Contains shared React components for use in any apps defined inside the repo. You can preview the different pre packaged components using `yarn storybook`.

### Tailwind config

Contains default tailwind config for packages/apps and the ability to generate a semi random theme using the default tailwind [color palette](https://tailwindcss.com/docs/customizing-colors) using `yarn generate-tailwind-theme`.

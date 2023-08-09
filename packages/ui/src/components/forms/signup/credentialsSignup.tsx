import * as React from 'react';
import { Alert } from '../../alert';
import { Auth } from '@aws-amplify/auth';
import { Field } from '../input';
import { Form } from '../form';
import { Loading } from '../../layout';
import { RegistrationFlow } from '../registration';
import { useLoadingContext } from '../../../hooks';

enum RegistrationStatus {
  COMPLETE = 'COMPLETE',
  INCOMPLETE = 'INCOMPLETE',
  STARTED = 'STARTED',
}

enum AuthState {
  PRE_SIGNUP = 'PRE_SIGNUP',
  VERIFY = 'VERIFY',
}

export interface RegistrationState {
  status: RegistrationStatus;
  onRegister?: () => Promise<any>;
}

export interface CredentialsSignupProps {
  image: React.ReactNode;
  signInUrl: string;
  onSignup?: (email: string, password: string) => Promise<void>;
  disableRegistration?: boolean;
}

export const CredentialsSignup: React.FC<CredentialsSignupProps> = ({
  image,
  signInUrl,
  onSignup,
  disableRegistration = false,
}) => {
  const [error, setError] = React.useState<string | undefined>();
  const { loading, setLoading } = useLoadingContext();
  const [registration, setRegistration] = React.useState<RegistrationState>(
    disableRegistration
      ? { status: RegistrationStatus.COMPLETE }
      : { status: RegistrationStatus.INCOMPLETE },
  );
  const [authState, setAuthState] = React.useState<AuthState>(
    AuthState.PRE_SIGNUP,
  );

  const postRegister = React.useCallback(async () => {
    try {
      if (registration.onRegister) {
        await registration.onRegister();
      }
    } catch (err: any) {
      console.error(`Registration failed: ${err.message}`);
    }
  }, [registration]);

  return (
    <section className="w-screen">
      {error && (
        <Alert
          key={`${error}-${Date.now()}`}
          color="danger"
          dismissable
          dismissLifetime="refresh"
        >
          {error}
        </Alert>
      )}
      <div className="ui-g-6 ui-flex ui-flex-wrap ui-items-center ui-justify-center ui-text-gray-800">
        <div className="md:mt-0 -ui-mt-10 ui-w-7/12 lg:ui-w-5/12">{image}</div>
        <div className="lg:ui-w-4/12">
          {registration.status === RegistrationStatus.STARTED ? (
            <RegistrationFlow onSubmit={postRegister} onSkip={postRegister} />
          ) : (
            <Form
              initialValues={{
                email: '',
                password: '',
                verificationCode: '',
              }}
              onSubmit={async ({ email, password, verificationCode }) => {
                try {
                  setError(undefined);
                  setLoading(true);
                  if (authState === AuthState.PRE_SIGNUP) {
                    const response = await Auth.signUp({
                      username: email,
                      password,
                      attributes: {
                        email,
                      },
                    });

                    if (response.user && response.userConfirmed === false) {
                      setAuthState(AuthState.VERIFY);
                    }
                  }

                  if (authState === AuthState.VERIFY) {
                    const verifyResponse = await Auth.confirmSignUp(
                      email,
                      verificationCode,
                    );

                    !disableRegistration
                      ? setRegistration({
                          onRegister: async () => {
                            if (onSignup) {
                              await onSignup(email, password);
                            }
                          },
                          status: RegistrationStatus.STARTED,
                        })
                      : null;

                    if (
                      verifyResponse === 'SUCCESS' &&
                      registration.status === RegistrationStatus.COMPLETE
                    ) {
                      onSignup ? await onSignup(email, password) : null;
                    }
                  }
                } catch (err: any) {
                  console.error(err.message);
                  setError(err.message);
                } finally {
                  setLoading(false);
                }
              }}
            >
              <Field name="email" label="Email" type="email" />
              {authState === AuthState.VERIFY ? (
                <Field name="verificationCode" label="Verification Code" />
              ) : (
                <Field label="Password" name="password" type="password" />
              )}
              <div className="ui-mt-8 ui-flex ui-flex-col ui-items-center">
                <button
                  type="submit"
                  className="ui-inline-block ui-w-full ui-rounded ui-bg-primary-600 ui-py-3 ui-px-7 ui-text-sm ui-font-medium ui-uppercase ui-leading-snug ui-text-white ui-shadow-md ui-transition ui-duration-150 ui-ease-in-out hover:ui-bg-primary-700 hover:ui-shadow-lg focus:ui-bg-primary-700 focus:ui-shadow-lg focus:ui-outline-none focus:ui-ring-0 active:ui-bg-primary-800 active:ui-shadow-lg"
                >
                  {loading ? (
                    <Loading />
                  ) : authState === AuthState.PRE_SIGNUP ? (
                    'Signup'
                  ) : (
                    'Verify'
                  )}
                </button>
                {signInUrl && (
                  <a
                    className="ui-mt-2 ui-text-primary-600 hover:ui-cursor-pointer dark:ui-text-white"
                    href={signInUrl}
                  >
                    Sign in
                  </a>
                )}
              </div>
            </Form>
          )}
        </div>
      </div>
    </section>
  );
};

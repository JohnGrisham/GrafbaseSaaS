import { SignInOptions, signIn } from 'next-auth/react';
import { Alert } from '../../alert';
import { Button } from '../../button';
import { Field } from '../input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form } from '../form';
import { Loading } from '../../layout';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useLoadingContext } from '../../../hooks';
import { useState } from 'react';

interface CredentialsSignupProps {
  backgroundImage: React.ReactNode;
  signupUrl?: string;
  signInOptions?: SignInOptions;
}

export const CredentialsSignin: React.FC<CredentialsSignupProps> = ({
  backgroundImage,
  signupUrl,
  signInOptions,
}) => {
  const [error, setError] = useState<string | undefined>();
  const { loading, setLoading } = useLoadingContext();

  return (
    <section className="ui-w-screen">
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
        <div className="-ui-mt-10 ui-w-7/12 md:ui-mt-0 lg:ui-w-5/12">
          {backgroundImage}
        </div>
        <div className="lg:ui-w-4/12">
          <Form
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={async ({ email, password }) => {
              try {
                setError(undefined);
                setLoading(true);
                const response = await signIn('credentials', {
                  ...signInOptions,
                  username: email,
                  password,
                });

                if (response?.ok && signInOptions?.callbackUrl) {
                  window.location.replace(signInOptions.callbackUrl);
                } else if (response?.error) {
                  setError(response.error);
                }
              } catch (err: any) {
                console.error(err.message);
                setError(err.message);
              } finally {
                setLoading(false);
              }
            }}
            innerFormProps={{ className: 'lg:ui-w-10/12' }}
          >
            {({ isValid }) => (
              <>
                <Field name="email" label="Email" type="email" required />
                <Field
                  label="Password"
                  name="password"
                  type="password"
                  required
                />
                <div className="ui-mb-6 ui-flex ui-items-center ui-justify-between">
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input ui-float-left ui-mt-1 ui-mr-2 ui-h-4 ui-w-4 ui-cursor-pointer ui-appearance-none ui-rounded-sm ui-border ui-border-gray-300 ui-bg-white ui-bg-contain ui-bg-center ui-bg-no-repeat ui-align-top ui-text-white ui-transition ui-duration-200 checked:ui-border-primary-600 checked:ui-bg-primary-600 focus:ui-outline-none"
                      id="remember-me"
                    />
                    <label
                      className="form-check-label ui-inline-block ui-text-primary-600"
                      htmlFor="remember-me"
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href="#!"
                    className="ui-text-primary-600 ui-transition ui-duration-200 ui-ease-in-out hover:ui-text-primary-700 focus:ui-text-primary-700 active:ui-text-primary-800"
                  >
                    Forgot password?
                  </a>
                </div>
                <Button
                  disabled={!isValid}
                  type="submit"
                  className="ui-inline-block ui-w-full ui-rounded ui-bg-primary-600 ui-py-3 ui-px-7 ui-text-sm ui-font-medium ui-uppercase ui-leading-snug ui-text-white ui-shadow-md ui-transition ui-duration-150 ui-ease-in-out hover:ui-bg-primary-700 hover:ui-shadow-lg focus:ui-bg-primary-700 focus:ui-shadow-lg focus:ui-outline-none focus:ui-ring-0 active:ui-bg-primary-800 active:ui-shadow-lg"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  {loading ? <Loading /> : 'Sign in'}
                </Button>
                <div className="ui-font-small ui-flex ui-flex-col ui-items-center ui-px-7 ui-text-xs ui-uppercase">
                  {signupUrl && (
                    <a
                      className="ui-mt-2 ui-text-primary-600 hover:ui-cursor-pointer dark:ui-text-white"
                      href={signupUrl}
                    >
                      Sign up
                    </a>
                  )}
                </div>
                <div className="ui-my-4 ui-flex ui-items-center before:ui-mt-0.5 before:ui-flex-1 before:ui-border-t before:ui-border-gray-300 after:ui-mt-0.5 after:ui-flex-1 after:ui-border-t after:ui-border-gray-300">
                  <p className="ui-mx-4 ui-mb-0 ui-text-center ui-font-semibold ui-text-primary-600">
                    OR
                  </p>
                </div>
                <a
                  className="ui-mb-3 ui-flex ui-w-full ui-items-center ui-justify-center ui-rounded ui-py-3 ui-px-7 ui-text-sm ui-font-medium ui-uppercase ui-leading-snug ui-text-white ui-shadow-md ui-transition ui-duration-150 ui-ease-in-out hover:ui-shadow-lg focus:ui-shadow-lg focus:ui-outline-none focus:ui-ring-0 active:ui-shadow-lg"
                  style={{ backgroundColor: '#0F9D58' }}
                  href="#!"
                  role="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  onClick={async () => await signIn('google', signInOptions)}
                >
                  <FontAwesomeIcon icon={faGoogle} />
                  &nbsp; Continue with Google
                </a>
              </>
            )}
          </Form>
        </div>
      </div>
    </section>
  );
};

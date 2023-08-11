import { CredentialsSignin, useThemeContext } from 'ui';
import Unlock from '../../../public/unlock.svg';
import { configure } from 'amplify';

const signInOptions = {
  callbackUrl: process.env.NEXT_PUBLIC_ROOT_URL as string,
  redirect: false,
};

configure();

const Signin: React.FC = () => {
  const theme = useThemeContext();

  return (
    <CredentialsSignin
      backgroundImage={<Unlock color={theme.colors.primary[500]} />}
      signupUrl="/auth/signup"
      signInOptions={signInOptions}
    />
  );
};

export default Signin;

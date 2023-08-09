import { RegistrationFlow } from './registrationFlow';

const registration = {
  title: 'Registration Flow',
  component: RegistrationFlow,
};

export default registration;

export const Basic = () => (
  <div className="ui-flex ui-justify-center">
    <RegistrationFlow
      onSubmit={(values) => console.log(values)}
      onSkip={() => {}}
    />
  </div>
);

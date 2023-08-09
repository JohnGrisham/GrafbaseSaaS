import * as React from 'react';
import { Field, Select } from '../input';
import { Stepper, Step } from '../../stepper';
import { Button } from '../../button';
import { Form } from '../form';
import { FormikConfig } from 'formik';

export interface RegistrationFlowProps {
  onSubmit: FormikConfig<any>['onSubmit'];
  onSkip: () => void;
}

export const RegistrationFlow: React.FC<RegistrationFlowProps> = ({
  onSubmit,
  onSkip,
}) => {
  const [activeStep, setActiveStep] = React.useState(1);
  const getSteps = React.useCallback(
    (valid: boolean): Step[] => [
      {
        header: 'Tell us about your profession',
        children: (
          <div className="ui-flex ui-flex-col ui-items-baseline">
            <Field
              name="company"
              label="Company Name"
              placeholder="I work for ..."
              required
            />
            <Select
              label="Please describe your role"
              placeholder="I'm a ..."
              name="role"
              options={[{ value: 'Software developer' }]}
            />
            <Button
              disabled={!valid}
              onClick={() => setActiveStep(2)}
              type="button"
            >
              Next
            </Button>
          </div>
        ),
      },
      {
        disabled: !valid,
        header: 'Set up your workspace',
        children: (
          <div className="ui-flex ui-flex-col ui-items-baseline">
            <Field
              name="workspace"
              label="Workspace Name"
              placeholder="My workspace ..."
            />
            {/* TODO: Invite collaborators flow */}
            <Button disabled={!valid} type="submit">
              Submit
            </Button>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <Form
      innerFormProps={{ className: 'ui-w-full' }}
      initialValues={{ company: '', workspace: '', role: '' }}
      onSubmit={onSubmit}
      isInitialValid={false}
    >
      {({ isValid }) => (
        <div className="ui-relative">
          <Stepper
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            steps={getSteps(isValid)}
          />
          <Button
            onClick={onSkip}
            classNames="ui-absolute ui-top-2 ui-left-[310px]"
            style={{ padding: 0 }}
            link
          >
            Skip
          </Button>
        </div>
      )}
    </Form>
  );
};

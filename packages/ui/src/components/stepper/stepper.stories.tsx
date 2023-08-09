import { Stepper } from './stepper';
import { useState } from '@storybook/addons';

const stepper = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Stepper',
  component: Stepper,
};

export default stepper;

export const Basic = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="ui-flex ui-flex-col ui-justify-center">
      <Stepper
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        steps={[
          {
            header: 'Step 1',
            children:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          },
          {
            header: 'Step 2',
            children:
              'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          },
          {
            header: 'Step 3',
            children:
              'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
          },
        ]}
      />
    </div>
  );
};

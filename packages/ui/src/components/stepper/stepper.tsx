import * as React from 'react';
import { Button } from '../button';
import cn from 'classnames';
import { motion } from 'framer-motion';

export interface Step {
  header: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export interface StepperProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  steps: Step[];
  classNames?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  activeStep,
  classNames,
  setActiveStep,
  steps,
}) => {
  const styles = React.useMemo(() => {
    return cn([
      `ui-relative ui-p-0 ui-m-0 ui-w-full ui-list-none ui-overflow-hidden`,
      classNames,
    ]);
  }, [classNames]);

  return (
    <ul className={styles}>
      {steps.map(({ children, disabled, header }, i) => {
        const stepNumber = i + 1;
        const isActive = stepNumber === activeStep;

        return (
          <li
            key={`${header}-${stepNumber}`}
            className="ui-stepper-step ui-relative ui-h-fit"
          >
            <div
              className={`ui-text-decoration-none ui-flex ui-items-center ui-leading-4 hover:ui-bg-gray-100 dark:hover:ui-bg-gray-700 ${
                disabled ? 'ui-cursor-not-allowed' : 'ui-cursor-pointer'
              }`}
              aria-disabled={disabled}
              onClick={() => {
                if (disabled) {
                  return;
                }

                setActiveStep(stepNumber);
              }}
            >
              <Button
                color={isActive ? 'accent' : 'primary'}
                size="small"
                disabled={disabled}
                rounded
              >
                {stepNumber}
              </Button>
              <h2 className="ui-ml-2 dark:ui-text-white">{header}</h2>
            </div>
            <motion.section
              initial={isActive}
              animate={isActive ? 'open' : 'collapsed'}
              exit="collapsed"
              className="ui-justify-left ui-flex ui-overflow-hidden ui-pt-4 ui-pb-6 ui-pr-6 ui-pl-14 dark:ui-text-white"
              variants={{
                open: {
                  height: 'auto',
                  opacity: 1,
                  visibility: 'visible',
                  transition: {
                    bounceStiffness: 20,
                    type: 'inertia',
                    velocity: 1.5,
                  },
                },
                collapsed: {
                  height: 0,
                  visibility: 'collapse',
                  opacity: 0,
                  transition: { duration: 0.2 },
                },
              }}
            >
              {children}
            </motion.section>
          </li>
        );
      })}
    </ul>
  );
};

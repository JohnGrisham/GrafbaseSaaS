import * as React from 'react';
import cn from 'classnames';

export interface ToggleProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'role' | 'size'
  > {
  children?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent' | 'danger' | 'warning' | 'info';
  classNames?: string;
  label?: string;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const Toggle: React.FC<ToggleProps> = ({
  children,
  classNames,
  color = 'primary',
  disabled = false,
  label,
  size = 'medium',
  ...inputProps
}) => {
  const styles = React.useMemo(() => {
    return cn([
      `ui-h-5 -ui-ml-10 ui-align-top ui-bg-white ui-bg-gray-300 ui-bg-no-repeat ui-bg-contain ui-rounded-full ui-shadow-sm ui-appearance-none ui-cursor-pointer form-check-input ui-w-9 focus:ui-outline-none checked:ui-bg-${color}-600 toggle`,
      {
        'ui-px-2.5 ui-py-1.5': size === 'small',
        'ui-px-5 ui-py-3': size === 'medium',
        'ui-px-7 ui-py-3': size === 'large',
        'ui-pointer-events-none ui-text-decoration-none ui-select-none':
          disabled,
      },
      classNames,
    ]);
  }, [classNames, color, disabled, size]);

  return (
    <div
      aria-disabled={disabled}
      className={`ui-flex ui-justify-center ${
        disabled ? 'ui-cursor-not-allowed ui-opacity-60' : ''
      }`}
    >
      <div
        className={`form-check form-switch ui-flex ui-items-center ${
          label ? 'ui-pl-10' : ''
        }`}
      >
        <input
          className={styles}
          disabled={disabled}
          type="checkbox"
          role="switch"
          id={label}
          {...inputProps}
        />
        {label && (
          <label
            className="form-check-label ui-ml-2 ui-inline-block ui-text-gray-800 dark:ui-text-white"
            htmlFor={label}
          >
            {label}
          </label>
        )}
        {children}
      </div>
    </div>
  );
};

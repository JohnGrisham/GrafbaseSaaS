import * as React from 'react';
import cn from 'classnames';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent' | 'danger' | 'warning' | 'info';
  classNames?: string;
  disabled?: boolean;
  link?: boolean | string;
  outline?: boolean;
  rounded?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  classNames,
  color = 'primary',
  disabled = false,
  link = '',
  outline = false,
  rounded = false,
  size = 'medium',
  ...buttonProps
}) => {
  const styles = React.useMemo(() => {
    return cn([
      `ui-inline-block ui-rounded ui-font-medium ui-uppercase ui-transition ui-duration-150 ui-ease-in-out`,
      {
        'ui-text-xs ui-leading-tight': size !== 'large',
        'ui-px-2.5 ui-py-1.5': size === 'small',
        'ui-px-3.5 ui-py-2.5': size === 'medium',
        'ui-px-7 ui-py-3 ui-text-sm ui-leading-snug': size === 'large',
        'ui-pointer-events-none ui-text-decoration-none ui-select-none':
          disabled,
        'ui-text-white': !link && !outline,
        '!ui-rounded-full': rounded && !link,
        'ui-shadow-md': !link,
        [`ui-cursor-pointer hover:ui-text-${color}-600 hover:ui-bg-gray-100 focus:ui-bg-gray-100 focus:ui-outline-none focus:ui-ring-0 active:ui-bg-gray-200`]:
          link && !disabled,
        [`ui-border-${color}-500 ui-border-2`]: outline && !link,
        [`hover:ui-text-${color}-400 focus:ui-text-${color}-400 active:ui-text-${color}-400 hover:ui-bg-opacity-5`]:
          outline && !link && !disabled,
        [`ui-bg-${color}-500`]: !outline && !link,
        [`ui-text-${color}-500`]: outline || link,
        [`hover:ui-shadow-lg focus:ui-shadow-lg focus:ui-outline-none focus:ui-ring-0 active:ui-shadow-lg dark:hover:ui-text-${color}-700 dark:focus:ui-text-${color}-700 dark:active:ui-text-${color}-700 hover:ui-bg-${color}-600 dark:hover:ui-bg-${color}-400 focus:ui-bg-${color}-700 dark:focus:ui-bg-${color}-300 active:ui-bg-${color}-800 dark:active:ui-bg-${color}-200`]:
          !link && !disabled,
      },
      classNames,
    ]);
  }, [classNames, color, disabled, link, outline, rounded, size]);

  return (
    <div
      className={`ui-flex ui-items-center ui-justify-center ui-space-x-2 ${
        disabled ? 'ui-cursor-not-allowed ui-opacity-60' : ''
      }`}
      aria-disabled={disabled}
    >
      {link && typeof link === 'string' ? (
        <a className={styles} href={disabled ? undefined : link}>
          {children}
        </a>
      ) : (
        <button
          type="button"
          className={styles}
          disabled={disabled}
          {...buttonProps}
        >
          {children}
        </button>
      )}
    </div>
  );
};

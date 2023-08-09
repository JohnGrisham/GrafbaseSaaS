import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export interface AlertProps {
  children: React.ReactNode;
  classNames?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'danger' | 'warning' | 'info';
  dismissable?: boolean;
  dismissLifetime?: 'refresh' | 'session';
}

export const Alert: React.FC<AlertProps> = ({
  children,
  classNames,
  color = 'primary',
  dismissable = false,
  dismissLifetime = 'refresh',
}) => {
  const [dismissed, setDismissed] = React.useState(false);

  const alertStyles = React.useMemo(() => {
    return cn([
      `alert alert-dismissible ui-fade ui-show ui-mb-3 ui-inline-flex ui-w-full ui-items-center ui-rounded-lg ui-bg-${color}-100 ui-py-5 ui-px-6 ui-text-base ui-text-${color}-700`,
      classNames,
    ]);
  }, [classNames, color]);

  const buttonStyles = React.useMemo(() => {
    return cn([
      `ui-ml-auto ui-rounded-none ui-border-none ui-text-${color}-900 ui-opacity-50 hover:ui-text-${color}-900 hover:ui-no-underline hover:ui-opacity-75 focus:ui-opacity-100 focus:ui-shadow-none focus:ui-outline-none`,
    ]);
  }, [color]);

  React.useEffect(() => {
    if (dismissLifetime === 'session') {
      // TODO: Figure out how tracking this might work for multiple alerts.
      const dismissState = JSON.parse(
        window.sessionStorage.getItem('alertDismissed') ?? 'false',
      );
      setDismissed(dismissState);
    }
  }, [dismissLifetime]);

  const handleDismiss = React.useCallback(() => {
    setDismissed(true);

    if (dismissLifetime === 'session') {
      window.sessionStorage.setItem('alertDismissed', 'true');
    }
  }, [dismissLifetime]);

  if (dismissed) {
    return null;
  }

  return (
    <div className={alertStyles} role="alert">
      {children}
      {dismissable && (
        <button
          type="button"
          className={buttonStyles}
          onClick={handleDismiss}
          aria-label="Close"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      )}
    </div>
  );
};

import * as React from 'react';
import cn from 'classnames';

export interface CardProps {
  title?: string;
  children?: React.ReactNode;
  classNames?: string;
  description?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  classNames,
  description,
  title,
}) => {
  const styles = React.useMemo(() => {
    return cn([`ui-flex ui-justify-center`, classNames]);
  }, [classNames]);

  return (
    <div className={styles}>
      <div className="ui-block ui-max-w-sm ui-rounded-lg ui-bg-white ui-p-6 ui-shadow-lg">
        {title && (
          <h5 className="ui-mb-2 ui-text-xl ui-font-medium ui-leading-tight ui-text-gray-900">
            {title}
          </h5>
        )}
        {description && (
          <p className="ui-mb-4 ui-text-base ui-text-gray-700">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
};

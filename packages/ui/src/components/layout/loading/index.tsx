import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import cn from 'classnames';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export interface LoadingProps {
  classNames?: string;
  size?: SizeProp;
}

export const Loading: React.FC<LoadingProps> = ({ classNames, size }) => {
  const styles = React.useMemo(() => {
    return cn([`ui-flex ui-justify-center ui-content-center`, classNames]);
  }, [classNames]);

  return (
    <div className={styles} role="status">
      <FontAwesomeIcon icon={faSpinner} size={size} spin />
    </div>
  );
};

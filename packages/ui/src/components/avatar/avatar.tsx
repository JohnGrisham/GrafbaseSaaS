/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import cn from 'classnames';

export interface AvatarProps {
  imageSrc: string;
  classNames?: string;
  title?: string;
  description?: string;
  width?: number;
}

export const Avatar: React.FC<AvatarProps> = ({
  classNames,
  description,
  imageSrc,
  title,
  width = 32,
}) => {
  const avatarWrapperStyles = React.useMemo(() => {
    return cn([`avatar ui-text-center`, classNames]);
  }, [classNames]);

  const avatarImageStyles = React.useMemo(() => {
    return cn([
      `ui-mx-auto ui-w-${width} ui-rounded-full`,
      {
        ['ui-mb-4']: title,
      },
    ]);
  }, [title, width]);

  return (
    <div className={avatarWrapperStyles}>
      <img src={imageSrc} className={avatarImageStyles} alt="Avatar" />
      {title && (
        <h5 className="ui-mb-2 ui-text-xl ui-font-medium ui-leading-tight dark:ui-text-white">
          John Doe
        </h5>
      )}
      {description && (
        <p className="ui-text-gray-500 dark:ui-text-white">Web designer</p>
      )}
    </div>
  );
};

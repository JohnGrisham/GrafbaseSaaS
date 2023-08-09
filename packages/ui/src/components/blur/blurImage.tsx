import * as React from 'react';
import type { ComponentProps } from 'react';
import Image from 'next/image';
import cn from 'classnames';

interface BlurImageProps extends ComponentProps<typeof Image> {
  alt: string;
  classNames?: string;
}

export const BlurImage: React.FC<BlurImageProps> = ({
  alt,
  classNames,
  ...props
}) => {
  const [isLoading, setLoading] = React.useState(true);

  const styles = React.useMemo(
    () =>
      cn([
        `ui-duration-700 ui-ease-in-out ui-grayscale-0 ui-blur-0 ui-scale-100`,
        {
          'ui-grayscale ui-blur-2xl ui-scale-110': isLoading,
        },
        classNames,
      ]),
    [classNames, isLoading],
  );

  return (
    <Image
      {...props}
      alt={alt}
      className={styles}
      onLoadingComplete={() => setLoading(false)}
    />
  );
};

import * as React from 'react';
import cn from 'classnames';

export interface DropdownItem {
  title: string;
  classNames?: string;
  disabled?: boolean;
  href?: string;
  onSelect?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => any;
}

export interface DropdownProps {
  children: React.ReactNode;
  items: DropdownItem[];
  classNames?: string;
  listClassNames?: string;
  disabled?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  children,
  classNames,
  disabled = false,
  items,
  listClassNames = 'ui-left-0',
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownWrapperStyles = React.useMemo(() => {
    return cn([
      `dropdown ui-relative`,
      {
        'ui-pointer-events-none ui-text-decoration-none ui-select-none':
          disabled,
      },
      classNames,
    ]);
  }, [classNames, disabled]);

  const dropdownListStyles = React.useMemo(() => {
    return cn([
      `ui-absolute ui-z-50 ui-float-left ui-py-2 ui-m-0 ui-mt-1 ui-text-base ui-text-inherit ui-text-left ui-list-none ui-bg-white ui-rounded-lg ui-shadow-lg dropdown-menu ui-min-w-max ui-bg-clip-padding dark:ui-bg-gray-800`,
      {
        ['ui-hidden']: !isOpen,
      },
      listClassNames,
    ]);
  }, [listClassNames, isOpen]);

  const getListItemStyles = React.useCallback(
    (classNames?: string, disabled?: boolean) => {
      return cn([
        `dropdown-item ui-block ui-w-full ui-whitespace-nowrap ui-px-4 ui-py-2 ui-text-sm ui-font-normal hover:ui-bg-gray-100 dark:ui-text-white dark:hover:ui-bg-gray-700`,
        {
          'ui-pointer-events-none ui-text-decoration-none ui-select-none':
            disabled,
        },
        classNames,
      ]);
    },
    [],
  );

  return (
    <div className={dropdownWrapperStyles}>
      <a
        className="dropdown-toggle ui-hidden-arrow ui-flex ui-items-center"
        href="#"
        id="dropdownMenuButton"
        role="button"
        aria-expanded="false"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen((current) => !current);
        }}
      >
        {children}
      </a>
      <ul className={dropdownListStyles} aria-labelledby="dropdownMenuButton">
        {items.map(
          ({ classNames, disabled, href = '#', title, onSelect }, i) => (
            <li key={`${title}-${i}`}>
              <a
                className={getListItemStyles(classNames, disabled)}
                aria-disabled={disabled}
                href={disabled ? undefined : href}
                onClick={(e) => {
                  if (disabled) return;
                  if (onSelect) onSelect(e);
                  setIsOpen(false);
                }}
              >
                {title}
              </a>
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

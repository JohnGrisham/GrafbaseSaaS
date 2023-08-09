/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import { Dropdown, DropdownItem } from '../../dropdown';
import { SignOutParams, signOut, useSession } from 'next-auth/react';
import { useRootDomain, useThemeContext } from '../../../hooks';
import { useBreakpointEffect } from 'tailwind-config';
import { Avatar } from '../../avatar';
import { Button } from '../../button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { Toggle } from '../../toggle';
import cn from 'classnames';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { isAuthScreen } from 'core';
import { usePathname } from 'next/navigation';

export interface NavItem {
  id: string;
  href: string;
  title: string;
  type: 'simple';
}

export interface CustomNavItem {
  id: string;
  component: React.ReactNode;
  type: 'custom';
}

export interface LogoSettings {
  title: string;
  src: string;
  href?: string;
}

export interface NavbarProps {
  navItems: Array<NavItem | CustomNavItem>;
  logoProps: LogoSettings;
  signoutOptions: Required<SignOutParams>;
  classNames?: string;
  profileItems?: DropdownItem[];
}

export const Navbar: React.FC<NavbarProps> = ({
  classNames,
  logoProps,
  navItems,
  signoutOptions,
  profileItems = [],
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { data: session, status } = useSession();
  const { isDarkMode, setDarkMode } = useThemeContext();
  const isRootDomain = useRootDomain();
  const pathname = usePathname();

  const navbarStyles = React.useMemo(() => {
    return cn([
      `ui-flex ui-border-gray-200 ui-bg-white ui-px-2 ui-py-2.5 dark:ui-bg-gray-900 sm:ui-px-4 ui-relative`,
      classNames,
    ]);
  }, [classNames]);

  const navWrapperStyles = React.useMemo(() => {
    return cn([
      `ui-items-center ui-w-full md:ui-flex md:ui-w-auto md:ui-space-x-8 md:ui-mr-20`,
      {
        ['ui-hidden']: !mobileMenuOpen,
        ['ui-absolute ui-left-0 ui-top-12']: mobileMenuOpen,
      },
    ]);
  }, [mobileMenuOpen]);

  const navStyles = React.useMemo(() => {
    return cn([
      `ui-mt-4 ui-mx-2 ui-flex ui-flex-col ui-text-gray-700 dark:ui-text-gray-400 ui-rounded-lg ui-border ui-border-gray-100 ui-bg-gray-50 ui-p-4 dark:ui-border-gray-700 dark:ui-bg-gray-800 md:ui-mt-0 md:ui-flex-row md:ui-space-x-8 md:ui-border-0 md:ui-bg-white md:ui-text-sm md:ui-font-medium md:dark:ui-bg-gray-900`,
    ]);
  }, []);

  const postNavStyles = React.useMemo(() => {
    return cn([
      `ui-flex ui-items-center ui-absolute ui-right-16 ui-top-[1.4rem] md:ui-top-6`,
    ]);
  }, []);

  const profileDropdownItems = React.useMemo(() => {
    const options = profileItems.concat({
      title: 'Sign Out',
      href: `/api/auth/signout`,
      onSelect: async (e) => {
        e.preventDefault();
        await signOut(signoutOptions);
      },
    });

    if (session && session.user?.email) {
      options.unshift({
        title: 'Profile',
        href: '/account',
      });
      options.unshift({
        classNames: 'ui-bg-primary-700 ui-text-white',
        title: session.user.email,
        disabled: true,
      });
    }

    return options;
  }, [profileItems, signoutOptions, session]);

  const getNavItemStyles = React.useCallback(
    (href: string) => {
      return cn([
        `ui-block ui-rounded ui-py-2 ui-pl-3 ui-pr-4 hover:ui-bg-white dark:hover:ui-bg-gray-700 dark:hover:ui-text-white md:ui-border-0 md:ui-p-0 md:hover:ui-bg-transparent hover:ui-text-primary-500 md:dark:hover:ui-bg-transparent md:dark:hover:ui-text-white`,
        {
          ['ui-text-primary-700']: pathname === href,
        },
      ]);
    },
    [pathname],
  );

  useBreakpointEffect('md', (match: any) => {
    if (match) {
      setMobileMenuOpen(false);
    }
  });

  if (!isRootDomain && status !== 'authenticated' && !session) {
    return null;
  }

  return (
    <nav className={navbarStyles}>
      <div className="ui-container ui-mx-auto ui-flex ui-h-14 ui-flex-wrap ui-items-center ui-justify-between">
        <a href={logoProps.href ?? '#'} className="ui-flex ui-items-center">
          <img
            src={logoProps.src}
            className="ui-mr-3 ui-h-6"
            alt={`${logoProps.title} Logo`}
          />
          <span className="ui-self-center ui-whitespace-nowrap ui-text-xl ui-font-semibold dark:ui-text-white">
            {logoProps.title}
          </span>
        </a>
        <div className="ui-flex ui-h-full">
          {status === 'authenticated' && session && (
            <>
              <div className={navWrapperStyles} id="navbar-items-wrapper">
                <ul className={navStyles}>
                  {navItems.map((item) => (
                    <li key={item.id} className="nav-item ui-p-2">
                      {item.type === 'simple' ? (
                        <Link
                          href={item.href}
                          className={getNavItemStyles(item.href)}
                        >
                          {item.title}
                        </Link>
                      ) : (
                        item.component
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={postNavStyles}>
                <Button
                  className="ui-ml-3 ui-mr-1 ui-inline-flex ui-items-center ui-rounded-lg ui-p-2 ui-text-sm ui-text-gray-500 hover:ui-bg-white focus:ui-outline-none focus:ui-ring-2 focus:ui-ring-gray-200 dark:ui-text-gray-400 dark:hover:ui-bg-gray-700 dark:focus:ui-ring-gray-600 md:ui-hidden"
                  aria-controls="navbar-items-wrapper"
                  aria-expanded="false"
                  onClick={() => setMobileMenuOpen((current) => !current)}
                >
                  <span className="ui-sr-only">Open main menu</span>
                  <FontAwesomeIcon icon={faBars} size={'lg'} />
                </Button>
                <Dropdown
                  listClassNames="ui-right-0"
                  items={profileDropdownItems}
                >
                  <Avatar
                    imageSrc={
                      session.user?.image ??
                      'https://mdbcdn.b-cdn.net/img/new/avatars/8.webp'
                    }
                    width={7}
                  />
                </Dropdown>
              </div>
            </>
          )}
        </div>
      </div>
      <div
        className={`ui-flex ui-flex-row ui-justify-between ${
          status !== 'authenticated' && !isAuthScreen() ? 'ui-w-32' : ''
        }`}
      >
        {status === 'unauthenticated' && !session && !isAuthScreen() && (
          <Button
            onClick={() => window.location.replace(signoutOptions.callbackUrl)}
            rounded
          >
            Login
          </Button>
        )}
        {status !== 'loading' && (
          <Toggle
            checked={isDarkMode}
            classNames="ui-ml-2 toggle-dark-mode"
            onChange={() => setDarkMode((currentMode) => !currentMode)}
          />
        )}
      </div>
    </nav>
  );
};

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export interface AccordionProps {
  children: React.ReactNode;
  classNames?: string;
  disabled?: boolean;
  header: string;
  initialCollapsed?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  classNames,
  disabled = false,
  header,
  initialCollapsed = true,
}) => {
  const [collapsed, setCollapsed] = React.useState(initialCollapsed);

  const accordionStyles = React.useMemo(() => {
    return cn([
      `accordion-item ui-border ui-border-gray-200 ui-bg-white ui-overflow-hidden dark:ui-bg-zinc-700 dark:ui-text-white`,
      {
        [`ui-cursor-not-allowed ui-text-decoration-none`]: disabled,
      },
      classNames,
    ]);
  }, [classNames, disabled]);

  const headerStyles = React.useMemo(() => {
    return cn([
      `accordion-header accordion-button ui-relative ui-mb-0
      ui-flex
      ui-w-full
      ui-select-none
      ui-items-center
      ui-rounded-none
      ui-border-0 ui-bg-inherit ui-py-4
      ui-px-5
      ui-justify-between
      ui-text-left
      ui-text-base
      ui-transition
      focus:ui-outline-none`,
      {
        [`ui-border-b ui-border-primary-200 ui-text-primary-500`]: !collapsed,
        [`ui-cursor-pointer`]: !disabled,
        [`ui-pointer-events-none`]: disabled,
      },
    ]);
  }, [collapsed, disabled]);

  return (
    <div className="accordion ui-w-full">
      <div className={accordionStyles}>
        <motion.h2
          className={headerStyles}
          initial={collapsed}
          onClick={() => setCollapsed((state) => !state)}
        >
          {header}
          <motion.div
            animate={collapsed ? 'collapsed' : 'open'}
            initial="collapsed"
            exit="collapsed"
            transition={{ duration: 0.2 }}
            variants={{ open: { rotate: -180 }, collapsed: { rotate: 0 } }}
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </motion.div>
        </motion.h2>
        <AnimatePresence initial={collapsed}>
          {!collapsed && (
            <motion.section
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              className="accordion-body ui-px-5 ui-py-4 ui-text-black dark:ui-text-white"
              variants={{
                open: { height: 'auto', visibility: 'visible' },
                collapsed: { height: 0, visibility: 'collapse' },
              }}
              transition={{
                bounceStiffness: 50,
                type: 'inertia',
                velocity: 1.35,
              }}
            >
              {children}
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

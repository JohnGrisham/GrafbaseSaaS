import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { toCamelCase } from 'core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export interface ModalProps {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  footer?: React.ReactNode;
  classNames?: string;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  classNames,
  isOpen,
  title,
  footer,
  onClose,
}) => {
  const styles = React.useMemo(() => {
    return cn([
      `modal ui-fade ui-fixed ui-top-0 ui-left-0 ui-h-full ui-w-full ui-overflow-y-auto ui-overflow-x-hidden ui-outline-none`,
      {
        ['ui-hidden']: !isOpen,
      },
      classNames,
    ]);
  }, [classNames, isOpen]);

  const titleCamel = React.useMemo(() => toCamelCase(title), [title]);
  const label = React.useMemo(() => `${titleCamel}ModelLabel`, [titleCamel]);

  return (
    <div
      className={styles}
      id={titleCamel}
      tabIndex={-1}
      aria-labelledby={label}
      aria-hidden="true"
    >
      <div className="modal-dialog ui-pointer-events-none ui-relative ui-w-auto">
        <div className="modal-content ui-pointer-events-auto ui-relative ui-flex ui-w-full ui-flex-col ui-rounded-md ui-border-none ui-bg-white ui-bg-clip-padding ui-text-current ui-shadow-lg ui-outline-none">
          <div className="modal-header ui-flex ui-flex-shrink-0 ui-items-center ui-justify-between ui-rounded-t-md ui-border-b ui-border-gray-200 ui-p-4">
            <h5
              className="ui-text-xl ui-font-medium ui-leading-normal ui-text-gray-800"
              id={label}
            >
              {title}
            </h5>
            <button
              type="button"
              className="ui-box-content ui-h-4 ui-w-4 ui-rounded-none ui-border-none ui-p-1 ui-text-black ui-opacity-50 hover:ui-text-black hover:ui-no-underline hover:ui-opacity-75 focus:ui-opacity-100 focus:ui-shadow-none focus:ui-outline-none"
              onClick={onClose}
              aria-label="Close"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <div className="modal-body ui-relative ui-p-4">{children}</div>
          <div className="modal-footer ui-flex ui-flex-shrink-0 ui-flex-wrap ui-items-center ui-justify-end ui-rounded-b-md ui-border-t ui-border-gray-200 ui-p-4">
            {!footer ? (
              <button
                type="button"
                className="py-2.5 ui-rounded ui-bg-purple-600 ui-px-6 ui-text-xs ui-font-medium ui-uppercase ui-leading-tight ui-text-white ui-shadow-md ui-transition ui-duration-150 ui-ease-in-out hover:ui-bg-purple-700 hover:ui-shadow-lg focus:ui-bg-purple-700 focus:ui-shadow-lg focus:ui-outline-none focus:ui-ring-0 active:ui-bg-purple-800 active:ui-shadow-lg"
                onClick={onClose}
              >
                Close
              </button>
            ) : (
              footer
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

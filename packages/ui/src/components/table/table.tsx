import * as React from 'react';
import { Button, ButtonProps } from '../button';
import cn from 'classnames';
import split from 'just-split';

export interface TableRowItem {
  id: string;
  cells: string[];
}

export interface TableProps {
  headers: string[];
  data: TableRowItem[];
  currentPage?: number;
  classNames?: string;
  pageCount?: number;
  setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
}

export const Table: React.FC<TableProps> = ({
  classNames,
  currentPage = 1,
  data,
  headers,
  pageCount = 10,
  setCurrentPage,
}) => {
  const [page, setPage] = React.useState(currentPage);
  const styles = React.useMemo(() => {
    return cn([
      `ui-flex ui-flex-col ui-text-gray-900 dark:ui-text-white`,
      classNames,
    ]);
  }, [classNames]);

  const tableHeaders = React.useMemo(
    () =>
      headers.map((header, i) => (
        <th
          key={`${header}-${i}`}
          scope="col"
          className="ui-px-6 ui-py-4 ui-text-left ui-text-sm ui-font-medium"
        >
          {header}
        </th>
      )),
    [headers],
  );

  const tableRows = React.useMemo(
    () =>
      split(data, pageCount).map((pageItems) => {
        return pageItems.map(({ id, cells }) => (
          <tr
            id={id}
            key={id}
            className="ui-border-b ui-transition ui-duration-300 ui-ease-in-out hover:ui-bg-accent-100"
          >
            {cells.map((cell) => (
              <td className="ui-whitespace-nowrap ui-px-6 ui-py-4 ui-text-sm ui-font-medium">
                {cell}
              </td>
            ))}
          </tr>
        ));
      }),
    [data, pageCount],
  );

  const getPageLinkStyles = React.useCallback(
    (pageNum: number) => {
      return cn([
        `page-link ui-relative ui-block ui-rounded ui-rounded ui-border-0 ui-py-1.5 ui-px-3 ui-outline-none ui-transition-all ui-duration-300 hover:ui-bg-gray-200 hover:ui-text-gray-800 focus:ui-shadow-none dark:ui-text-white dark:hover:ui-text-gray-800`,
        {
          [`ui-bg-primary-600 ui-text-white`]: page === pageNum,
        },
      ]);
    },
    [page],
  );

  const getPageNavProps = React.useCallback(
    (navType: 'Previous' | 'Next'): ButtonProps => {
      const disabled =
        (navType === 'Previous' && page === 1) ||
        (navType === 'Next' && page === tableRows.length);

      return {
        children: navType,
        className: cn([
          `page-link ui-relative ui-block ui-rounded ui-rounded ui-border-0 ui-py-1.5 ui-px-3 ui-outline-none ui-transition-all ui-duration-300 focus:ui-shadow-none hover:ui-text-gray-800 hover:ui-bg-gray-200 focus:ui-shadow-none`,
          {
            'ui-bg-transparent ui-pointer-events-none ui-text-gray-500':
              disabled,
          },
        ]),
        type: 'button',
        link: true,
        disabled,
        onClick: () => {
          if (navType === 'Previous') {
            setCurrentPage
              ? setCurrentPage((current) => current - 1)
              : setPage((current) => current - 1);
          } else {
            setCurrentPage
              ? setCurrentPage((current) => current + 1)
              : setPage((current) => current + 1);
          }
        },
      };
    },
    [page, setCurrentPage, tableRows],
  );

  React.useEffect(() => {
    if (!data.every(({ cells }) => cells.length === headers.length)) {
      throw new Error(
        'Invalid number of data cells for the provided number of table headers',
      );
    }
  }, [data, headers]);

  return (
    <div className={styles}>
      <div className="ui-overflow-x-auto sm:-ui-mx-6 lg:-ui-mx-8">
        <div className="ui-inline-block ui-min-w-full ui-py-2 sm:ui-px-6 lg:ui-px-8">
          <div className="ui-overflow-hidden">
            <table className="ui-min-w-full">
              <thead className="ui-border-b">
                <tr>{tableHeaders}</tr>
              </thead>
              <tbody>{tableRows[page - 1]}</tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="ui-flex ui-justify-center">
        <nav>
          <ul className="ui-list-style-none ui-flex">
            <li className="page-item ui-disabled">
              <Button tabIndex={-1} {...getPageNavProps('Previous')} />
            </li>
            {tableRows.map((_p, i) => {
              const pageNum = i + 1;

              return (
                <li className="page-item">
                  <Button
                    className={getPageLinkStyles(pageNum)}
                    type="button"
                    onClick={() =>
                      setCurrentPage
                        ? setCurrentPage(pageNum)
                        : setPage(pageNum)
                    }
                    link
                  >
                    {pageNum}
                  </Button>
                </li>
              );
            })}
            <li className="page-item">
              <Button {...getPageNavProps('Next')} />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

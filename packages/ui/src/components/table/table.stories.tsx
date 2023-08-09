import { Table, TableRowItem } from './table';

const table = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Table',
  component: Table,
};

export default table;

export const Basic = () => {
  const headers = ['#', 'First', 'Last'];
  const data: TableRowItem[] = [
    { id: '1', cells: ['1', 'John', 'Doe'] },
    { id: '2', cells: ['2', 'Jane', 'Doe'] },
    { id: '3', cells: ['3', 'Max', 'Doe'] },
    { id: '4', cells: ['4', 'Josh', 'Doe'] },
    { id: '5', cells: ['5', 'Rob', 'Doe'] },
    { id: '6', cells: ['6', 'Don', 'Doe'] },
    { id: '7', cells: ['7', 'Dan', 'Doe'] },
    { id: '8', cells: ['8', 'Stan', 'Doe'] },
    { id: '9', cells: ['9', 'Rand', 'Doe'] },
    { id: '10', cells: ['10', 'Chan', 'Doe'] },
    { id: '11', cells: ['11', 'Fan', 'Doe'] },
  ];

  return (
    <div className="ui-flex ui-flex-col ui-justify-center">
      <Table data={data} headers={headers} />
    </div>
  );
};

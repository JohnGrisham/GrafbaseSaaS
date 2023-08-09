import { Button } from '../button';
import { Dropdown } from './dropdown';

const dropdown = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Dropdown',
  component: Dropdown,
};

export default dropdown;

export const Basic = () => (
  <div className="ui-flex ui-justify-center ui-space-x-2">
    <Dropdown
      items={[
        {
          title: 'Item 1',
          onSelect: (e) => {
            e.preventDefault();
            console.log('Item 1 selected');
          },
        },
        {
          title: 'Item 2',
          onSelect: (e) => {
            e.preventDefault();
            console.log('Item 2 selected');
          },
        },
        {
          title: 'Item 3',
          onSelect: (e) => {
            e.preventDefault();
            console.log('Item 3 selected');
          },
        },
      ]}
    >
      <Button>Click Me</Button>
    </Dropdown>
  </div>
);

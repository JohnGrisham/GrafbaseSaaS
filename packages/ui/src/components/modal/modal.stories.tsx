import { Button } from '../button';
import { Modal } from './modal';
import { useState } from '@storybook/addons';

const modal = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Modal',
  component: Modal,
};

export default modal;

export const Basic = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="ui-flex ui-flex-col ui-justify-center">
      <Button onClick={() => setOpen(true)}>Show Modal</Button>
      <Modal title="Modal Title" isOpen={open} onClose={() => setOpen(false)}>
        <>Modal body text goes here.</>
      </Modal>
    </div>
  );
};

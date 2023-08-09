import { Card } from './card';

const card = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Card',
  component: Card,
};

export default card;

export const Basic = () => (
  <div className="ui-flex ui-justify-center ui-space-x-2">
    <Card
      title="A basic card"
      description="Some quick example text to build on the card title and make up the bulk of the card's
      content."
    />
  </div>
);

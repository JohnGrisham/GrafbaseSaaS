import { Loading } from './index';

const loading = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Loading',
  component: Loading,
};

export default loading;

export const Basic = () => (
  <div className="ui-flex ui-justify-center ui-space-x-2">
    <Loading size="2xl" />
  </div>
);

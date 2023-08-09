import { Avatar } from './avatar';

const avatar = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Avatar',
  component: Avatar,
};

export default avatar;

export const Basic = () => (
  <div className="ui-flex ui-justify-center ui-space-x-2">
    <Avatar
      imageSrc="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
      title="John Doe"
      description="Web designer"
    />
  </div>
);

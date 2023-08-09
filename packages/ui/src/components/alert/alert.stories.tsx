import { Alert } from './alert';

const alert = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Alert',
  component: Alert,
};

export default alert;

export const Basic = () => (
  <div className="ui-flex ui-flex-col ui-justify-center">
    <Alert>
      <strong className="ui-mr-1">Primary</strong> You should check in on some
      of those fields below.
    </Alert>
    <Alert color="secondary">
      <strong className="ui-mr-1">Secondary</strong> You should check in on some
      of those fields below.
    </Alert>
    <Alert color="accent">
      <strong className="ui-mr-1">Accent</strong> You should check in on some of
      those fields below.
    </Alert>
    <Alert color="danger">
      <strong className="ui-mr-1">Danger</strong> You should check in on some of
      those fields below.
    </Alert>
    <Alert color="warning">
      <strong className="ui-mr-1">Warning</strong> You should check in on some
      of those fields below.
    </Alert>
    <Alert color="info">
      <strong className="ui-mr-1">Info</strong> You should check in on some of
      those fields below.
    </Alert>
  </div>
);

export const Dismissable = () => (
  <div className="ui-flex ui-flex-col ui-justify-center">
    <Alert dismissable>
      <strong className="ui-mr-1">Dismiss Me</strong> but I will be back on
      refresh
    </Alert>
    <Alert dismissable dismissLifetime="session">
      <strong className="ui-mr-1">Dismiss Me</strong> and I will be gone for the
      duration of your session
    </Alert>
  </div>
);

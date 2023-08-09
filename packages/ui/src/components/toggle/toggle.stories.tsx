import { Toggle } from './toggle';

const toggle = {
  title: 'Toggle',
  component: Toggle,
};

export default toggle;

export const Basic = () => (
  <div className="ui-flex ui-justify-center">
    <div className="ui-flex ui-flex-col ui-items-start">
      <Toggle label="Primary" />
      <Toggle label="Secondary" color="secondary" />
      <Toggle label="Accent" color="accent" />
      <Toggle label="Danger" color="danger" />
      <Toggle label="Warning" color="warning" />
      <Toggle label="Info" color="info" />
      <Toggle label="Disabled" disabled />
    </div>
  </div>
);

export const Sizes = () => (
  <div className="ui-flex ui-justify-center">
    <div className="ui-flex ui-flex-col ui-items-start">
      <Toggle label="Small" size="small" />
      <Toggle label="Medium" />
      <Toggle label="Large" size="large" />
    </div>
  </div>
);

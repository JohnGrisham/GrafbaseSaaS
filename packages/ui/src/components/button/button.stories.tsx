import { Button } from './button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDown,
  faArrowUp,
  faArrowLeft,
  faBan,
  faQuestionCircle,
  faTrash,
  faWarning,
} from '@fortawesome/free-solid-svg-icons';

const button = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Button',
  component: Button,
};

export default button;

export const Solid = () => (
  <div className="ui-flex ui-justify-center ui-space-x-2">
    <Button>Primary</Button>
    <Button color="secondary">Secondary</Button>
    <Button color="accent">Accent</Button>
    <Button color="danger">Danger</Button>
    <Button color="warning">Warning</Button>
    <Button color="info">Info</Button>
    <Button disabled>Disabled</Button>
  </div>
);

export const Outline = () => (
  <div className="ui-flex ui-justify-center ui-space-x-2">
    <Button outline>Primary</Button>
    <Button color="secondary" outline>
      Secondary
    </Button>
    <Button color="accent" outline>
      Accent
    </Button>
    <Button color="danger" outline>
      Danger
    </Button>
    <Button color="warning" outline>
      Warning
    </Button>
    <Button color="info" outline>
      Info
    </Button>
    <Button outline disabled>
      Disabled
    </Button>
  </div>
);

export const Rounded = () => (
  <div className="ui-flex ui-justify-center ui-space-x-2">
    <Button rounded>Primary</Button>
    <Button color="secondary" rounded>
      Secondary
    </Button>
    <Button color="accent" rounded>
      Accent
    </Button>
    <Button color="danger" rounded>
      Danger
    </Button>
    <Button color="warning" rounded>
      Warning
    </Button>
    <Button color="info" rounded>
      Info
    </Button>
    <Button rounded disabled>
      Disabled
    </Button>
  </div>
);

export const Link = () => (
  <div className="ui-flex ui-justify-center ui-space-x-2">
    <Button link="http://localhost:6006/?path=/story/button--link">
      Primary
    </Button>
    <Button
      color="secondary"
      link="http://localhost:6006/?path=/story/button--link"
    >
      Secondary
    </Button>
    <Button
      color="accent"
      link="http://localhost:6006/?path=/story/button--link"
    >
      Accent
    </Button>
    <Button
      color="danger"
      link="http://localhost:6006/?path=/story/button--link"
    >
      Danger
    </Button>
    <Button
      color="warning"
      link="http://localhost:6006/?path=/story/button--link"
    >
      Warning
    </Button>
    <Button color="info" link="http://localhost:6006/?path=/story/button--link">
      Info
    </Button>
    <Button link="http://localhost:6006/?path=/story/button--link" disabled>
      Disabled
    </Button>
  </div>
);

export const Icon = () => (
  <div className="ui-flex ui-justify-center ui-space-x-2">
    <Button rounded>
      <FontAwesomeIcon icon={faArrowDown} />
    </Button>
    <Button color="secondary" rounded>
      <FontAwesomeIcon icon={faArrowUp} />
    </Button>
    <Button color="accent" rounded>
      <FontAwesomeIcon icon={faArrowLeft} />
    </Button>
    <Button color="danger" rounded>
      <FontAwesomeIcon icon={faTrash} />
    </Button>
    <Button color="warning" rounded>
      <FontAwesomeIcon icon={faWarning} />
    </Button>
    <Button color="info" rounded>
      <FontAwesomeIcon icon={faQuestionCircle} />
    </Button>
    <Button rounded disabled>
      <FontAwesomeIcon icon={faBan} />
    </Button>
  </div>
);

export const Sizes = () => (
  <div className="ui-flex ui-justify-center ui-space-x-2">
    <Button size="small">Small</Button>
    <Button>Medium</Button>
    <Button size="large">Large</Button>
  </div>
);

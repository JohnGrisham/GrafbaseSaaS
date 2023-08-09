import { Accordion } from './accordion';

const accordian = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Accordian',
  component: Accordion,
};

export default accordian;

export const Basic = () => (
  <div className="ui-flex ui-justify-center ui-space-x-2">
    <Accordion header="Accordion Item #1">
      <strong>This is the first item&apos;s accordion body.</strong> It is shown
      by default, until the collapse plugin adds the appropriate classes that we
      use to style each element. These classes control the overall appearance,
      as well as the showing and hiding via CSS transitions. You can modify any
      of this with custom CSS or overriding our default variables. It&apos;s
      also worth noting that just about any HTML can go within the{' '}
      <code>.accordion-body</code>, though the transition does limit overflow.
    </Accordion>
  </div>
);

export const Disabled = () => (
  <div className="ui-flex ui-justify-center ui-space-x-2">
    <Accordion header="Accordion Item #1" disabled>
      <strong>This is the first item&apos;s accordion body.</strong> It is shown
      by default, until the collapse plugin adds the appropriate classes that we
      use to style each element. These classes control the overall appearance,
      as well as the showing and hiding via CSS transitions. You can modify any
      of this with custom CSS or overriding our default variables. It&apos;s
      also worth noting that just about any HTML can go within the{' '}
      <code>.accordion-body</code>, though the transition does limit overflow.
    </Accordion>
  </div>
);

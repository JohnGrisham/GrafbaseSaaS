import { Field as InputField, Select as InputSelect } from '.';
import { Formik } from 'formik';

const input = {
  title: 'Input',
  component: InputField,
};

export default input;

export const Field = () => (
  <div className="ui-flex ui-justify-center">
    <Formik initialValues={{}} onSubmit={() => {}}>
      <section>
        <InputField name="Text No Label" placeholder="No Label" />
        <InputField label="With Label" name="Text With Label" />
        <InputField label="Inset Label" name="Text" inset />
        <InputField
          label="Number"
          name="number"
          type="number"
          placeholder="Enter a number"
        />
        <InputField
          label="Required Email"
          name="email"
          type="email"
          placeholder="Email"
          required
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
        />
        <InputField label="Date" name="date" type="date" />
      </section>
    </Formik>
  </div>
);

export const Select = () => (
  <div className="ui-flex ui-justify-center">
    <Formik initialValues={{}} onSubmit={() => {}}>
      <section>
        <InputSelect
          name="Select Field"
          label="Select Field"
          placeholder="Select your option"
          options={[
            { label: 'Opt1', value: 'opt1' },
            { label: 'Opt2', value: 'opt2' },
            { value: 'Opt3' },
          ]}
        />
        <InputSelect
          name="Select Field (Required)"
          label="Select Field (Required)"
          placeholder="Select your option"
          options={[
            { label: 'Opt1', value: 'opt1' },
            { label: 'Opt2', value: 'opt2' },
            { value: 'Opt3' },
          ]}
          required
        />
      </section>
    </Formik>
  </div>
);

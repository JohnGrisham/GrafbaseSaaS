import * as React from 'react';
import { Formik, FormikConfig, Form as FormikForm } from 'formik';

export interface FormProps<T = any> extends FormikConfig<T> {
  innerFormProps?: React.HTMLAttributes<HTMLFormElement>;
}

export const Form: React.FC<FormProps> = ({
  children,
  innerFormProps,
  ...formikProps
}) => {
  return (
    <Formik {...formikProps}>
      {(props) => (
        <FormikForm {...innerFormProps}>
          {typeof children === 'function' ? children(props) : children}
        </FormikForm>
      )}
    </Formik>
  );
};

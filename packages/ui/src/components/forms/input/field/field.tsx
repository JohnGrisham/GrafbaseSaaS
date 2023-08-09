import * as React from 'react';
import * as Yup from 'yup';
import {
  ErrorMessage,
  Field as FormikField,
  FieldValidator,
  FieldAttributes,
  useField,
} from 'formik';
import cn from 'classnames';

export type FieldProps = Omit<
  FieldAttributes<React.HTMLAttributes<HTMLInputElement>>,
  'type'
> & {
  classNames?: string;
  label?: string;
  required?: boolean;
  type?: React.HTMLInputTypeAttribute;
  inset?: boolean;
};

export const Field: React.FC<FieldProps> = ({
  classNames,
  disabled = false,
  inset = false,
  label,
  name,
  required,
  type = 'text',
  validate,
  ...inputProps
}) => {
  const validateType: FieldValidator = React.useCallback(
    async (value: any) => {
      let error: string | undefined = undefined;

      if (!value && required) {
        return `${name} is required`;
      }

      switch (type) {
        case 'text': {
          const valid = await Yup.string().isValid(value);

          if (value && !valid) {
            error = 'Value must be text';
          }
          break;
        }

        case 'number': {
          const valid = await Yup.number().isValid(value);

          if (value && !valid) {
            error = 'Value must be a number';
          }
          break;
        }

        case 'email': {
          const valid = await Yup.string().email().isValid(value);

          if (value && !valid) {
            error = 'Invalid email address';
          }
          break;
        }

        case 'date': {
          const valid = await Yup.date().isValid(value);

          if (value && !valid) {
            error = 'Value must be a date';
          }
          break;
        }
      }

      return error;
    },
    [name, required, type],
  );
  const [field, meta] = useField({
    disabled,
    name,
    type,
    validate: validate ?? validateType,
  });

  const isErrorState = (meta.touched || meta.value) && meta.error;

  const inputStateStyles = React.useMemo(() => {
    return cn({
      '!ui-ring-danger-500 !ui-text-danger-500': isErrorState,
      'ui-text-gray-700': !meta.error,
      'focus-within:ui-ring-primary-600': !meta.error,
    });
  }, [isErrorState, meta]);

  const styles = React.useMemo(() => {
    return cn([
      `ui-block ui-w-full ui-m-0 ui-font-normal ui-transition ui-ease-in-out ui-bg-white ui-form-control ui-ring-gray-300 ui-bg-clip-padding focus:ui-bg-white focus:ui-outline-none`,
      inputStateStyles,
      {
        'ui-ring-1 ui-ring-inset ui-rounded-md ui-px-4 ui-py-2 ui-text-xl':
          !inset,
      },
      classNames,
    ]);
  }, [classNames, inset, inputStateStyles]);

  const wrapperStyles = React.useMemo(() => {
    return cn([
      `ui-transition ui-ease-in-out ui-w-full ui-mb-6 field-wrapper`,
      inset ? inputStateStyles : '',
      {
        'ui-bg-white ui-px-3 ui-pb-1.5 ui-pt-2.5 ui-rounded-md ui-shadow-sm ui-ring-1 ui-ring-inset ui-ring-gray-300':
          inset,
      },
    ]);
  }, [inset, inputStateStyles]);

  const labelStyles = React.useMemo(() => {
    return cn([
      `ui-block ui-font-bold ui-text-gray-700 ui-text-left`,
      {
        '!ui-text-danger-500': isErrorState,
        'ui-text-xs': inset,
        'ui-text-sm dark:ui-text-white': !inset,
      },
    ]);
  }, [isErrorState, inset]);

  return (
    <div
      aria-required={required}
      aria-disabled={disabled}
      className={`ui-relative ui-flex ui-justify-center ${
        disabled ? 'ui-cursor-not-allowed ui-opacity-60' : ''
      }`}
    >
      <div className={wrapperStyles}>
        {label && (
          <label className={labelStyles} htmlFor={label}>
            {label}
          </label>
        )}
        <FormikField
          className={styles}
          disabled={disabled}
          id={label}
          name={name}
          type={type}
          placeholder={
            inputProps.placeholder ?? inset ? `Insert ${name}...` : undefined
          }
          value={inputProps.defaultValue ? undefined : field.value || ''}
          {...inputProps}
        />
        <ErrorMessage
          component="a"
          className="ui-absolute ui-text-sm ui-text-red-500"
          name={name}
        />
      </div>
    </div>
  );
};

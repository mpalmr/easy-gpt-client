import React, { ChangeEvent, ChangeEventHandler, FC } from 'react';
import { useField } from 'formik';
import { Form, FormControlProps } from 'react-bootstrap';
import FormGroup from './form-group';

interface Props extends FormControlProps {
  name: string;
  label?: string;
  type?: 'text' | 'email' | 'password';
  disabled?: boolean;
  textArea?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const TextField: FC<Props> = function TextField({
  className,
  name,
  label,
  disabled,
  textArea,
  onChange,
  ...props
}) {
  const [field, { touched, error }] = useField<string>(name);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    field.onChange(event);
    if (onChange) onChange(event);
  }

  return (
    <FormGroup
      className={className}
      label={label}
      touched={touched}
      error={error}
    >
      <Form.Control
        {...props}
        {...field}
        as={textArea ? 'textarea' : undefined}
        disabled={!!disabled}
        onChange={handleChange}
      />
    </FormGroup>
  );
};

export default TextField;

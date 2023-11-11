import React, { ChangeEvent, ChangeEventHandler, FC } from 'react';
import { useField } from 'formik';
import { Form, FormControlProps } from 'react-bootstrap';
import Label from './label';

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
    <Form.Group className={className}>
      {label && <Label>{label}</Label>}

      <Form.Control
        {...props}
        {...field}
        as={textArea ? 'textarea' : undefined}
        disabled={!!disabled}
        onChange={handleChange}
      />

      {touched && error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default TextField;

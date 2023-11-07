import React, { FC } from 'react';
import { useField } from 'formik';
import { Form, FormControlProps } from 'react-bootstrap';
import Label from './label';

interface Props extends FormControlProps {
  name: string;
  label?: string;
  disabled?: boolean;
  textArea?: boolean;
}

const TextField: FC<Props> = function TextField({
  className,
  name,
  label,
  disabled,
  textArea,
}) {
  const [field, { touched, error }] = useField<string>(name);

  return (
    <Form.Group className={className}>
      {label && <Label>{label}</Label>}

      <Form.Control
        {...field}
        as={textArea ? 'textarea' : undefined}
        disabled={!!disabled}
      />

      {touched && error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default TextField;

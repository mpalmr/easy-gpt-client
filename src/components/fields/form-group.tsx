import React, { ReactNode, FC } from 'react';
import { Form } from 'react-bootstrap';
import Label from './label';

interface Props {
  children: ReactNode;
  className?: string;
  label?: string;
  touched?: boolean;
  error?: string;
}

const FormGroup: FC<Props> = function FormGroup({
  children,
  className,
  label,
  touched,
  error,
}) {
  return (
    <Form.Group className={className}>
      {label && <Label>{label}</Label>}
      {children}
      {touched && error && (
        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default FormGroup;

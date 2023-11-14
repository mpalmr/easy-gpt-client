import React, { FC } from 'react';
import { useField } from 'formik';
import Select, { Props as SelectProps } from 'react-select';
import { Form } from 'react-bootstrap';
import FormGroup from './form-group';

interface Props extends SelectProps {
  name: string;
  label?: string;
  disabled?: boolean;
}

const SelectModel: FC<Props> = function SelectModel({
  className,
  name,
  label,
  disabled,
  ...props
}) {
  const [field, { touched, error }] = useField(name);

  return (
    <FormGroup
      className={className}
      label={label}
      touched={touched}
      error={error}
    >
      <Select
        {...props}
        {...field}
        isDisabled={disabled}
      />
    </FormGroup>
  );
};

export default SelectModel;

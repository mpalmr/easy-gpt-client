import React, { ReactNode, FC } from 'react';
import styled from 'styled-components';
import { Button, Row, Col } from 'react-bootstrap';

const Wrapper = styled(Row)`
  > .row {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

interface Props {
  children?: ReactNode;
  disabled?: boolean;
  submitText?: string;
}

const FormControls: FC<Props> = function FormControls({ children, disabled, submitText }) {
  return (
    <Wrapper>
      <Col xs={12}>
        {children}
        <Button type="submit" variant="success" disabled={disabled}>
          {submitText || 'Submit'}
        </Button>
      </Col>
    </Wrapper>
  );
};

export default FormControls;

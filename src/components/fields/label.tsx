import styled from 'styled-components';
import { Form } from 'react-bootstrap';

const Label = styled(Form.Label)`
  font-weight: bold;
  &::after {
    content: ':';
  }
`;

export default Label;

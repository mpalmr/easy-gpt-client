import React, { FC } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Row, Col, Container } from 'react-bootstrap';
import apiClient from '../../api-client';
import { TextField } from '../../components/fields';
import FormControls from '../../components/form-controls';

interface FormValues {
  email: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().trim().email().required(),
})
  .required();

const ResendVerification: FC = function ResendVerification() {
  async function handleSubmit(email: string) {
    await apiClient.post('/users/verify/resend', { email });
  }

  return (
    <Container as="section">
      <Formik<FormValues>
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values.email)}
      >
        {({ isSubmitting }) => (
          <Form noValidate>
            <Row>
              <Col xs={12}>
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  disabled={isSubmitting}
                />
              </Col>
            </Row>

            <FormControls disabled={isSubmitting} />
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ResendVerification;

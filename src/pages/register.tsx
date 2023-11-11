import React, { useEffect, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import apiClient from '../api-client';
import useToast from '../providers/toast';
import useCurrentUser from '../providers/current-user';
import { TextField } from '../components/fields';
import FormControls from '../components/form-controls';

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const emailValidation = Yup.string().trim().email().required();

const validationSchema = Yup.object().shape({
  email: emailValidation,
  password: Yup.string().min(6).required(),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
})
  .required();

const RegisterPage: FC = function RegisterPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useCurrentUser();

  useEffect(() => {
    if (user) navigate('/');
  }, []);

  async function handleSubmit({ confirmPassword, ...values }: FormValues) {
    await apiClient.post('/users', values)
      .then(() => {
        navigate('/login');
      })
      .catch((ex) => {
        console.error(ex);
        toast.error('Could not create user.');
      });
  }

  return (
    <Container>
      <h1>Register</h1>
      <Formik<FormValues>
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
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

            <Row>
              <Col xs={12} md={6}>
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  disabled={isSubmitting}
                />
              </Col>

              <Col xs={12} md={6}>
                <TextField
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  disabled={isSubmitting}
                />
              </Col>
            </Row>

            <FormControls disabled={isSubmitting} submitText="Register" />
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default RegisterPage;

import React, { useEffect, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import type { AxiosError } from 'axios';
import useCurrentUser from '../providers/current-user';
import useToast from '../providers/toast';
import { TextField } from '../components/fields';
import FormControls from '../components/form-controls';

interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().trim().email().required(),
  password: Yup.string().required(),
})
  .required();

const LoginPage: FC = function LoginPage() {
  const toast = useToast();
  const navigate = useNavigate();
  const { user, login } = useCurrentUser();

  async function handleSubmit(values: FormValues) {
    await login(values.email, values.password)
      .then(() => {
        navigate('/');
      })
      .catch((ex: AxiosError) => {
        console.error(ex);
        toast.error(ex?.response?.status === 401
          ? 'Invalid credentials.'
          : 'Unknown error when authenticating.');
      });
  }

  useEffect(() => {
    if (user) navigate(-1);
  }, []);

  return (
    <Container>
      <h1>Login</h1>
      <Formik<FormValues>
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ isSubmitting }) => (
          <Form noValidate>
            <Row>
              <Col xs={12} md={6}>
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  disabled={isSubmitting}
                />
              </Col>

              <Col xs={12} md={6}>
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  disabled={isSubmitting}
                />
              </Col>
            </Row>

            <FormControls disabled={isSubmitting} submitText="Login" />
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default LoginPage;

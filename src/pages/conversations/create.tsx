import React, { FC } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import apiClient from '../../api-client';
import useToast from '../../providers/toast';
import { TextField } from '../../components/fields';
import FormControls from '../../components/form-controls';

const DEFAULT_TEMPERATURE = 0.1;

interface FormValues {
  label: string;
  temperature: string;
  message: string;
}

const validationSchema = Yup.object().shape({
  label: Yup.string().trim().required(),
  temperature: Yup.number().positive().default(DEFAULT_TEMPERATURE),
  message: Yup.string().trim().required(),
})
  .required();

const CreateConversationPage: FC = function CreateConversationPage() {
  const toast = useToast();

  async function handleSubmit(values: FormValues) {
    await apiClient.post('/conversations', values)
      .catch((ex) => {
        console.error(ex);
        toast.error('Unable to create conversation.');
      });
  }

  return (
    <Container>
      <Formik<FormValues>
        initialValues={{
          label: '',
          temperature: DEFAULT_TEMPERATURE.toString(),
          message: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form noValidate>
            <Row className="mb-3">
              <Col xs={12} md={6}>
                <TextField name="label" label="Label" disabled={isSubmitting} />
              </Col>

              <Col xs={12} md={6}>
                <TextField name="temperature" label="Temperature" disabled={isSubmitting} />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12}>
                <TextField name="message" disabled={isSubmitting} textArea />
              </Col>
            </Row>

            <FormControls />
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CreateConversationPage;

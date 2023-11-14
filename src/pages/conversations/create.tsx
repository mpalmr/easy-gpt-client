import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import apiClient from '../../api-client';
import useToast from '../../providers/toast';
import { TextField } from '../../components/fields';
import FormControls from '../../components/form-controls';
import type {  }

interface FormValues {
  label: string;
  model: 
  temperature: string;
  systemPrompt: string;
}

const validationSchema = Yup.object().shape({
  label: Yup.string().trim().required(),
  temperature: Yup.number().min(0).max(2).default(1),
  systemPrompt: Yup.string().trim(),
})
  .required();

const CreateConversationPage: FC = function CreateConversationPage() {
  const navigate = useNavigate();
  const toast = useToast();

  async function handleSubmit({ temperature, systemPrompt, ...values }: FormValues) {
    await apiClient.post<{ id: string }>('/conversations', {
      ...values,
      temperature: parseInt(temperature, 10),
      systemPrompt: systemPrompt || undefined,
    })
      .then((res) => {
        navigate(`/conversations/${res.data.id}`);
      })
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
          temperature: '0.1',
          systemPrompt: '',
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
                <TextField
                  textArea
                  name="systemPrompt"
                  label="System Prompt"
                  disabled={isSubmitting}
                />
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

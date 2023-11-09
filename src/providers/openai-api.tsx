import React, {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
  ReactNode,
  FC,
} from 'react';
import styled from 'styled-components';
import axios, { AxiosInstance } from 'axios';
import { Modal, Form, Button } from 'react-bootstrap';
import useCurrentUser from './current-user';
import { useAfterEffect } from '../hooks';

const CACHE_KEY = 'openaiApiKey';

interface Context {
  apiClient: AxiosInstance | null;
  edit(): void;
}

const OpenaiApiContext = createContext<Context | null>(null);

export default function useOpenai() {
  const ctx = useContext(OpenaiApiContext);
  if (!ctx) throw new Error('Must be child of <OpenaiProvider>');
  return ctx;
}

const ModalBody = styled(Modal.Body)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalFooter = styled(Modal.Footer)`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  > button:not(:last-of-type) {
    margin-right: .8em;
  }
`;

interface Props {
  children: ReactNode;
}

export const OpenaiApiProvider: FC<Props> = function OpenaiProvider({ children }) {
  const currentUser = useCurrentUser();
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [apiClient, setApiClient] = useState<AxiosInstance | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [persist, setPersist] = useState(true);

  const storage = persist ? localStorage : sessionStorage;

  useEffect(() => {
    setApiKey(storage.getItem(CACHE_KEY));
  }, []);

  useAfterEffect(() => {
    if (apiKey) storage.setItem(CACHE_KEY, apiKey);
    else storage.removeItem(CACHE_KEY);
  }, [apiKey]);

  useAfterEffect(() => {
    if (persist) {
      if (apiKey) localStorage.setItem(CACHE_KEY, apiKey);
      sessionStorage.removeItem(CACHE_KEY);
    } else {
      if (apiKey) sessionStorage.setItem(CACHE_KEY, apiKey);
      localStorage.removeItem(CACHE_KEY);
    }
  }, [persist]);

  function edit() {
    setIsModalOpen(true);
  }

  function save() {
    setApiClient(apiKey ? axios.create({
      baseURL: '/openai',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }) : null);
    setIsModalOpen(false);
  }

  return (
    <OpenaiApiContext.Provider value={useMemo(() => ({ apiClient, edit }), [apiKey])}>
      {children}

      <Modal
        size="sm"
        show={!!(currentUser.user && isModalOpen)}
        animation
        centered
      >
        <Modal.Header onHide={() => setIsModalOpen(false)} closeButton>
          <Modal.Title>OpenAI API Key</Modal.Title>
        </Modal.Header>

        <ModalBody>
          <Form.Control
            placeholder="API Key"
            defaultValue={apiKey || undefined}
            onBlur={(e) => setApiKey(e.target.value.trim())}
          />

          <Form.Check
            type="checkbox"
            label="Persist"
            checked={persist}
            onChange={() => setPersist((prev) => !prev)}
          />
        </ModalBody>

        <ModalFooter>
          <Button type="button" variant="warning" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>

          <Button type="button" variant="success" onClick={save}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </OpenaiApiContext.Provider>
  );
};

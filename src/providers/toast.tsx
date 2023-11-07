import React, {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
  FC,
  ReactNode,
} from 'react';
import styled from 'styled-components';
import { ToastContainer, Toast } from 'react-bootstrap';
import { Ul } from '../components/list';

const DEFAULT_TIMEOUT = 12_000;

const ToastList = styled(Ul)`
  &:empty {
    display: none;
  }

  > li:not(:last-of-type) {
    margin-bottom: .6rem;
  }

  p {
    margin-bottom: 0;
  }
`;

interface DispatchOptions {
  title?: string;
}

type Dispatch = (content: string, options?: DispatchOptions) => void;
interface Context {
  success: Dispatch;
  error: Dispatch;
}

type MessageVariant = 'success' | 'danger';

interface Message extends DispatchOptions {
  content: string;
  variant: MessageVariant;
  timeout: NodeJS.Timeout;
}

const ToastContext = createContext<Context | null>(null);

export default function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('Must be child of <ToastProvider>');
  return ctx;
}

interface Props {
  children: ReactNode;
}

export const ToastProvider: FC<Props> = function ToastProvider({ children }) {
  const [messages, setMessages] = useState<Message[]>([]);

  function handleClose(content: string) {
    setMessages((prev) => {
      const match = prev.find((message) => message.content === content);
      if (!match) return prev;
      clearTimeout(match.timeout);
      return prev.filter((message) => message.content !== content);
    });
  }

  function createDispatch(variant: MessageVariant): Dispatch {
    return (content: string, options?: DispatchOptions) => setMessages(
      (prev) => (prev.some((message) => message.content === content)
        ? prev
        : prev.concat({
          ...options,
          content,
          variant,
          timeout: setTimeout(() => {
            handleClose(content);
          }, DEFAULT_TIMEOUT),
        })),
    );
  }

  useEffect(() => () => {
    messages.forEach((message) => {
      clearTimeout(message.timeout);
    });
  }, []);

  return (
    <ToastContext.Provider
      value={useMemo(() => ({
        success: createDispatch('success'),
        error: createDispatch('danger'),
      }), [])}
    >
      {children}

      <ToastContainer>
        <ToastList>
          {messages.map((message) => (
            <Toast
              key={message.content}
              as="li"
              bg={message.variant}
              onClick={() => handleClose(message.content)}
            >
              <Toast.Header closeButton>
                {message.title}
              </Toast.Header>
              <Toast.Body>
                <p>{message.content}</p>
              </Toast.Body>
            </Toast>
          ))}
        </ToastList>
      </ToastContainer>
    </ToastContext.Provider>
  );
};

import React, { useEffect, useState, FC } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import apiClient from '../../api-client';
import useToast from '../../providers/toast';
import Loading from '../../components/loading';
import Chat, { ChatMessage } from '../../components/chat';

interface Conversation {
  readonly id: string;
  label: string;
  temperature: string;
  readonly createdAt: Date;
  messages: {
    readonly id: string;
    role: 'SYSTEM' | 'USER' | 'ASSISTANT';
    content: string;
    updatedAt?: Date;
    readonly createdAt: Date;
  }[];
}

const ConversationDetailsPage: FC = function ConversationDetailsPage() {
  const toast = useToast();
  const { conversationId } = useParams<{ conversationId: string }>();

  const [label, setLabel] = useState<string>();
  const [temperature, setTemperature] = useState<number>();
  const [createdAt, setCreatedAt] = useState<Date>();
  const [messages, setMessages] = useState<ChatMessage[]>();

  useEffect(() => {
    const ctrl = new AbortController();
    apiClient.get<Conversation>(`/conversations/${conversationId}`, {
      signal: ctrl.signal,
    })
      .then((res) => {
        setLabel(res.data.label);
        setTemperature(Number(res.data.temperature));
        setCreatedAt(new Date(res.data.createdAt));
        setMessages(res.data.messages.map((message) => ({
          ...message,
          updatedAt: message.updatedAt && new Date(message.updatedAt),
          createdAt: new Date(message.createdAt),
        })));
      })
      .catch((ex) => {
        console.error(ex);
        toast.error('Unable to get conversation from server.');
      });

    return () => {
      ctrl.abort();
    };
  }, [conversationId]);

  return messages ? (
    <Container>
      <h1>{label}</h1>
      <Chat messages={messages} />
    </Container>
  ) : (
    <Loading />
  );
};

export default ConversationDetailsPage;

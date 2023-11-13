import React, { useEffect, useState, FC } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import apiClient from '../../api-client';
import useToast from '../../providers/toast';
import Loading from '../../components/loading';
import Chat from '../../components/chat';
import type { Conversation } from '../../types';

const ConversationDetailsPage: FC = function ConversationDetailsPage() {
  const toast = useToast();
  const { conversationId } = useParams<{ conversationId: string }>();
  const [conversation, setConversation] = useState<Conversation>();

  useEffect(() => {
    const ctrl = new AbortController();
    apiClient.get<Conversation>(`/conversations/${conversationId}`, {
      signal: ctrl.signal,
    })
      .then((res) => ({
        ...res.data,
        createdAt: new Date(res.data.createdAt),
        messages: res.data.messages.map((message) => ({
          ...message,
          updatedAt: message.updatedAt && new Date(message.updatedAt),
          createdAt: new Date(message.createdAt),
        })),
      }))
      .then((res) => {
        setConversation(res);
        return res;
      })
      .catch((ex) => {
        console.error(ex);
        toast.error('Unable to get conversation from server.');
      });

    return () => {
      ctrl.abort();
    };
  }, [conversationId]);

  return conversation ? (
    <Container>
      <h1>{conversation.label}</h1>
      <Chat messages={conversation.messages} />
    </Container>
  ) : (
    <Loading />
  );
};

export default ConversationDetailsPage;

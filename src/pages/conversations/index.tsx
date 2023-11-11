import React, { useEffect, useState, FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import apiClient from '../../api-client';
import useToast from '../../providers/toast';
import Loading from '../../components/loading';
import { Ul } from '../../components/list';

const TopControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ConversationsList = styled(Ul)`
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  p {
    margin-bottom: 0;
    &:first-of-type {
      font-weight: bold;
    }
  }
`;

interface Conversation {
  readonly id: string;
  label: string;
  readonly createdAt: Date;
}

const ConversationsPage: FC = function ConversationsPage() {
  const toast = useToast();
  const [conversations, setConversations] = useState<Conversation[]>();

  useEffect(() => {
    apiClient.get('/conversations')
      .then((res) => setConversations(res.data.conversations))
      .catch((ex) => {
        console.error(ex);
        toast.error('Unable to fetch conversations.');
      });
  }, []);

  return (
    <Container>
      <h1>Conversations</h1>

      <TopControls>
        <Link to="/conversations/create">
          <Button as="div" variant="info">
            <FaPlus />
          </Button>
        </Link>
      </TopControls>

      {conversations === undefined ? (
        <Loading />
      ) : (
        <ConversationsList>
          {conversations.map((conversation) => (
            <li key={conversation.id}>
              <p>{conversation.label}</p>
              <p>{conversation.createdAt.toISOString()}</p>
            </li>
          ))}
        </ConversationsList>
      )}
    </Container>
  );
};

export default ConversationsPage;

import React, { useEffect, useState, FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Table, Button, Container } from 'react-bootstrap';
import { FaPlus, FaArrowRight } from 'react-icons/fa';
import apiClient from '../../api-client';
import useToast from '../../providers/toast';
import Loading from '../../components/loading';
import { Ul } from '../../components/list';
import DeleteConversationButton from '../../components/buttons/delete-conversation';

const TopControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ConversationsTable = styled(Table)`
  th,
  td {
    vertical-align: middle;
  }

  td:last-of-type {
    text-align: right;

    > a,
    > button {
      &:not(:last-child) {
        margin-right: .6em;
      }
    }
  }
`;

const ConversationsList = styled(Ul)`
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    color: #fff;
    &:nth-of-type(odd) {
      background-color: #2c3034;
    }
    &:nth-of-type(even) {
      background-color: #606770;
    }
  }

  a {
    color: #fff;
    font-weight: bold;
  }

  p {
    margin-bottom: 0;
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
    apiClient.get<{ conversations: Conversation[] }>('/conversations')
      .then((res) => setConversations(res.data.conversations
        .map((conversation) => ({
          ...conversation,
          createdAt: new Date(conversation.createdAt),
        }))))
      .catch((ex) => {
        console.error(ex);
        toast.error('Unable to fetch conversations.');
      });
  }, []);

  function handleDelete(id: string) {
    setConversations((prev) => prev?.filter((a) => a.id !== id));
  }

  return (
    <Container>
      <h1>Conversations</h1>

      <TopControls className="mb-3">
        <Link to="/conversations/create">
          <Button as="div" variant="info">
            <FaPlus />
          </Button>
        </Link>
      </TopControls>

      {conversations === undefined ? (
        <Loading />
      ) : (
        <ConversationsTable striped bordered>
          <tbody>
            {conversations.map(({ id, label, createdAt }) => (
              <tr key={id}>
                <th>{label}</th>
                <td>{createdAt.toLocaleString()}</td>
                <td>
                  <DeleteConversationButton id={id} onSuccess={() => handleDelete(id)} />
                  <Link to={`/conversations/${id}`}>
                    <Button type="button" variant="success" size="sm">
                      <FaArrowRight />
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </ConversationsTable>
      )}
    </Container>
  );
};

export default ConversationsPage;

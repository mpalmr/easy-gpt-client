import React, { useState, ReactNode, FC } from 'react';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Content = styled.p`
  margin-left: .6em;
  margin-bottom: 0;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export interface ChatMessageProps {
  id: string;
  content: string;
  isResponse?: boolean;
  updatedAt?: Date;
  createdAt: Date;
}

const ChatMessage: FC<ChatMessageProps> = function ChatMessage({
  id,
  content,
  isResponse,
  updatedAt,
  createdAt,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Wrapper>
      <p>{isResponse ? 'Reponse' : 'Prompt'}</p>
      {isEditing ? (
        <Content>{children}</Content>
      ) : (
        <Form.Control
          defaultValue={content}
          disabled={isSubmitting}
        />
      )}

      {updatedAt && (
        <p>
          Edited:
          {updatedAt.toLocaleString()}
        </p>
      )}

      <Controls>

      </Controls>
    </Wrapper>
  );
};

export default ChatMessage;

import React, { FC } from 'react';
import styled from 'styled-components';

const MessageWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export interface ChatMessageProps {
  id: string;
  content: string;
  role: 'SYSTEM' | 'USER' | 'ASSISTANT';
  updatedAt?: Date;
  createdAt: Date;
}

const ChatMessage: FC<ChatMessageProps> = function ChatMessage({
  id,
  content,
  role,
  updatedAt,
  createdAt,
}) {
  return (
    <MessageWrapper>
      <p>
        {role === 'SYSTEM'
          ? createdAt.toLocaleString()
          : createdAt.toLocaleTimeString()}
      </p>

      <p>{content}</p>

      {updatedAt && (
        <p>Edited: {updatedAt.toLocaleString()}</p>
      )}
    </MessageWrapper>
  );
};

export default ChatMessage;

import React, { FC } from 'react';
import styled from 'styled-components';
import RoleBadge from '../role-badge';

const MessageWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const MessageContent = styled.p`
  margin-left: .6em;
  margin-bottom: 0;
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
      <RoleBadge role={role} />
      <MessageContent>{content}</MessageContent>
      {updatedAt && (
        <p>
          Edited:
          {updatedAt.toLocaleString()}
        </p>
      )}
    </MessageWrapper>
  );
};

export default ChatMessage;

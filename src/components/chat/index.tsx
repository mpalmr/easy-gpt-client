import React, { useState, FC } from 'react';
import styled from 'styled-components';
import { Ul } from '../list';
import Message, { ChatMessageProps } from './message';

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 10rem;

  > ul {
    flex-grow: 1;

    > li:not(:last-of-type) {
      margin-bottom: 1rem;
    }
  }
`;

interface Props {
  messages: ChatMessageProps[];
}

const Chat: FC<Props> = function Chat({ messages }) {
  return (
    <ChatWrapper>
      <Ul>
        {messages.map((message) => (
          <li key={message.id}>
            <Message {...message} />
          </li>
        ))}
      </Ul>
    </ChatWrapper>
  );
};

export default Chat;

import React, { FC } from 'react';
import styled from 'styled-components';
import { Ul } from '../list';
import Message, { ChatMessageProps } from './message';

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 10rem;

  > ul {
    flex-grow: 1;
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

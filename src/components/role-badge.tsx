import React, { FC } from 'react';
import styled from 'styled-components';
import type { ChatMessageRole } from '../types';

const ROLE_INDICATOR = {
  SYSTEM: 'S',
  USER: 'U',
  ASSISTANT: 'A',
};

const ROLE_BGS = {
  SYSTEM: 'red',
  USER: 'cornsilk',
  ASSISTANT: 'green',
};

const Badge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.2em;
  height: 1.2em;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: ${({ role }) => ROLE_BGS[role as keyof typeof ROLE_BGS]};
  font-size: 1.6rem;
`;

interface Props {
  className?: string;
  role: ChatMessageRole;
}

const RoleBadge: FC<Props> = function RoleBadge({ className, role }) {
  return (
    <Badge className={className} role={role}>
      {ROLE_INDICATOR[role]}
    </Badge>
  );
};

export default RoleBadge;

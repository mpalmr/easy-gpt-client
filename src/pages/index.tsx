import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './home';
import LoginPage from './login';
import LogoutPage from './logout';
import RegisterPage from './register';
import ConversationsPage from './conversations';
import CreateConversationPage from './conversations/create';
import ConverastionDetailsPage from './conversations/details';
import NotFoundPage from './not-found';

const Pages: FC = function Pages() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/conversations" element={<ConversationsPage />} />
      <Route path="/conversations/create" element={<CreateConversationPage />} />
      <Route path="/conversation/:conversationId" element={<ConverastionDetailsPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Pages;

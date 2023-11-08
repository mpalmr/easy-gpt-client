import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './home';
import LoginPage from './login';
import RegisterPage from './register';
import VerifyEmailPage from './verify';
import ResendVerificationPage from './verify/resend';
import NotFoundPage from './not-found';

const Pages: FC = function Pages() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify/resend" element={<ResendVerificationPage />} />
      <Route path="/verify/:token" element={<VerifyEmailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Pages;

import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './home';
import LoginPage from './login';
import RegisterPage from './register';
import NotFoundPage from './not-found';

const Pages: FC = function Pages() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Pages;

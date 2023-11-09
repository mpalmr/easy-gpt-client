import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastProvider } from './providers/toast';
import { CurrentUserProvider } from './providers/current-user';
import { OpenaiApiProvider } from './providers/openai-api';
import Layout from './components/layout';
import Pages from './pages';

const App: FC = function App() {
  return (
    <ToastProvider>
      <Router>
        <CurrentUserProvider>
          <OpenaiApiProvider>
            <Layout>
              <Pages />
            </Layout>
          </OpenaiApiProvider>
        </CurrentUserProvider>
      </Router>
    </ToastProvider>
  );
};

export default App;

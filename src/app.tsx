import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/layout';
import Pages from './pages';

const App: FC = function App() {
  return (
    <Router>
      <Layout>
        <Pages />
      </Layout>
    </Router>
  );
};

export default App;

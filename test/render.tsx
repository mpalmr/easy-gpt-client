import React, { ReactElement, ReactNode, FC } from 'react';
import { render as defaultRender, RenderOptions } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { ToastProvider } from '../src/providers/toast';
import { CurrentUserProvider } from '../src/providers/current-user';
import { OpenaiApiProvider } from '../src/providers/openai-api';

interface Props {
  children: ReactNode;
}

const TestWrapper: FC<Props> = function TestWrapper({ children }) {
  return (
    <ToastProvider>
      <Router>
        <CurrentUserProvider>
          <OpenaiApiProvider>
            {children}
          </OpenaiApiProvider>
        </CurrentUserProvider>
      </Router>
    </ToastProvider>
  );
};

export * from '@testing-library/react';

export function render(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return defaultRender(ui, {
    wrapper: TestWrapper,
    ...options,
  });
}

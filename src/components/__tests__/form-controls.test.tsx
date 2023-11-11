import React from 'react';
import { render, screen } from '../../../test/render';
import FormControls from '../form-controls';

test('renders children', () => {
  const { rerender } = render((
    <FormControls>
      <p>AYYO</p>
    </FormControls>
  ));
  expect(screen.queryByText('AYYO')).toBeInTheDocument();

  rerender(<FormControls />);
  expect(screen.queryByText('AYYO')).not.toBeInTheDocument();
});

test('submit button shows text from props.submitButton', () => {
  const { rerender, container } = render(<FormControls />);
  expect(container.querySelector('button[type="submit"]')?.textContent).toBe('Submit');

  rerender(<FormControls submitText="Popdat" />);
  expect(container.querySelector('button[type="submit"]')?.textContent).toBe('Popdat');
});

test('disabled state', () => {
  const { rerender } = render(<FormControls disabled />);
  expect(screen.getByText('Submit')).toBeDisabled();

  rerender(<FormControls />);
  expect(screen.getByText('Submit')).not.toBeDisabled();
});

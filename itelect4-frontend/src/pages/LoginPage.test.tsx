import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';

function renderLoginPage() {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('LoginPage', () => {
  it('shows schema message when email is invalid', async () => {
    const user = userEvent.setup();
    renderLoginPage();

    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText('That is not an email address.')).toBeInTheDocument();
  });

  it('sends nothing to the API while the form is invalid', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const user = userEvent.setup();
    renderLoginPage();

    await user.type(screen.getByLabelText('Email'), 'juan@dlsl.edu.ph');
    await user.type(screen.getByLabelText('Password'), 'short');
    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText('At least 8 characters.')).toBeInTheDocument();
    expect(screen.queryByText('That is not an email address.')).not.toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
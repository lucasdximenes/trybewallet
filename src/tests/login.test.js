import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import { emailTest, passwordTest } from './helpers/infos';
import App from '../App';

describe('test login', () => {
  it('test if has login form', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /email:/i });
    const passwordInput = screen.getByLabelText(/password:/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('test if button is disabled', () => {
    renderWithRouterAndRedux(<App />);
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    expect(submitButton).toBeDisabled();
  });

  it('should enable button when infos are valid', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /email:/i });
    const passwordInput = screen.getByLabelText(/password:/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, passwordTest);
    expect(submitButton).toBeEnabled();
  });

  it('should redirect to wallet page when click login btn', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /email:/i });
    const passwordInput = screen.getByLabelText(/password:/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, passwordTest);
    userEvent.click(submitButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});

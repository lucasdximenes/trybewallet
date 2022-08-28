import React from 'react';
import { waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockData from './helpers/mockData';
import mockedState from './helpers/mockState';
import App from '../App';

describe('test header', () => {
  it('should have login email', () => {
    renderWithRouterAndRedux(<App />, {
      initialState: mockedState,
      initialEntries: ['/carteira'],
    });
    const email = screen.getByText(new RegExp(mockedState.user.email, 'i'));
    expect(email).toBeInTheDocument();
  });
});

describe('test add expense form', () => {
  it('should have add expense form', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));

    const { store } = renderWithRouterAndRedux(<App />, {
      initialState: mockedState,
      initialEntries: ['/carteira'],
    });

    const valueInput = screen.getByRole('spinbutton', { name: /valor:/i });
    const descriptionInput = screen.getByRole('textbox', {
      name: /descrição:/i,
    });
    const coinInput = screen.getByRole('combobox', { name: /moeda:/i });
    const methodInput = screen.getByRole('combobox', {
      name: /método de pagamento:/i,
    });
    const tagInput = screen.getByRole('combobox', { name: /tag:/i });
    const addButton = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.type(valueInput, '15');
    expect(valueInput).toHaveValue(15);
    userEvent.type(descriptionInput, 'cinema');
    expect(descriptionInput).toHaveValue('cinema');
    userEvent.selectOptions(coinInput, 'EUR');
    expect(coinInput).toHaveValue('EUR');
    userEvent.selectOptions(methodInput, 'Dinheiro');
    expect(methodInput).toHaveValue('Dinheiro');
    userEvent.selectOptions(tagInput, 'Lazer');
    expect(tagInput).toHaveValue('Lazer');
    userEvent.click(addButton);

    await waitFor(() => expect(global.fetch).toBeCalledTimes(2));

    const { wallet } = store.getState();
    expect(wallet.expenses).toHaveLength(1);
  });
});

describe('test expenses table', () => {
  it('should have expenses table', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));

    renderWithRouterAndRedux(<App />, {
      initialState: mockedState,
      initialEntries: ['/carteira'],
    });

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });

  it('when add expense should have expense in table', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));

    renderWithRouterAndRedux(<App />, {
      initialState: mockedState,
      initialEntries: ['/carteira'],
    });

    const valueInput = screen.getByRole('spinbutton', { name: /valor:/i });
    const descriptionInput = screen.getByRole('textbox', {
      name: /descrição:/i,
    });
    const coinInput = screen.getByRole('combobox', { name: /moeda:/i });
    const methodInput = screen.getByRole('combobox', {
      name: /método de pagamento:/i,
    });
    const tagInput = screen.getByRole('combobox', { name: /tag:/i });
    const addButton = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.type(valueInput, '15');
    userEvent.type(descriptionInput, 'cinema');
    userEvent.selectOptions(coinInput, 'EUR');
    userEvent.selectOptions(methodInput, 'Dinheiro');
    userEvent.selectOptions(tagInput, 'Lazer');
    userEvent.click(addButton);

    await waitFor(() => expect(global.fetch).toBeCalledTimes(2));

    const tableCell = screen.getByRole('cell', { name: /cinema/i });
    expect(tableCell).toBeInTheDocument();
  });

  it('should have delete and edit buttons in expense', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));

    renderWithRouterAndRedux(<App />, {
      initialState: mockedState,
      initialEntries: ['/carteira'],
    });

    const valueInput = screen.getByRole('spinbutton', { name: /valor:/i });
    const descriptionInput = screen.getByRole('textbox', {
      name: /descrição:/i,
    });
    const coinInput = screen.getByRole('combobox', { name: /moeda:/i });
    const methodInput = screen.getByRole('combobox', {
      name: /método de pagamento:/i,
    });
    const tagInput = screen.getByRole('combobox', { name: /tag:/i });
    const addButton = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.type(valueInput, '15');
    userEvent.type(descriptionInput, 'cinema');
    userEvent.selectOptions(coinInput, 'EUR');
    userEvent.selectOptions(methodInput, 'Dinheiro');
    userEvent.selectOptions(tagInput, 'Lazer');
    userEvent.click(addButton);

    await waitFor(() => expect(global.fetch).toBeCalledTimes(2));

    const deleteButton = screen.getByRole('button', {
      name: /excluir/i,
    });
    const editButton = screen.getByRole('button', {
      name: /editar/i,
    });
    expect(deleteButton).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
  });

  it('should delete expense when click in delete button', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));

    renderWithRouterAndRedux(<App />, {
      initialState: mockedState,
      initialEntries: ['/carteira'],
    });

    const valueInput = screen.getByRole('spinbutton', { name: /valor:/i });
    const descriptionInput = screen.getByRole('textbox', {
      name: /descrição:/i,
    });
    const coinInput = screen.getByRole('combobox', { name: /moeda:/i });
    const methodInput = screen.getByRole('combobox', {
      name: /método de pagamento:/i,
    });
    const tagInput = screen.getByRole('combobox', { name: /tag:/i });
    const addButton = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.type(valueInput, '15');
    userEvent.type(descriptionInput, 'cinema');
    userEvent.selectOptions(coinInput, 'EUR');
    userEvent.selectOptions(methodInput, 'Dinheiro');
    userEvent.selectOptions(tagInput, 'Lazer');
    userEvent.click(addButton);

    await waitFor(() => expect(global.fetch).toBeCalledTimes(2));

    const deleteButton = screen.getByRole('button', {
      name: /excluir/i,
    });
    const tableCell = screen.getByRole('cell', { name: /cinema/i });
    userEvent.click(deleteButton);
    expect(tableCell).not.toBeInTheDocument();
  });
});

describe('test edit expense', () => {
  it('should have edit expense form', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));

    renderWithRouterAndRedux(<App />, {
      initialState: mockedState,
      initialEntries: ['/carteira'],
    });

    const valueInput = screen.getByRole('spinbutton', { name: /valor:/i });
    const descriptionInput = screen.getByRole('textbox', {
      name: /descrição:/i,
    });
    const coinInput = screen.getByRole('combobox', { name: /moeda:/i });
    const methodInput = screen.getByRole('combobox', {
      name: /método de pagamento:/i,
    });
    const tagInput = screen.getByRole('combobox', { name: /tag:/i });
    const addButton = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.type(valueInput, '15');
    userEvent.type(descriptionInput, 'cinema');
    userEvent.selectOptions(coinInput, 'EUR');
    userEvent.selectOptions(methodInput, 'Dinheiro');
    userEvent.selectOptions(tagInput, 'Lazer');
    userEvent.click(addButton);

    await waitFor(() => expect(global.fetch).toBeCalledTimes(2));

    const editButton = screen.getByRole('button', {
      name: /editar/i,
    });
    userEvent.click(editButton);
    expect(addButton).not.toBeInTheDocument();

    const editValueInput = screen.getByRole('spinbutton', {
      name: /valor:/i,
    });
    const editDescriptionInput = screen.getByRole('textbox', {
      name: /descrição:/i,
    });
    const editCoinInput = screen.getByRole('combobox', { name: /moeda:/i });
    const editMethodInput = screen.getByRole('combobox', {
      name: /método de pagamento:/i,
    });
    const editTagInput = screen.getByRole('combobox', { name: /tag:/i });
    const editButtonForm = screen.getByRole('button', {
      name: /editar despesa/i,
    });

    expect(editValueInput).toBeInTheDocument();
    expect(editDescriptionInput).toBeInTheDocument();
    expect(editCoinInput).toBeInTheDocument();
    expect(editMethodInput).toBeInTheDocument();
    expect(editTagInput).toBeInTheDocument();
    expect(editButtonForm).toBeInTheDocument();
  });

  it('should edit expense when click in edit button', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));

    renderWithRouterAndRedux(<App />, {
      initialState: mockedState,
      initialEntries: ['/carteira'],
    });

    const valueInput = screen.getByRole('spinbutton', { name: /valor:/i });
    const descriptionInput = screen.getByRole('textbox', {
      name: /descrição:/i,
    });
    const coinInput = screen.getByRole('combobox', { name: /moeda:/i });
    const methodInput = screen.getByRole('combobox', {
      name: /método de pagamento:/i,
    });
    const tagInput = screen.getByRole('combobox', { name: /tag:/i });
    const addButton = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.type(valueInput, '15');
    userEvent.type(descriptionInput, 'cinema');
    userEvent.selectOptions(coinInput, 'EUR');
    userEvent.selectOptions(methodInput, 'Dinheiro');
    userEvent.selectOptions(tagInput, 'Lazer');
    userEvent.click(addButton);

    userEvent.type(valueInput, '5');
    userEvent.type(descriptionInput, 'coca-cola');
    userEvent.selectOptions(coinInput, 'USD');
    userEvent.selectOptions(methodInput, 'Cartão de crédito');
    userEvent.selectOptions(tagInput, 'Alimentação');
    userEvent.click(addButton);

    await waitFor(() => expect(global.fetch).toBeCalledTimes(3));

    const editButton = screen.getAllByRole('button', {
      name: /editar/i,
    });
    userEvent.click(editButton[0]);
    expect(addButton).not.toBeInTheDocument();

    const editValueInput = screen.getByRole('spinbutton', {
      name: /valor:/i,
    });
    const editDescriptionInput = screen.getByRole('textbox', {
      name: /descrição:/i,
    });
    const editCoinInput = screen.getByRole('combobox', { name: /moeda:/i });
    const editMethodInput = screen.getByRole('combobox', {
      name: /método de pagamento:/i,
    });
    const editTagInput = screen.getByRole('combobox', { name: /tag:/i });
    const editButtonForm = screen.getByRole('button', {
      name: /editar despesa/i,
    });

    userEvent.clear(editValueInput);
    userEvent.type(editValueInput, '20');
    userEvent.clear(editDescriptionInput);
    userEvent.type(editDescriptionInput, 'pipoca');
    userEvent.selectOptions(editCoinInput, 'USD');
    userEvent.selectOptions(editMethodInput, 'Cartão de crédito');
    userEvent.selectOptions(editTagInput, 'Alimentação');
    userEvent.click(editButtonForm);

    await waitFor(() => expect(global.fetch).toBeCalledTimes(5));

    const tableCell = screen.getByRole('cell', { name: /pipoca/i });
    expect(tableCell).toBeInTheDocument();
  });
});

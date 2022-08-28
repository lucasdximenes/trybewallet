export const setEmail = (email) => ({
  type: 'SET_EMAIL',
  email,
});

const requestCurrencies = () => ({
  type: 'REQUEST_CURRENCIES',
});

const getCurrencies = (currencies) => ({
  type: 'GET_CURRENCIES',
  currencies,
});

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(requestCurrencies());
  const currencies = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currenciesJson = await currencies.json();
  const currenciesArray = Object.keys(currenciesJson).filter(
    (currency) => currency !== 'USDT',
  );
  dispatch(getCurrencies(currenciesArray));
};

const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense,
});

export const fetchAddExpense = (expense) => async (dispatch) => {
  const { value, description, currency, method, tag } = expense;
  const exchangeRates = await fetch(
    'https://economia.awesomeapi.com.br/json/all',
  );
  const exchangeRatesJson = await exchangeRates.json();
  delete exchangeRatesJson.USDT;
  const expenseObject = {
    id: 0,
    value,
    description,
    currency,
    method,
    tag,
    exchangeRates: exchangeRatesJson,
  };
  dispatch(addExpense(expenseObject));
};

export const removeExpense = (id) => ({
  type: 'REMOVE_EXPENSE',
  id,
});

export const editExpense = (id) => ({
  type: 'EDIT_EXPENSE',
  id,
});

export const updateExpense = (expense) => ({
  type: 'UPDATE_EXPENSE',
  expense,
});

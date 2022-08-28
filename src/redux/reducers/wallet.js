const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  isFetching: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_CURRENCIES':
    return {
      ...state,
      isFetching: true,
    };
  case 'GET_CURRENCIES':
    return {
      ...state,
      currencies: action.currencies,
      isFetching: false,
    };
  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: [
        ...state.expenses,
        { ...action.expense, id: state.expenses.length },
      ],
    };
  case 'REMOVE_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
      // update id of each expense
      // .map((expense, index) => ({
      //   ...expense,
      //   id: index,
      // })),
    };
  case 'EDIT_EXPENSE':
    return {
      ...state,
      editor: true,
      idToEdit: action.id,
    };
  case 'UPDATE_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.expense.id) {
          return { ...action.expense };
        }
        return expense;
      }),
      editor: false,
    };
  default:
    return state;
  }
};

export default wallet;

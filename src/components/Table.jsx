import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense, editExpense } from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses, deleteExpense, editExpense: edit } = this.props;
    return (
      <div>
        <h1>Table</h1>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => {
              const { id, description, tag, method, currency, exchangeRates } = expense;
              const value = Number(expense.value).toFixed(2);
              return (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{value}</td>
                  <td>{exchangeRates[currency].name}</td>
                  <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                  <td>
                    {(
                      Number(exchangeRates[currency].ask) * Number(value)
                    ).toFixed(2)}
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => edit(id) }
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => deleteExpense(id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(removeExpense(id)),
  editExpense: (id) => dispatch(editExpense(id)),
});

Table.propTypes = {
  deleteExpense: propTypes.func.isRequired,
  editExpense: propTypes.func.isRequired,
  expenses: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number,
      value: propTypes.string,
      description: propTypes.string,
      currency: propTypes.string,
      method: propTypes.string,
      tag: propTypes.string,
      exchangeRates: propTypes.objectOf(
        propTypes.shape({
          name: propTypes.string,
          ask: propTypes.string,
        }),
      ).isRequired,
    }),
  ).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);

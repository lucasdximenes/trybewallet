import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { removeExpense, editExpense } from "../redux/actions";

class Table extends Component {
  render() {
    const { expenses, deleteExpense, editExpense: edit } = this.props;
    return (
      <div>
        <h1 className="text-center bg-gray-200 h-full m-0 p-2.5">Despesas</h1>
        <div className="overflow-x-auto mb-8">
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 lg:table-cell">
                  Descrição
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 lg:table-cell">
                  Tag
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 lg:table-cell">
                  Método de pagamento
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 lg:table-cell">
                  Valor
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 lg:table-cell">
                  Moeda
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 lg:table-cell">
                  Câmbio utilizado
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 lg:table-cell">
                  Valor convertido
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 lg:table-cell">
                  Moeda de conversão
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 lg:table-cell">
                  Editar/Excluir
                </th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => {
                const {
                  id,
                  description,
                  tag,
                  method,
                  currency,
                  exchangeRates,
                } = expense;
                const value = Number(expense.value).toFixed(2);
                return (
                  <tr
                    key={id}
                    className="bg-white lg:hover:bg-gray-100 lg:table-row lg:flex-row lg:flex-no-wrap lg:mb-10 lg:shadow-lg"
                  >
                    <td className="p-3 text-gray-600 border border-gray-300">
                      {description}
                    </td>
                    <td className="p-3 text-gray-600 border border-gray-300">
                      {tag}
                    </td>
                    <td className="p-3 text-gray-600 border border-gray-300">
                      {method}
                    </td>
                    <td className="p-3 text-gray-600 border border-gray-300">
                      {value}
                    </td>
                    <td className="p-3 text-gray-600 border border-gray-300">
                      {exchangeRates[currency].name}
                    </td>
                    <td className="p-3 text-gray-600 border border-gray-300">
                      {Number(exchangeRates[currency].ask).toFixed(2)}
                    </td>
                    <td className="p-3 text-gray-600 border border-gray-300">
                      {(
                        Number(exchangeRates[currency].ask) * Number(value)
                      ).toFixed(2)}
                    </td>
                    <td className="p-3 text-gray-600 border border-gray-300">
                      Real
                    </td>
                    <td className="p-3 text-gray-600 border border-gray-300">
                      <button
                        type="button"
                        data-testid="edit-btn"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-1"
                        onClick={() => edit(id)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        data-testid="delete-btn"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => deleteExpense(id)}
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
        })
      ).isRequired,
    })
  ).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);

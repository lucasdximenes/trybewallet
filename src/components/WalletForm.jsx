import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCurrencies, fetchAddExpense } from "../redux/actions";

class WalletForm extends Component {
  state = {
    value: "",
    description: "",
    currency: "USD",
    method: "Dinheiro",
    tag: "Alimentação",
  };

  componentDidMount() {
    const { fetchCurrency } = this.props;
    fetchCurrency();
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    const { addExpense } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const expense = {
      value,
      description,
      currency,
      method,
      tag,
    };
    addExpense(expense);
    this.setState({
      value: "",
      description: "",
      currency: "USD",
      method: "Dinheiro",
      tag: "Alimentação",
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <form action="#">
          <div className="flex flex-col items-center justify-center bg-gray-200 w-full h-full sm:flex-row sm:flex-wrap sm:gap-4">
            <div className="flex flex-col items-center justify-center mb-4 sm:flex-row">
              <label
                htmlFor="value"
                className="self-start font-bold text-gray-700 mb-2.5 text-xl sm:mr-2.5 sm:self-center"
              >
                Valor:
              </label>
              <input
                data-testid="value-input"
                className="w-64 h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline text-gray-700 border-gray-300 shadow-sm focus:outline-none focus:border-purple-500 sm:w-48"
                type="number"
                id="value"
                name="value"
                onChange={this.handleChange}
                value={value}
              />
            </div>

            <div className="flex flex-col items-center justify-center mb-4 sm:flex-row">
              <label
                htmlFor="description"
                className="self-start font-bold text-gray-700 mb-2.5 text-xl sm:mr-2.5 sm:self-center"
              >
                Descrição:
              </label>
              <input
                data-testid="description-input"
                className="w-64 h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline text-gray-700 border-gray-300 shadow-sm focus:outline-none focus:border-purple-500 sm:w-48"
                type="text"
                id="description"
                name="description"
                onChange={this.handleChange}
                value={description}
              />
            </div>

            <div className="flex flex-col items-center justify-center mb-4 sm:flex-row">
              <label
                htmlFor="currency"
                className="self-start font-bold text-gray-700 mb-2.5 text-xl sm:mr-2.5 sm:self-center"
              >
                Moeda:
              </label>
              <select
                data-testid="currency-input"
                className="w-64 h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline text-gray-700 border-gray-300 shadow-sm focus:outline-none focus:border-purple-500 sm:w-48"
                name="currency"
                id="currency"
                onChange={this.handleChange}
                value={currency}
              >
                {currencies.map((curr) => (
                  <option key={curr} value={curr}>
                    {curr}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col items-center justify-center mb-4 sm:flex-row">
              <label
                htmlFor="method"
                className="self-start font-bold text-gray-700 mb-2.5 text-xl sm:mr-2.5 sm:self-center"
              >
                Método de pagamento:
              </label>
              <select
                name="method"
                data-testid="method-input"
                className="w-64 h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline text-gray-700 border-gray-300 shadow-sm focus:outline-none focus:border-purple-500 sm:w-48"
                id="method"
                onChange={this.handleChange}
                value={method}
              >
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Cartão de débito">Cartão de débito</option>
              </select>
            </div>

            <div className="flex flex-col items-center justify-center mb-4 sm:flex-row">
              <label
                htmlFor="tag"
                className="self-start font-bold text-gray-700 mb-2.5 text-xl sm:mr-2.5 sm:self-center"
              >
                Tag:
              </label>
              <select
                name="tag"
                data-testid="tag-input"
                className="w-64 h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline text-gray-700 border-gray-300 shadow-sm focus:outline-none focus:border-purple-500 sm:w-48"
                id="tag"
                onChange={this.handleChange}
                value={tag}
              >
                <option value="Alimentação">Alimentação</option>
                <option value="Lazer">Lazer</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Transporte">Transporte</option>
                <option value="Saúde">Saúde</option>
              </select>
            </div>

            <div className="flex flex-col items-center justify-center mb-4 sm:flex-row">
              <button
                type="button"
                onClick={this.handleSubmit}
                className="w-64 h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline text-gray-700 border-gray-300 shadow-sm focus:outline-none focus:border-purple-500 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded sm:w-48"
              >
                Adicionar despesa
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: () => dispatch(fetchCurrencies()),
  addExpense: (expense) => dispatch(fetchAddExpense(expense)),
});

WalletForm.propTypes = {
  fetchCurrency: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

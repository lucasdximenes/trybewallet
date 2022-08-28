import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const total = expenses.reduce((acc, { value, currency, exchangeRates }) => {
      const totalValue = acc + value * exchangeRates[currency].ask;
      return totalValue;
    }, 0);
    return (
      <div className="flex flex-col items-center justify-center bg-gray-200 w-full h-full sm:flex-row sm:justify-around">
        <h1 className="text-center text-4xl font-bold text-gray-700">
          Trybewallet
        </h1>
        <p
          data-testid="email-field"
          className="text-center text-2xl font-bold text-gray-700 mb-2.5"
        >
          {email}
        </p>
        <p
          data-testid="total-field"
          className="text-center text-2xl font-bold text-gray-700 mb-2.5"
        >
          {total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
        <p
          data-testid="header-currency-field"
          className="text-center text-2xl font-bold text-gray-700 mb-2.5"
        >
          BRL
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      currency: PropTypes.string,
      exchangeRates: PropTypes.objectOf(
        PropTypes.shape({
          ask: PropTypes.string,
        })
      ),
    })
  ).isRequired,
};

export default connect(mapStateToProps, null)(Header);

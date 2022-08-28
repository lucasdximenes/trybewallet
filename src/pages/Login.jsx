import React from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { setEmail } from "../redux/actions";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    isDisabled: true,
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => this.validateForm());
  };

  validateForm = () => {
    const { email, password } = this.state;
    const emailRegex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const passwordMinLength = 6;
    const emailIsValid = emailRegex.test(email);
    const passwordIsValid = password.length >= passwordMinLength;
    if (emailIsValid && passwordIsValid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const { setEmail: addEmail, history } = this.props;
    addEmail(email);
    history.push("/carteira");
  };

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div>
        <h1 className="text-center text-4xl font-bold text-gray-700">
          Trybewallet Login
        </h1>
        <form action="#">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center mb-2.5">
              <label
                className="self-start text-xl font-bold text-gray-700"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                data-testid="email-input"
                className="border-2 border-black w-64 h-10 rounded-md text-xl p-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={this.handleChange}
              />
            </div>
            <div className="flex flex-col items-center mb-2.5">
              <label
                className="self-start text-xl font-bold text-gray-700"
                htmlFor="password"
              >
                Password:
              </label>
              <input
                data-testid="password-input"
                className="border-2 border-black w-64 h-10 rounded-md text-xl p-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-64 h-10 mt-4 disabled:opacity-50 disabled:hover:bg-blue-500 disabled:cursor-not-allowed"
                disabled={isDisabled}
                onClick={this.handleSubmit}
              >
                Entrar
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  setEmail: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setEmail: (email) => dispatch(setEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);

import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { setEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
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
    history.push('/carteira');
  };

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form action="#">
          <label htmlFor="email">
            Email:
            <input
              data-testid="email-input"
              type="email"
              name="email"
              id="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="password">
            Password:
            <input
              data-testid="password-input"
              type="password"
              name="password"
              id="password"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>

          <button
            type="submit"
            disabled={ isDisabled }
            onClick={ this.handleSubmit }
          >
            Entrar
          </button>
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

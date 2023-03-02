import React, { useContext, useEffect, useState } from 'react';
import LoginContext from '../context/LoginContext';

export default function Login() {
  const { handleClick } = useContext(LoginContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setDisabled] = useState(true);

  useEffect(() => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const minLength = 6;
    const emailValid = emailRegex.test(email);
    const passwordLength = password.length > minLength;
    if (emailValid && passwordLength) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  return (
    <div className="loginPage">
      <h1>Login</h1>
      <label htmlFor="email-login">
        Email
        <input
          type="email"
          name="email"
          id="email-login"
          data-testid="email-input"
          value={ email }
          onChange={ ({ target: { value } }) => {
            setEmail(value);
          } }
        />
      </label>
      <label htmlFor="password-login">
        Password
        <input
          type="password"
          name="password"
          id="password-login"
          data-testid="password-input"
          value={ password }
          onChange={ ({ target: { value } }) => {
            setPassword(value);
          } }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ isDisabled }
        onClick={ () => handleClick({ email, password }) }
      >
        Enter
      </button>
    </div>
  );
}

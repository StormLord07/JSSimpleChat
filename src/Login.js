/*
 * Created by Ilya 'StormLord07' Repnev
 * Created on Sat Jul 29 2023
 */


import React from "react";

class Login extends React.Component {
  state = {
    username: ""
  };

  onInputChange = (event) => {
    this.setState({ username: event.target.value });
  };

  onSubmit = () => {
    this.props.onLogin(this.state.username);
  };

  render() {
    return (
      <div className="login-container">
        <input
          type="text"
          placeholder="Введите ваше имя..."
          onChange={this.onInputChange}
        />
        <button onClick={this.onSubmit}>Вход</button>
      </div>
    );
  }
}

export default Login;

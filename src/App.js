/*
 * Created by Ilya 'StormLord07' Repnev
 * Created on Sat Jul 29 2023
 */


import React from "react";
import Chat from "./Chat";
import Login from "./Login";
import "./style.css";

class App extends React.Component {
  state = {
    username: "",
    loggedIn: false,
    users: [
      // Your initial users data...
    ]
  };

  onLogin = (username) => {
    let loggedInUser = this.state.users.find((user) => user.name === username);

    // If the user doesn't exist yet, create a new user
    if (!loggedInUser) {
      loggedInUser = { name: username, messages: [] };
      this.setState((prevState) => ({
        users: [...prevState.users, loggedInUser]
      }));
    }

    this.setState({ isLoggedIn: true, username: username });
  };

  onLogout = () => {
    this.setState({ isLoggedIn: false, username: "" });
  };

  onUsersUpdate = (users) => {
    this.setState({ users });
  };
  onLogout = () => {
    this.setState({ isLoggedIn: false, username: "" });
  };

  render() {
    if (this.state.isLoggedIn) {
      return (
        <Chat
          username={this.state.username}
          onLogout={this.onLogout}
          onUsersUpdate={this.onUsersUpdate}
          users={this.state.users}
        />
      );
    } else {
      return <Login onLogin={this.onLogin} />;
    }
  }
}

export default App;

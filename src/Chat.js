/*
 * Created by Ilya 'StormLord07' Repnev
 * Created on Sat Jul 29 2023
 */


import React from "react";
import User from "./User";

class Chat extends React.Component {
  state = {
    currentUser: null,
    loggedInUser: null,
    newMessage: ""
  };

  componentDidMount() {
    const loggedInUser = this.props.users.find(
      (user) => user.name === this.props.username
    );

    this.setState({ loggedInUser });
  }

  selectUser = (username) => {
    const user = this.props.users.find((user) => user.name === username);
    this.setState({ currentUser: user });
  };

  onInputChange = (event) => {
    this.setState({ newMessage: event.target.value });
  };

  onSubmit = () => {
    const newMessage = {
      text: this.state.newMessage,
      sender: this.state.loggedInUser.name,
      recipient: this.state.currentUser.name // new field
    };

    const newUsers = this.props.users.map((user) => {
      if (
        user.name === this.state.currentUser.name ||
        user.name === this.state.loggedInUser.name
      ) {
        return { ...user, messages: [...user.messages, newMessage] };
      }
      return user;
    });

    this.props.onUsersUpdate(newUsers);

    this.setState((prevState) => {
      const updatedLoggedInUser = newUsers.find(
        (user) => user.name === prevState.loggedInUser.name
      );
      const updatedCurrentUser = newUsers.find(
        (user) => user.name === prevState.currentUser.name
      );
      return {
        newMessage: "",
        loggedInUser: updatedLoggedInUser,
        currentUser: updatedCurrentUser
      };
    });
  };

  onLogout = () => {
    this.props.onLogout();
  };

  render() {
    const { currentUser, loggedInUser, newMessage } = this.state;
    const { users } = this.props;
    const otherUsers = users.filter(
      (user) => loggedInUser && user.name !== loggedInUser.name
    );

    let messages = [];
    if (currentUser) {
      messages = currentUser.messages.filter(
        (msg) =>
          (msg.sender === loggedInUser.name &&
            msg.recipient === currentUser.name) ||
          (msg.sender === currentUser.name &&
            msg.recipient === loggedInUser.name)
      );
    }

    return (
      <div className="chat-container">
        <div className="user-list-container">
          <div className="user-list">
            {otherUsers.map((user) => (
              <User
                key={user.name}
                user={user}
                onClick={() => this.selectUser(user.name)}
              />
            ))}
            <button className="logout-button" onClick={this.onLogout}>
              Logout
            </button>
          </div>
        </div>

        {currentUser && (
          <div className="chat-window">
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={
                    msg.sender === loggedInUser.name
                      ? "my-message"
                      : "their-message"
                  }
                >
                  <p>
                    <strong>{msg.sender}:</strong> {msg.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={newMessage}
                onChange={this.onInputChange}
                placeholder="Type a message..."
              />
              <button onClick={this.onSubmit}>Send</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Chat;

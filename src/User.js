/*
 * Created by Ilya 'StormLord07' Repnev
 * Created on Sat Jul 29 2023
 */


import React from "react";
import "./style.css";

class User extends React.Component {
  handleClick = () => {
    this.props.onClick(this.props.user);
  };

  render() {
    return (
      <div className="user-block" onClick={this.handleClick}>
        {this.props.user.name}
      </div>
    );
  }
}
export default User;

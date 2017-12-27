import React, { Component } from 'react';

class LoginPage extends Component {
  render() {
    return (
      <div>
        login
        <h5>board: {this.props.boards && this.props.boards[0].id}</h5>
      </div>
    );
  }
}

export default LoginPage;
import React, { Component } from 'react';

class LoginPage extends Component {

  testAuth = () => {
    fetch('http://localhost:7777/test', {
      headers: {
        'Authorization': 'JWT ' + localStorage.getItem('token'),
      },
    })
      .then(response => response.json())
      .then(res => console.log('test', res))
  }

  render() {
    return (
      <div>
        login
        <ul>
          {this.props.boards.map((board) => {
            return (
              <li key={board.id}>{ board.id }</li>
            )
          })}
        </ul>
        <button onClick={() => this.props.addBoard({ id: 2 })}>Add a board</button>
        <button onClick={this.testAuth}>Test auth</button>
        <button onClick={this.createBoard}>Create Board</button>
      </div>
    );
  }
}

export default LoginPage;
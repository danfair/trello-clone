import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BoardPage extends Component {
  state = {
    board: false,
  }

  componentDidMount() {
    fetch(`http://localhost:7777/board/${this.props.match.params.boardId}`, {
      headers: {
        'Authorization': 'JWT ' + localStorage.getItem('token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(board => {
        console.log('board', board);
        this.setState({ board })
      })
  }

  render() {
    if (this.state.board) {
      return (
        <div>
          <h1>{this.state.board.name}</h1>
          <h2>Users:</h2>
          <ul>
            {this.state.board.Users.map((user) => {
              return ( <li key={user.id}>{user.username}</li> )
            })}
          </ul>
          <Link to="/boards">Back to boards</Link>
        </div>
      )
    } else {
      return (
        <h1>Loading...</h1>
      )
    }
  }
}

export default BoardPage;
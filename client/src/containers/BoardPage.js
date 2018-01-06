import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BoardPage extends Component {
  state = {
    board: false,
    newListTitle: '',
    lists: [],
  }

  componentDidMount() {
    this.getBoardInfo();
    this.getLists();
  }

  getBoardInfo = () => {
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

  getLists = () => {
    fetch(`http://localhost:7777/board/${this.props.match.params.boardId}/lists`, {
      headers: {
        'Authorization': 'JWT ' + localStorage.getItem('token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(lists => {
        this.setState({ lists });
      })
  }

  createList = (e) => {
    e.preventDefault();

    fetch(`http://localhost:7777/createList`, {
      method: 'POST',
      headers: {
        'Authorization': 'JWT ' + localStorage.getItem('token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        boardId: this.props.match.params.boardId,
        listTitle: this.state.newListTitle,
      })
    })
      .then(response => response.json())
      .then(list => {
        console.log('new list', list);
      })
  }

  render() {
    if (this.state.board) {
      return (
        <div>
          <Link to="/boards">Back to boards</Link>
          <h1>{this.state.board.name}</h1>
          <h2>Lists:</h2>
          <ul>
            {this.state.lists.map((list) => {
              return <li>{list.title}</li>
            })}
          </ul>
          <h2>Users:</h2>
          <ul>
            {this.state.board.Users.map((user) => {
              return ( <li key={user.id}>{user.username}</li> )
            })}
          </ul>
          <h2>Add a list</h2>
          <form onSubmit={this.createList}>
            <label htmlFor="list-title">List title:</label>
            <input type="text" onKeyUp={(e) => { this.setState({ newListTitle: e.target.value }) }} />
          </form>
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
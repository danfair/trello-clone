import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class BoardsPage extends Component {
  state = {
    boards: [],
    newBoardTitle: '',
    newBoardId: false,
  }

  componentDidMount() {
    console.log('this.props', this.props);
    fetch(`http://localhost:7777/boards`, {
      headers: {
        'Authorization': 'JWT ' + localStorage.getItem('token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(boards => {
        this.setState({ boards })
      })
  }

  createBoard = (e) => {
    e.preventDefault();

    fetch('http://localhost:7777/createBoard', {
      method: 'POST',
      headers: {
        'Authorization': 'JWT ' + localStorage.getItem('token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        boardTitle: this.state.newBoardTitle,
      })
    })
      .then(response => response.json())
      .then(res => {
        if (res.BoardId) {
          this.setState({
            newBoardId: res.BoardId,
          })
        }
      })
  }

  render() {
    if (this.state.newBoardId) {
      return (
        <Redirect to={`/board/${this.state.newBoardId}`} />
      )
    } else {
      return (
        <div>
          <h1>Boards</h1>
          <ul>
            {this.state.boards.map((board) => {
              return (
                <li key={board.id}>
                  <Link to={`/board/${board.id}`}>{board.name}</Link>
                </li>
              )
            })}
          </ul>
          <hr />
          <h2>Create a new board</h2>
          <form onSubmit={this.createBoard}>
            <input type="text" name="title" onKeyUp={(e) => { this.setState({ newBoardTitle: e.target.value }) }} />
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
  }
}

export default BoardsPage;
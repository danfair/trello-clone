import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Test from '../components/Test';

class HomePage extends Component {

  state = {
    username: '',
    password: '',
    name: '',
    loginUsername: '',
    loginPassword: '',
    isAuthenticated: false
  }

  componentDidMount() {
    console.log('this.props', this.props);
  }

  register = (e) => {
    e.preventDefault();

    fetch('http://localhost:7777/register', {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        name: this.state.name
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(res => console.log('register res', res))
  }

  login = (e) => {
    e.preventDefault();
    console.log({
      username: this.state.loginUsername,
      password: this.state.loginPassword,
    });
    fetch('http://localhost:7777/login', {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.loginUsername,
        password: this.state.loginPassword,
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(res => {
        if (res.success) {
          localStorage.setItem('token', res.token);
          this.setState({
            isAuthenticated: true,
          })
        }
      })
  }

  logout = () => {
    localStorage.removeItem('token');
  }

  // testAuth = () => {
  //   fetch('http://localhost:7777/test', {
  //     headers: {
  //       'Authorization': 'JWT ' + localStorage.getItem('token'),
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(res => console.log('test', res))
  // }

  render() {
    if (this.state.isAuthenticated) {
      return <Redirect to="/boards" />
    } else {
      return (
        <div>
          <h5>board: {this.props.boards && this.props.boards[0].id}</h5>
          <form>
            <legend>Register</legend>
            <label htmlFor="name">Name</label>
            <input type="text" onKeyUp={(e) => { this.setState({ name: e.target.value }) }} />
            <br />
            <label htmlFor="username">username</label>
            <input type="username" onKeyUp={(e) => { this.setState({ username: e.target.value }) }} />
            <br />
            <label htmlFor="password">Password</label>
            <input type="password" onKeyUp={(e) => { this.setState({ password: e.target.value }) }} />
            <br />
            <input type="submit" onClick={this.register} value="Register" />
          </form>

          <form>
            <legend>Login</legend>
            <label htmlFor="username">username</label>
            <input type="username" onKeyUp={(e) => { this.setState({ loginUsername: e.target.value }) }} />
            <br />
            <label htmlFor="password">Password</label>
            <input type="password" onKeyUp={(e) => { this.setState({ loginPassword: e.target.value }) }} />
            <br />
            <input type="submit" onClick={this.login} value="Login" />
          </form>

          <button onClick={this.logout}>logout</button>
        </div>
      );
    }
  }
}

export default HomePage;
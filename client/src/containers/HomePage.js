import React, { Component } from 'react';
import Test from '../components/Test';

class HomePage extends Component {

  state = {
    username: '',
    password: '',
    name: '',
    loginUsername: '',
    loginPassword: '',
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
      .then(res => console.log('login res', res))
  }

  testAuth = () => {
    fetch('http://localhost:7777/test')
      .then(response => response.json())
      .then(res => console.log('test res', res))
  }

  render() {
    return (
      <div>
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

        <button onClick={this.testAuth}>Test auth</button>
      </div>
    );
  }
}

export default HomePage;
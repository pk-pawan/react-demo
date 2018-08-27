import React, { Component } from 'react';
import UserDetails from './components/UserDetails';
//import Data from './assets/json/users';
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    usersData: null
  }

  componentDidMount() {
    this.getUsersData();
  }

  render() {
    if (this.state.usersData) {
      return (
        <div>
          <UserDetails users={this.state.usersData} />
        </div>
      );
    } else {
      return <div />
    }
  }

  getUsersData() {
    let userData = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : null
    if (userData) {
      this.setState({usersData: userData})
    } else {
      axios.get('https://api.myjson.com/bins/pkisp')
        .then((res) => {
          if (res.status === 200 && res.data) {
            localStorage.setItem('users', JSON.stringify(res.data.users));
            this.setState({ usersData: res.data.users })
          }
        })
    }
  }

}

export default App;

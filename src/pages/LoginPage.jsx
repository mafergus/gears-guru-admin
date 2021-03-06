import React, { Component } from 'react';
import 'pages/LoginPage.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { primary, text } from 'util/colors';
import firebase from 'datastore/database';
import { fetchGarage } from 'util/Api';
import store from 'datastore/store';

export default class LoginPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isError: false,
      isLoading: false,
      username: '',
      password: '',
      passwordLabel: 'Password',
    };
  }

  onSubmit = () => {
    const { username, password } = this.state;

    this.setState({ isLoading: true } ,() => {
      firebase.auth().signInWithEmailAndPassword(username, password)
      .then(user => {
        console.log("user: ", user);
        this.setState({ isLoading: false });
        fetchGarage(user.uid)
        .then(garage => {
          store.dispatch({ type: "ADD_GARAGE_SUCCESS", garage });
        });
      })
      .catch(error => {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        console.log("Error! ", error);
        this.setState({ 
          isError: true,
          isLoading: false,
          passwordLabel: "Incorrect username or password",
        });
      })
    });
  };

  updateUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  updatePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  onKeyDown = (e) => {
    switch (e.keyCode) {
      case 13: // enter
        this.onSubmit();
        break;
      default:
        break;
    }
  };

  renderTitle() {
    return (
      <div style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
        <h1 
          style={{
            color: text.secondary.dark,
            display: "inline-block",
            fontWeight: "normal",
          }}
        >
        Gears Guru Login
        </h1>
      </div>
    );
  }

  renderLoginBox() {
    const { passwordLabel, isError, isLoading } = this.state;

    return (
      <div style={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{
            backgroundColor: "white",
            paddingTop: 13,
            paddingLeft: 35,
            paddingRight: 35,
            paddingBottom: 35,
            borderColor: text.quartinary.dark,
            borderStyle: "solid",
            borderWidth: 1,
            borderRadius: 3,
          }}
        >
          <TextField
            style={{ width: 250, marginBottom: 20 }}
            placeholder="Username"
            label="Username"
            onChange={this.updateUsername}
            value={this.state.username}
          />
          <br/>
          <TextField
            error={isError}
            style={{ width: 250 }}
            label={passwordLabel}
            placeholder="Password"
            type="password"
            onChange={this.updatePassword}
            value={this.state.password}
          />
          <br/>
          <Button
            style={{ marginTop: 40, color: "white" }}
            color="secondary"
            variant="raised"
            onClick={this.onSubmit}
            disabled={isLoading}
            fullWidth
          >
            {isLoading ? <CircularProgress style={{ color: "white" }}size={20} /> : "Submit"}
          </Button>
        </div>
      </div>
    );
  }

  renderFooter() {
    return (
      <div style={{ width: 50, height: 50, backgroundColor: "red", marginBottom: 20 }}>
      </div>
    );
  }

  render() {
    return (
      <div 
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "#EEEEEE",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
        className="App" 
        onKeyDown={this.onKeyDown}
      >
        <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {this.renderTitle()}
          {this.renderLoginBox()}
          {this.renderFooter()}
        </div>
      </div>
    );
  }
}

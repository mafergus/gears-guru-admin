import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import DocumentTitle from 'react-document-title';

import logo from './logo.svg';
import './App.css';
import { primary } from 'util/colors';

class App extends Component {
  render() {
    return (
      <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          height: "100%",
          top: 0,
          left: 0,
          right: 0,
          bottom: "100%",
          backgroundColor: primary[300] 
        }}
      >
      <DocumentTitle title="Gears Guru - Find the best car repair garages in Dubai!" />
      <Helmet>
        <meta name="description" content="Best Car and Auto Repair Services and Workshops Dubai" />
        <meta name="keywords" content="car repair, car repair dubai, car repair uae, auto repair, auto repair dubai, auto repair uae, car service, car service dubai, auto service, auto servicing dubai, car garage, car workshop, auto workshop" />
        <meta name="google-site-verification" content="Z5xfhCSfmT74Y2930wHGuxbb8ipy1lymqaS22U6jVCA" />
      </Helmet>
      <h1 style={{ color: "white" }}>
        Coming Soon!
      </h1>
      </div>
    );
  }
}

export default App;

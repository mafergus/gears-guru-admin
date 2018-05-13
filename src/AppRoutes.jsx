import React from 'react';
import { Route } from 'react-router';
import LoginPage from 'pages/LoginPage';
import MainPage from 'pages/MainPage';
import CustomersPane from 'components/CustomersPane';
import LoadingPage from 'pages/LoadingPage';
import { connect } from 'react-redux';
import CssBaseline from 'material-ui/CssBaseline';

function mapStateToProps(state, props) {
  return {
    authedUser: state.authedUser,
  };
}

/**
 * Routes: https://github.com/reactjs/react-router/blob/master/docs/API.md#route
 *
 * Routes are used to declare your view hierarchy.
 *
 * Say you go to http://material-ui.com/#/components/paper
 * The react router will search for a route named 'paper' and will recursively render its
 * handler and its parent handler like so: Paper > Components > App
 */
class AppRoutes extends React.Component {
  render() {
    const { authedUser } = this.props;
    const hasUser = authedUser !== null;
    const isAuthed = hasUser ? authedUser.hasOwnProperty('uid') : false;
    // const isMobile = state.browser.is.extraSmall;
    let Component = MainPage;
    if (hasUser) {
      Component = isAuthed ? MainPage : LoginPage;
    } else {
      Component = LoginPage;
    }

    return (
      <div style={{ height: "100%", width: "100%", position: "fixed" }}>
        <CssBaseline />
        {/*<Route exact path="/" component={isAuthed ? MainPage : LoginPage} />*/}
        <Route path="*" component={Component} />
        {/*<Route path="/admin" component={AdminPage}/>*/}
      </div>
    );
  }
}

export default connect(mapStateToProps)(AppRoutes);
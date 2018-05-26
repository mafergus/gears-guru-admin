import React from 'react';
import ReactDOM from 'react-dom';
import 'es5-shim';
import 'es6-shim';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';

import 'static/index.scss';
import AppRoutes from 'components/AppRoutes';
import store from 'datastore/store';
import { primary, secondary } from 'util/colors';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

const theme = createMuiTheme({
  palette: {
    primary: {
      light: primary[100],
      main: primary[500],
      dark: primary[900],
      contrastText: '#fff',
    },
    secondary: {
      light: secondary[100],
      main: secondary[300],
      dark: secondary[700],
      contrastText: '#000',
    },
    accent1color: "red",
  },
});

ReactDOM.render(
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <MuiThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <AppRoutes />
      </ConnectedRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
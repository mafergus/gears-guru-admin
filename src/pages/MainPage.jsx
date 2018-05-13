import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import CustomersPane from 'components/CustomersPane';
import MenuAppBar from 'components/MenuAppBar';
import Sidebar from 'components/Sidebar';
import { primary } from 'util/colors';

// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.
const routes = [
  {
    path: '/',
    exact: true,
    sidebar: () => <div>home!</div>,
    main: () => <CustomersPane />
  },
  {
    path: '/customers',
    sidebar: () => <div>bubblegum!</div>,
    main: () => <CustomersPane />
  },
  {
    path: '/shoelaces',
    sidebar: () => <div>shoelaces!</div>,
    main: () => <h2>Shoelaces</h2>
  }
];

const MainPage = () => (
  <Router>
    <div>
      <MenuAppBar />
      <div style={{ display: "flex" }}>
        {/*<Sidebar style={{ height: "100%", width: "25%", backgroundColor: primaryColor, position: "fixed" }} />
        <div style={{ width: "75%", padding: "10px" }}>
          {routes.map((route, index) => (
            // Render more <Route>s with the same paths as
            // above, but different components this time.
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
        </div>*/}
        <Sidebar style={{ height: "100%", width: "25%", backgroundColor: primary[500] }} />
        <div style={{ width: "75%", height: "100%" }}>
          {routes.map((route, index) => (
            // Render more <Route>s with the same paths as
            // above, but different components this time.
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
        </div>
      </div>
    </div>
  </Router>
);

export default MainPage;
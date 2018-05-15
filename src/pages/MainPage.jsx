import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import CustomersPane from 'components/panes/CustomersPane';
import HomePane from 'components/panes/HomePane';
import CampaignsPane from 'components/panes/CampaignsPane';
import MenuAppBar from 'components/MenuAppBar';
import Sidebar from 'components/sidebar/Sidebar';
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
    main: () => <HomePane />
  },
  {
    path: '/customers',
    sidebar: () => <div>bubblegum!</div>,
    main: () => <CustomersPane />
  },
  {
    path: '/campaigns',
    sidebar: () => <div>shoelaces!</div>,
    main: () => <CampaignsPane />
  }
];

const MainPage = () => (
  <Router>
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <div style={{ width: "18%", height: "100%" }}>
        <Sidebar style={{ backgroundColor: primary[500] }} />
      </div>
      <div style={{ width: "82%", height: "100%" }}>
        <MenuAppBar />
        <div style={{ height: "100%", width: "100%" }}>
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
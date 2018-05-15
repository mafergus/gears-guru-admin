import React from 'react';

import logo from 'assets/logo.png';
import Menu from 'components/sidebar/Menu';

export default function Sidebar({ style }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        background: "#F0F0F0",
        ...style,
      }}
    >
      <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img
          style={{
            height: 55,
            width: 48,
            marginTop: 25,
            marginBottom: 25
          }}
          src={logo}
          alt={"logo"}
        />
      </div>
      <hr />
      <Menu style={{ marginTop: 15 }}/>
    </div>
  );
}

// <ul style={{ listStyleType: "none", padding: 0 }}>
//   <li>
//     <Link to="/">Home</Link>
//   </li>
//   <li>
//     <Link to="/customers">Customers</Link>
//   </li>
//   <li>
//     <Link to="/shoelaces">Shoelaces</Link>
//   </li>
// </ul>
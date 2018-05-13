import React from 'react';
import { BrowserRouter as Link } from "react-router-dom";

export default function Sidebar({ style }) {
  return (
    <div
      style={{
        width: "100%",
        padding: "10px",
        background: "#F0F0F0",
        ...style,
      }}
    >
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
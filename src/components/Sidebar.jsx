import React from 'react';
import { BrowserRouter as Link } from "react-router-dom";

export default function Sidebar({ style }) {
  return (
    <div
      style={{
        padding: "10px",
        width: "40%",
        background: "#f0f0f0",
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
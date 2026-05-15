// import { Navigate } from "react-router-dom";

// export default function UserRoute({ children }) {
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!user || user.role !== "user") {
//     return <Navigate to="/login" />;
//   }

//   return children;
// }

// new

// import { Navigate } from "react-router-dom";

// function UserRoute({ children }) {
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!user || user.role !== "user") {
//     return <Navigate to="/login" />;
//   }

//   return children;
// }

// export default UserRoute;

//new-2

import { Navigate } from "react-router-dom";

function UserRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ old mistake: admin check illa
  // ❌ or user null

  if (!user) {
    return <Navigate to="/login" />;
  }

  // 🔥 IMPORTANT: only block admin
  if (user.role === "admin") {
    return <Navigate to="/" />;
  }

  return children;
}

export default UserRoute;
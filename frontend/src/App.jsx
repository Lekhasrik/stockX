// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// // import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <div>
// //         <a href="https://vite.dev" target="_blank">
// //           <img src={viteLogo} className="logo" alt="Vite logo" />
// //         </a>
// //         <a href="https://react.dev" target="_blank">
// //           <img src={reactLogo} className="logo react" alt="React logo" />
// //         </a>
// //       </div>
// //       <h1>Vite + React</h1>
// //       <div className="card">
// //         <button onClick={() => setCount((count) => count + 1)}>
// //           count is {count}
// //         </button>
// //         <p>
// //           Edit <code>src/App.jsx</code> and save to test HMR
// //         </p>
// //       </div>
// //       <p className="read-the-docs">
// //         Click on the Vite and React logos to learn more
// //       </p>
// //     </>
// //   )
// // }

// // export default App



//1
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Dashboard from "./pages/Dashboard";
// import Products from "./pages/Products";
// import AddProduct from "./pages/AddProduct";
// import Categories from "./pages/Categories";
// import Sales from "./pages/Sales";
// import LowStock from "./pages/LowStock";

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <div style={{ padding: "20px" }}>
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/products" element={<Products />} />
//           <Route path="/add" element={<AddProduct />} />
//           <Route path="/categories" element={<Categories />} />
//           <Route path="/sales" element={<Sales />} />
//           <Route path="/low-stock" element={<LowStock />} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;




//new

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Categories from "./pages/Categories";
import Sales from "./pages/Sales";
import LowStock from "./pages/LowStock";
import Login from "./pages/Login";
import Billing from "./pages/Billing";

function App() {
  // const [isAdmin, setIsAdmin] = useState(false);

  const [isAdmin, setIsAdmin] = useState(
  localStorage.getItem("admin") === "true"
);

  return (
    <BrowserRouter>
      {isAdmin && <Navbar />}

      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />

          <Route
            path="/"
            element={isAdmin ? <Dashboard /> : <Navigate to="/login" />}
          />

          <Route
            path="/products"
            element={isAdmin ? <Products /> : <Navigate to="/login" />}
          />

          <Route
            path="/add"
            element={isAdmin ? <AddProduct /> : <Navigate to="/login" />}
          />

          <Route
            path="/categories"
            element={isAdmin ? <Categories /> : <Navigate to="/login" />}
          />

          <Route
            path="/sales"
            element={isAdmin ? <Sales /> : <Navigate to="/login" />}
          />

          <Route
            path="/low-stock"
            element={isAdmin ? <LowStock /> : <Navigate to="/login" />}
          />

          <Route
  path="/billing"
  element={isAdmin ? <Billing /> : <Navigate to="/login" />}
/>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
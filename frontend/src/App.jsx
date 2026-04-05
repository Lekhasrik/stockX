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
import SalesHistory from "./pages/SalesHistory";
import Analytics from "./pages/Analytics";
import AddStock from "./pages/AddStock";

function App() {
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("admin") === "true"
  );

  return (
    <BrowserRouter>
      {isAdmin && <Navbar setIsAdmin={setIsAdmin} />}

      <div>
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
            path="/add-stock"
            element={isAdmin ? <AddStock /> : <Navigate to="/login" />}
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

          <Route
            path="/sales-history"
            element={isAdmin ? <SalesHistory /> : <Navigate to="/login" />}
          />

          <Route
            path="/analytics"
            element={isAdmin ? <Analytics /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

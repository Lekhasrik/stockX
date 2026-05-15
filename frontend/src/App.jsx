// // import UserDashboard from "./user/UserDashboard";

// // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// // import { useState } from "react";

// // import Register from "./user/Register";
// // import AdminRoute from "./components/AdminRoute";
// // import UserRoute from "./components/UserRoute";

// // import Navbar from "./components/Navbar";
// // import Dashboard from "./pages/Dashboard";
// // import Products from "./pages/Products";
// // import AddProduct from "./pages/AddProduct";
// // import Categories from "./pages/Categories";
// // import Sales from "./pages/Sales";
// // import LowStock from "./pages/LowStock";
// // import Login from "./pages/Login";
// // import Billing from "./pages/Billing";
// // import SalesHistory from "./pages/SalesHistory";
// // import Analytics from "./pages/Analytics";
// // import AddStock from "./pages/AddStock";

// // function App() {
// //   const [isAdmin, setIsAdmin] = useState(
// //     localStorage.getItem("admin") === "true"
// //   );

// //   return (
// //     <BrowserRouter>
// //       {isAdmin && <Navbar setIsAdmin={setIsAdmin} />}

// //       <div>
// //         <Routes>

// //           <Route path="/register" element={<Register />} />

// //   {/* LOGIN */}
// //   <Route path="/login" element={<Login />} />
// //   <Route path="/register" element={<Register />} />

// //   {/* ADMIN */}
// //   <Route 
// //     path="/" 
// //     element={
// //       <AdminRoute>
// //         <Dashboard />
// //       </AdminRoute>
// //     } 
// //   />

// //   {/* USER */}
// //   <Route 
// //     path="/user/dashboard" 
// //     element={
// //       <UserRoute>
// //         <UserDashboard />
// //       </UserRoute>
// //     } 
// //   />

// //           <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />

// //           <Route
// //             path="/"
// //             element={isAdmin ? <Dashboard /> : <Navigate to="/login" />}
// //           />

// //           <Route
// //             path="/products"
// //             element={isAdmin ? <Products /> : <Navigate to="/login" />}
// //           />

// //           <Route
// //             path="/add-stock"
// //             element={isAdmin ? <AddStock /> : <Navigate to="/login" />}
// //           />
          
// //           <Route
// //             path="/add"
// //             element={isAdmin ? <AddProduct /> : <Navigate to="/login" />}
// //           />

// //           <Route
// //             path="/categories"
// //             element={isAdmin ? <Categories /> : <Navigate to="/login" />}
// //           />

// //           <Route
// //             path="/sales"
// //             element={isAdmin ? <Sales /> : <Navigate to="/login" />}
// //           />

// //           <Route
// //             path="/low-stock"
// //             element={isAdmin ? <LowStock /> : <Navigate to="/login" />}
// //           />

// //           <Route
// //             path="/billing"
// //             element={isAdmin ? <Billing /> : <Navigate to="/login" />}
// //           />

// //           <Route
// //             path="/sales-history"
// //             element={isAdmin ? <SalesHistory /> : <Navigate to="/login" />}
// //           />

// //           <Route
// //             path="/analytics"
// //             element={isAdmin ? <Analytics /> : <Navigate to="/login" />}
// //           />
// //         </Routes>
// //       </div>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;


// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import AdminRoute from "./components/AdminRoute";
// import UserRoute from "./components/UserRoute";

// import Navbar from "./components/Navbar";

// import Login from "./pages/Login";
// import Register from "./user/Register";

// import Dashboard from "./pages/Dashboard";
// import Products from "./pages/Products";
// import AddProduct from "./pages/AddProduct";
// import Categories from "./pages/Categories";
// import Sales from "./pages/Sales";
// import LowStock from "./pages/LowStock";
// import Billing from "./pages/Billing";
// import SalesHistory from "./pages/SalesHistory";
// import Analytics from "./pages/Analytics";
// import AddStock from "./pages/AddStock";

// import UserDashboard from "./user/UserDashboard";

// function App() {
//   return (
//     <BrowserRouter>
//       {/* <Navbar /> */}

//       <Routes>

//         {/* COMMON */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* ADMIN ROUTES */}
//         <Route path="/" element={
//           <AdminRoute>
//             <Dashboard />
//           </AdminRoute>
//         } />

//         <Route path="/products" element={
//           <AdminRoute>
//             <Products />
//           </AdminRoute>
//         } />

//         <Route path="/add" element={
//           <AdminRoute>
//             <AddProduct />
//           </AdminRoute>
//         } />

//         <Route path="/categories" element={
//           <AdminRoute>
//             <Categories />
//           </AdminRoute>
//         } />

//         <Route path="/sales" element={
//           <AdminRoute>
//             <Sales />
//           </AdminRoute>
//         } />

//         <Route path="/low-stock" element={
//           <AdminRoute>
//             <LowStock />
//           </AdminRoute>
//         } />

//         <Route path="/billing" element={
//           <AdminRoute>
//             <Billing />
//           </AdminRoute>
//         } />

//         <Route path="/sales-history" element={
//           <AdminRoute>
//             <SalesHistory />
//           </AdminRoute>
//         } />

//         <Route path="/analytics" element={
//           <AdminRoute>
//             <Analytics />
//           </AdminRoute>
//         } />

//         <Route path="/add-stock" element={
//           <AdminRoute>
//             <AddStock />
//           </AdminRoute>
//         } />

//         {/* USER ROUTES */}
//         <Route path="/user/dashboard" element={
//           <UserRoute>
//             <UserDashboard />
//           </UserRoute>
//         } />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


//new

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";

// import Navbar from "./components/Navbar";

import Login from "./pages/Login";
// import Register from "./user/Register";
import Register from "./pages/Register";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Categories from "./pages/Categories";
import Sales from "./pages/Sales";
import LowStock from "./pages/LowStock";
import Billing from "./pages/Billing";
import SalesHistory from "./pages/SalesHistory";
import Analytics from "./pages/Analytics";
import AddStock from "./pages/AddStock";
import AdminOrders from "./pages/AdminOrders";


import UserLayout from "./components/UserLayout";
import UserDashboard from "./user/UserDashboard";
import UserProducts from "./user/UserProducts";
import ProductDetails from "./user/ProductDetails";
import Payment from "./user/Payment";
import Cart from "./user/Cart";
import MyOrders from "./user/MyOrders";

function App() {
  return (
    <BrowserRouter>

      {/* <Navbar /> */}

      <Routes>

        {/* 🔥 DEFAULT REDIRECT */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* ✅ COMMON */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ ADMIN ROUTES */}
        {/* <Route
          path="/admin"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        /> */}
  <Route path="/admin" element={
  <AdminRoute>
    <>
      <Navbar />
      <Dashboard />
    </>
  </AdminRoute>
  } />

 

        <Route path="/products" element={
          <AdminRoute><Navbar /><Products /></AdminRoute>
        } />

        <Route path="/add" element={
          <AdminRoute><Navbar /><AddProduct /></AdminRoute>
        } />

        <Route path="/categories" element={
          <AdminRoute><Navbar /><Categories /></AdminRoute>
        } />

        <Route path="/sales" element={
          <AdminRoute><Navbar /><Sales /></AdminRoute>
        } />

        <Route path="/low-stock" element={
          <AdminRoute><Navbar /><LowStock /></AdminRoute>
        } />

        <Route path="/billing" element={
          <AdminRoute><Navbar /><Billing /></AdminRoute>
        } />

        <Route path="/sales-history" element={
          <AdminRoute><Navbar /><SalesHistory /></AdminRoute>
        } />

        <Route path="/analytics" element={
          <AdminRoute><Navbar /><Analytics /></AdminRoute>
        } />

        <Route path="/add-stock" element={
          <AdminRoute><Navbar /><AddStock /></AdminRoute>
        } />

        {/* <Route
          path="/user/dashboard"
          element={
            <UserRoute>
              <UserDashboard />
            </UserRoute>
          }
        /> */}

{/* <Route path="/user/dashboard" element={
  <UserRoute>
    <UserLayout>
      <UserDashboard />
    </UserLayout>
  </UserRoute>
} />

<Route path="/products-user" element={<UserProducts />} />
<Route path="/product/:id" element={<ProductDetails />} />
<Route path="/payment/:id" element={<Payment />} />

<Route
  path="/cart"
  element={
    <UserRoute>
      <Cart />
    </UserRoute>
  }
/>

<Route
  path="/orders"
  element={
    <UserRoute>
      <MyOrders />
    </UserRoute>
  }
/> */}

<Route path="/user/dashboard" element={
  <UserRoute>
    <UserLayout>
      <UserDashboard />
    </UserLayout>
  </UserRoute>
} />

<Route path="/products-user" element={
  <UserRoute>
    <UserLayout>
      <UserProducts />
    </UserLayout>
  </UserRoute>
} />

<Route path="/product/:id" element={
  <UserRoute>
    <UserLayout>
      <ProductDetails />
    </UserLayout>
  </UserRoute>
} />

<Route path="/payment/:id" element={
  <UserRoute>
    <UserLayout>
      <Payment />
    </UserLayout>
  </UserRoute>
} />

<Route path="/cart" element={
  <UserRoute>
    <UserLayout>
      <Cart />
    </UserLayout>
  </UserRoute>
} />

<Route path="/orders" element={
  <UserRoute>
    <UserLayout>
      <MyOrders />
    </UserLayout>
  </UserRoute>
} />

//new
<Route path="/admin/orders" element={<AdminRoute><Navbar /><AdminOrders /></AdminRoute>} />

        {/* ✅ USER ROUTES */}

        {/* ❌ UNKNOWN ROUTE */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
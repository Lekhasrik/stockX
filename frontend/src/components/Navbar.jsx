// import { Link } from "react-router-dom";

// function Navbar() {
//   return (
//     <div style={{ background: "#222", padding: "15px" }}>
//       <Link to="/" style={linkStyle}>Dashboard</Link>
//       <Link to="/products" style={linkStyle}>Products</Link>
//       <Link to="/add" style={linkStyle}>Add Product</Link>
//       <Link to="/categories" style={linkStyle}>Categories</Link>
//       <Link to="/sales" style={linkStyle}>Sales</Link>
//       <Link to="/low-stock" style={linkStyle}>Low Stock</Link>
//       <Link to="/billing" style={linkStyle}>Billing</Link>
//     </div>
//   );
// }

// const linkStyle = {
//   color: "white",
//   marginRight: "20px",
//   textDecoration: "none"
// };

// export default Navbar;



//2

// import { Link, useLocation } from "react-router-dom";

// function Navbar() {
//   const location = useLocation();

//   const links = [
//     { name: "Dashboard", path: "/" },
//     { name: "Products", path: "/products" },
//     { name: "Add Product", path: "/add" },
//     { name: "Categories", path: "/categories" },
//     { name: "Sales", path: "/sales" },
//     { name: "Low Stock", path: "/low-stock" },
//     { name: "Billing", path: "/billing" },
//   ];

//   return (
//     <div className="bg-white shadow-md px-8 py-4 flex gap-6">
//       <h1 className="text-xl font-bold text-gray-800 mr-8">
//         StockX
//       </h1>

//       {links.map(link => (
//         <Link
//           key={link.path}
//           to={link.path}
//           className={`transition font-medium ${
//             location.pathname === link.path
//               ? "text-blue-600 border-b-2 border-blue-600 pb-1"
//               : "text-gray-600 hover:text-blue-600"
//           }`}
//         >
//           {link.name}
//         </Link>
//       ))}
//     </div>
//   );
// }

// export default Navbar;


//3

import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Add Product", path: "/add" },
    { name: "Categories", path: "/categories" },
    { name: "Sales", path: "/sales" },
    { name: "Low Stock", path: "/low-stock" },
    { name: "Billing", path: "/billing" },
  ];

  return (
    <div className="bg-gray-100 px-8 py-4 border-b border-gray-200">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-gray-800 mr-6">
          StockX
        </h1>

        {links.map(link => {
          const isActive = location.pathname === link.path;

          return (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Navbar;
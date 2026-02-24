import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={{ background: "#222", padding: "15px" }}>
      <Link to="/" style={linkStyle}>Dashboard</Link>
      <Link to="/products" style={linkStyle}>Products</Link>
      <Link to="/add" style={linkStyle}>Add Product</Link>
      <Link to="/categories" style={linkStyle}>Categories</Link>
      <Link to="/sales" style={linkStyle}>Sales</Link>
      <Link to="/low-stock" style={linkStyle}>Low Stock</Link>
      <Link to="/billing" style={linkStyle}>Billing</Link>
    </div>
  );
}

const linkStyle = {
  color: "white",
  marginRight: "20px",
  textDecoration: "none"
};

export default Navbar;
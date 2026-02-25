import { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = (id) => {
    axios.delete(`http://localhost:5000/api/products/${id}`)
      .then(() => fetchProducts());
  };

  // return (
  //   <div>
  //     <h2>Products</h2>
  //     <table border="1" cellPadding="10">
  //       <thead>
  //         <tr>
  //           <th>Name</th>
  //           <th>Category</th>
  //           <th>Price</th>
  //           <th>Stock</th>
  //           <th>Status</th>
  //           <th>Action</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {products.map(p => (
  //           <tr key={p._id}>
  //             <td>{p.name}</td>
  //             <td>{p.category}</td>
  //             <td>₹{p.price}</td>
  //             <td>{p.stock}</td>
  //             <td>{p.status}</td>
  //             <td>
  //               <button onClick={() => deleteProduct(p._id)}>
  //                 Delete
  //               </button>
  //             </td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // );

  return (
  <div className="p-10 min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white">

    <h2 className="text-3xl font-bold text-blue-300 mb-8">
      📦 Products
    </h2>

    <div className="overflow-x-auto bg-blue-900/40 backdrop-blur-lg rounded-2xl shadow-2xl border border-blue-500/30">
      <table className="w-full text-left">
        <thead className="bg-blue-950">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Category</th>
            <th className="p-4">Price</th>
            <th className="p-4">Stock</th>
            <th className="p-4">Status</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map(p => (
            <tr
              key={p._id}
              className="border-t border-blue-700 hover:bg-blue-950 transition"
            >
              <td className="p-4">{p.name}</td>
              <td className="p-4">{p.category}</td>
              <td className="p-4">₹{p.price}</td>
              <td className="p-4">{p.stock}</td>
              <td className={`p-4 font-semibold ${p.status === "Low Stock" ? "text-red-400" : "text-green-400"}`}>
                {p.status}
              </td>
              <td className="p-4">
                <button
                  onClick={() => deleteProduct(p._id)}
                  className="bg-red-500 hover:bg-red-400 px-3 py-1 rounded-lg transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}

export default Products;
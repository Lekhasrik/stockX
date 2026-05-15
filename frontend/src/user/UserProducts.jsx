// // user/UserProducts.jsx
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function UserProducts() {
//   const [products,setProducts] = useState([]);
//   const [cart,setCart] = useState([]);

//   useEffect(()=>{
//     axios.get(`${import.meta.env.VITE_API_URL}/api/products`)
//       .then(res=>setProducts(res.data));
//   },[]);

//   const add = (p) => {
//     setCart([...cart, p]);
//   };

//   const total = cart.reduce((a,b)=>a+b.price,0);

//   return (
//     <div className="flex">
//       <div className="grid grid-cols-3 gap-4 w-3/4">
//         {products.map(p=>(
//           <div key={p._id} className="p-4 border">
//             <h3>{p.name}</h3>
//             <p>₹{p.price}</p>
//             <button onClick={()=>add(p)}>Add</button>
//           </div>
//         ))}
//       </div>

//       <div className="w-1/4 p-4 border">
//         <h2>My Order</h2>
//         {cart.map(c=><p>{c.name}</p>)}
//         <h3>Total: ₹{total}</h3>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(p => (
          <div
            key={p._id}
            className="bg-white border rounded-xl p-4 shadow-sm hover:shadow cursor-pointer"
            onClick={() => navigate(`/product/${p._id}`)}
          >
            <h2 className="font-semibold">{p.name}</h2>
            <p className="text-gray-500 text-sm">₹{p.price}</p>
            <p className="text-xs text-gray-400">Stock: {p.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProducts;
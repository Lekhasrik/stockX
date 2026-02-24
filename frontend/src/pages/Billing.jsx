// import { useEffect, useState } from "react";
// import axios from "axios";

// function Billing() {
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState("");
//   const [quantity, setQuantity] = useState(1);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/products")
//       .then(res => setProducts(res.data));
//   }, []);

//   const handleBill = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/sales", {
//         product: selectedProduct,
//         quantity: Number(quantity)
//       });

//       alert("Bill Generated 🔥 Stock Updated");

//     } catch (err) {
//       alert(err.response?.data?.message || "Error");
//     }
//   };

//   return (
//     <div>
//       <h2>Billing Page</h2>

//       <select onChange={(e) => setSelectedProduct(e.target.value)}>
//         <option>Select Product</option>
//         {products.map(p => (
//           <option key={p._id} value={p._id}>
//             {p.name} (Stock: {p.stock})
//           </option>
//         ))}
//       </select>

//       <input
//         type="number"
//         value={quantity}
//         onChange={(e) => setQuantity(e.target.value)}
//         min="1"
//       />

//       <button onClick={handleBill}>
//         Generate Bill
//       </button>
//     </div>
//   );
// }

// export default Billing;

import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import axios from "axios";

function Billing() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data));
  }, []);

  const addToCart = (product) => {
    const existing = cart.find(item => item.name === product.name);

    if (existing) {
      setCart(cart.map(item =>
        item.name === product.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (name, qty) => {
    setCart(cart.map(item =>
      item.name === name
        ? { ...item, quantity: Number(qty) }
        : item
    ));
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

//   const saveBill = async () => {
//     await axios.post("http://localhost:5000/api/sales/bulk", {
//     //   items: cart
//       items: cart.map(item => ({
//     productId: item._id,
//     quantity: item.quantity
//   }))
//     });

//     alert("Bill Saved 🔥 Stock Updated");
//     setCart([]);
//   };

// const saveBill = async () => {
//   try {
//     await axios.post("http://localhost:5000/api/sales/bulk", {
//       items: cart.map(item => ({
//         productId: item._id,
//         quantity: item.quantity
//       }))
//     });

//     // Download PDF
//     // downloadBill();

//     // 🔥 CLEAR CART AFTER SUCCESS
//     setCart([]);

//     alert("Bill Saved Successfully ✅");

//   } catch (error) {
//     console.error(error);
//     alert("Error saving bill ❌");
//   }
// };

// const saveBill = async () => {
//   try {
//     const response = await axios.post(
//       "http://localhost:5000/api/sales/bulk",
//       {
//         items: cart.map(item => ({
//           productId: item._id,
//           quantity: item.quantity
//         }))
//       }
//     );

//     const { invoiceNumber, totalAmount } = response.data;

//     // 🔥 Pass invoice number to PDF
//     //downloadBill(invoiceNumber, totalAmount);

//     setCart([]);
//     alert("Bill Saved Successfully ✅");

//   } catch (error) {
//     console.error(error);
//     alert("Error saving bill ❌");
//   }
//   console.log(response.data);
// };

//new

// const saveBill = async () => {
//   try {
//     const response = await axios.post(
//       "http://localhost:5000/api/sales/bulk",
//       {
//         items: cart.map(item => ({
//           productId: item._id,
//           quantity: item.quantity
//         }))
//       }
//     );

//     console.log("Backend Response:", response.data);

//     const invoiceNumber = response.data.invoiceNumber;
//     const totalAmount = response.data.totalAmount;

//     downloadBill(invoiceNumber, totalAmount);

//     setCart([]);

//     alert("Bill Saved Successfully ✅");

//   } catch (error) {
//     console.error(error);
//     alert("Error saving bill ❌");
//   }

//   console.log("FULL RESPONSE:", response);
// console.log("DATA:", response.data);
// };



const saveBill = async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/sales/bulk",
      {
        items: cart.map(item => ({
          productId: item._id,
          quantity: item.quantity
        }))
      }
    );

    console.log("Backend Response:", response.data);

    const invoiceNumber = response.data.invoiceNumber;
    const totalAmount = response.data.totalAmount;

    downloadBill(invoiceNumber, totalAmount);

    setCart([]);

    alert("Bill Saved Successfully ✅");

  } catch (error) {
    console.error(error);
    alert("Error saving bill ❌");
  }
};


//   const downloadBill = () => {
//     window.print();
//   };


//new
// const downloadBill = () => {
//   const doc = new jsPDF();

//   doc.text("Invoice", 20, 20);

//   let y = 40;

//   cart.forEach(item => {
//     doc.text(
//       `${item.name} - ${item.quantity} x ${item.price}`,
//       20,
//       y
//     );
//     y += 10;
//   });

//   doc.text(`Total: ₹${totalAmount}`, 20, y + 10);

//   doc.save("invoice.pdf");
// };

const downloadBill = (invoiceNumber, totalAmount) => {
  const doc = new jsPDF();

  doc.text("My Shop Name", 20, 20);
  doc.text(`Invoice No: ${invoiceNumber}`, 20, 30);
  doc.text(`Date: ${new Date().toLocaleString()}`, 20, 40);

  let y = 60;

  cart.forEach(item => {
    doc.text(
      `${item.name} - ${item.quantity} x ${item.price}`,
      20,
      y
    );
    y += 10;
  });

  doc.text(`Total: ₹${totalAmount}`, 20, y + 10);

  doc.save(`${invoiceNumber}.pdf`);
};


  return (
    <div>
      <h2>🧾 Billing Page</h2>

      <h3>Select Products</h3>
      {products.map(p => (
        <div key={p._id}>
          {p.name} - ₹{p.price}
          <button onClick={() => addToCart(p)}>
            Add
          </button>
        </div>
      ))}

      <hr />

      <h3>Bill Items</h3>
      {cart.map(item => (
        <div key={item.name}>
          {item.name} - ₹{item.price}
          <input
            type="number"
            value={item.quantity}
            min="1"
            onChange={(e) =>
              updateQuantity(item.name, e.target.value)
            }
          />
          = ₹{item.price * item.quantity}
        </div>
      ))}

      <h2>Total: ₹{totalAmount}</h2>

      <button onClick={saveBill}>Save Bill</button>
      <button onClick={downloadBill}>Download Bill</button>
    </div>
  );
}

export default Billing;
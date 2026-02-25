// function Card({ title, value }) {
//   return (
//     <div style={{
//       background: "#f4f4f4",
//       padding: "20px",
//       borderRadius: "8px",
//       width: "200px",
//       margin: "10px"
//     }}>
//       <h3>{title}</h3>
//       <h2>{value}</h2>
//     </div>
//   );
// }

// export default Card;

function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-200 hover:border-ocean-300 w-60">
      <h3 className="text-gray-600 text-sm mb-2 font-medium">{title}</h3>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-ocean-600 to-teal-500 bg-clip-text text-transparent">{value}</h2>
    </div>
  );
}

export default Card;

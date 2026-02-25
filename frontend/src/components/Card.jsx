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
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition w-60">
      <h3 className="text-gray-500 text-sm mb-2">{title}</h3>
      <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
    </div>
  );
}

export default Card;
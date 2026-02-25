// import { useState } from "react";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const adminEmail = "admin@gmail.com";
//     const adminPassword = "12345";

//     if (email === adminEmail && password === adminPassword) {
//       alert("Admin Login Success 🔥");
//     } else {
//       setError("Only Admin can login ❌");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <form onSubmit={handleSubmit} style={styles.form}>
//         <h2>Admin Login</h2>

//         {error && <p style={{ color: "red" }}>{error}</p>}

//         <input
//           type="email"
//           placeholder="Enter Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           style={styles.input}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Enter Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={styles.input}
//           required
//         />

//         <button type="submit" style={styles.button}>
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsAdmin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "12345") {
      setIsAdmin(true);
      navigate("/");
    } else {
      alert("Only Admin can login ❌");
    }
  };

  // return (
  //   <form onSubmit={handleSubmit}>
  //     <h2>Admin Login</h2>
  //     <input
  //       type="email"
  //       placeholder="Email"
  //       onChange={(e) => setEmail(e.target.value)}
  //     />
  //     <input
  //       type="password"
  //       placeholder="Password"
  //       onChange={(e) => setPassword(e.target.value)}
  //     />
  //     <button type="submit">Login</button>
  //   </form>
  // );

  return (
  <div className="flex justify-center items-center min-h-screen">
    <form
      onSubmit={handleSubmit}
      className="bg-blue-900/40 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-[350px] space-y-4 border border-blue-500/30"
    >
      <h2 className="text-2xl font-bold text-center text-blue-300">
        🔐 Admin Login
      </h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 rounded bg-blue-950 border border-blue-600"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 rounded bg-blue-950 border border-blue-600"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-blue-400 p-3 rounded-lg font-bold hover:scale-105 transition"
      >
        Login 🚀
      </button>
    </form>
  </div>
);
}

export default Login;
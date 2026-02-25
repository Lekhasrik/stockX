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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (email === "admin@gmail.com" && password === "12345") {
        localStorage.setItem("admin", "true");
        setIsAdmin(true);
        navigate("/");
      } else {
        setError("Invalid credentials. Only admin can login.");
      }
      setLoading(false);
    }, 500);
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
      className="bg-white p-8 rounded-2xl shadow-xl w-[350px] space-y-4 border border-gray-200"
    >
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-ocean-600 to-teal-500 bg-clip-text text-transparent">
        🔐 Admin Login
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-300 text-red-700 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-ocean-400 focus:border-ocean-400 outline-none text-gray-800 placeholder-gray-400"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-ocean-400 focus:border-ocean-400 outline-none text-gray-800 placeholder-gray-400"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-ocean-500 to-teal-500 hover:from-ocean-600 hover:to-teal-600 p-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed text-white"
      >
        {loading ? "Logging in..." : "Login 🚀"}
      </button>
    </form>
  </div>
);
}

export default Login;

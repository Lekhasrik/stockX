import Navbar from "./Navbar";

function UserLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="p-4">
        {children}
      </div>
    </>
  );
}

export default UserLayout;
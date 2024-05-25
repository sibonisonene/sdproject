import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = ({ openModal }) => {
  const { authUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Signed out successfully!"))
      .catch((error) => console.error("Sign out error:", error));
  };

  return (
    <nav className="navbar">
      <h1>Sectional Titles</h1>
      <div className="links">
        {authUser ? (
          <>
            {authUser.isAdmin && (
              <>
                <a href="#!" className="navbar-mk-admin" onClick={openModal}>Make Admin</a>
                <Link to="/components/auth/signup" style={{ color: 'black', borderRadius: '8px' }}>Register</Link>
                <Link to="/components/auth/RemoveUser" style={{ color: 'black', borderRadius: '8px' }}>Remove User</Link>
                <Link to="/components/auth/EditUserInfo" style={{ color: 'black', borderRadius: '8px' }}>Edit users</Link>
                <Link to="/components/Maintenance" style={{ color: 'black', borderRadius: '8px' }}>Maintenance</Link>
                <Link to="/components/IssueFines" style={{ color: 'black', borderRadius: '8px' }}>Issue Fines</Link>
              </>
            )}
            <Link to="/components/Profile">My Profile</Link>
            <Link to="/components/Dashboard">Home</Link>
            <Link to="/" onClick={handleSignOut}>Sign Out</Link>
          </>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;

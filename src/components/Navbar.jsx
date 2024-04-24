
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Sectional Titles</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/components/auth/signup" style={{ 
          color: 'white', 
          borderRadius: '8px' 
        }}>Register</Link>
      </div>
    </nav>
  );
}
 
export default Navbar;

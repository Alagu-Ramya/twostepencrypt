import  React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ()=>{
  return (
    <div className="topnav">
        <Link className="active" to="/">Home</Link>
        <Link  to="/encrypt">Encrypt</Link>
        <Link  to="/">Decrypt</Link>
        <Link  to="/">About</Link> 
    </div>
  )
}
export default Navbar;
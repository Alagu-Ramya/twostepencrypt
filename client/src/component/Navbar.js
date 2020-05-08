import  React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ()=>{
  return (
    <div className="topnav">
        <Link  to="/">Home</Link>
        <Link  to="/encrypt">Encrypt</Link>
        <Link  to="/decrypt">Decrypt</Link>
        <Link  to="/about">About</Link> 
    </div>
  )
}
export default Navbar;
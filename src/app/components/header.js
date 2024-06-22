// components/Header.js
import Link from "next/link";
import Navbar from "./Navbar";

const Header = () => {
    return (
    
      <header >
      <div >
      <Navbar/>
        <h1 ><Link href="../pages/about.js">Web App</Link></h1>
     
      </div>
    </header>
    );
  };
  
  export default Header;
  
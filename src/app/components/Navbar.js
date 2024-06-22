// components/Navbar.js
import Link from 'next/link';
import  '../styles/globals.css';

const Navbar = () => {
  return (
 
      <div>
        <header>
        <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-gray-300 hover:text-white">Inicio</Link>
          </li>
          <li>
            <Link href="../pages/about" className="text-gray-300 hover:text-white">Sobre Nosotros</Link>
          </li>
          <li>
            <Link href="/services" className="text-gray-300 hover:text-white">Servicios</Link>
          </li>
          <li>
            <Link href="/contact" className="text-gray-300 hover:text-white">Contacto</Link>
          </li>
        </ul>
      </div>
    </nav>
       </header>
      </div>
    
  );
};

export default Navbar;

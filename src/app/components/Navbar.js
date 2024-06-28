import Link from 'next/link';



const Navbar = () => {
  return (  
    <nav >

      <div className=" font-thin text-4xl flex space-x-8 py-8" >
        <Link href="/">Home</Link>
        <Link href="/About">About</Link>
        <Link href="/Blog">Blog</Link>
        <Link href="/Contact">Contact</Link>
    
      </div>
    </nav>
  );
};
export default Navbar;

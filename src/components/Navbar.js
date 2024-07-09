import Link from 'next/link';
import { ModeToggle } from '@/components/toggle';

const Navbar = () => {
  return (
    <nav >
      <div className=" font-thin text-4xl flex space-x-8 py-8" >
        <Link href="/">Home</Link>
        <Link href="/About">About</Link>
        <Link href="/Blog">Blog</Link>
        <Link href="/Contact">Contact</Link>
        <ModeToggle />
      </div>
    </nav>
  );
};
export default Navbar;

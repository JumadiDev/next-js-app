const Footer = () => {
  return (
    <footer>
      <div class="container mx-auto font-thin text-4xl flex space-x-8 py-8">
        <p className=" text-base">&copy; {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;

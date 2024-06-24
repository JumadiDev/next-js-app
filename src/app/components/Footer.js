const Footer = () => {
  return (
    <footer>
      <div class="container mx-auto font-thin text-4xl text-center py-8">
        <p className="text-sm">&copy; {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;

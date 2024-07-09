import Image from "next/image";

const Contact = () => {
  return (
    <div className=" font-thin text-4xl relative flex place-items-center before:w-full sm:before:w-[90px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[150px] after:w-full sm:after:w-[300px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[160px] z-[-1]">
      <img
        src="/contact.svg"
        alt="contact"
        width={200}
        height={37}
        priority
      /> <p>call me</p>
    </div>
  );
};

export default Contact;
import Image from "next/image";

const about = () => {
  return (
    <div className=" font-thin text-4xl relative flex place-items-center before:w-full sm:before:w-[50px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[400px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[260px] z-[-1]">
      <h1>Hi, I'm Juliam ! </h1>
      <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-stone-300">
        <Image
          src="/JumadiDev.png"
          alt="JumadiDev"
          layout="fill"
          objectFit="cover" />
      </div>
    </div>
  );
};
export default about;
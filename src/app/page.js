
import Image from "next/image";

export default function Home({ Component, pageProps }) {
  return (
    <div className="place-items-center before:absolute before:h-[150px] before:w-full sm:before:w-[380px] before:-translate-x-1/6 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[150px] after:w-full sm:after:w-[140px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[200px] z-[-1]">
      <p>This website is built with</p>
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src="/next.svg"
        alt="Next.js Logo"
        width={180}
        height={25}
        priority />
      <Image
        className=" absolute dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src="/hero-alt.png"
        alt="Next.js Logo"
        width={360}
        height={90}
        priority />

    </div>
  );
}


import { Inter } from "next/font/google";
import "./styles/globals.css";
import Footer from "./components/Footer";
import Header from "./components/header";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My App Nextjs",
  description: "Website created by JumadiDev",
};

export default function RootLayout({ children }) {
  return (
    <html  lang="en">
    
      <body className={inter.className}>
      <main className="before:absolute flex min-h-screen flex-col items-center justify-between font-sans">             
      <Header />{children}<Footer />
      </main>
      </body> 
    </html>
  );
}

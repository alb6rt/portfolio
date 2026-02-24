import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// setting metadata for titles/previews
export const metadata = {
  title: "Albert Luu",
  description: "Computer Science & Psychology @ UNSW",
};

// contents
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
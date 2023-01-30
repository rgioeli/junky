"use client";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Nav from "./nav";
import { Open_Sans } from "@next/font/google";
import Image from "next/image";
const open_sans = Open_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={`${open_sans.className}`}>
        <SessionProvider session={session}>
          <Nav />
          <div className="container m-auto relative z-10">{children}</div>
        </SessionProvider>
        <div className="fixed bottom-0">
          <Image
            alt={""}
            src={"/images/background.png"}
            width={1920}
            height={1080}
          />
        </div>
      </body>
    </html>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import {
  BsCartFill,
  BsDoorClosedFill,
  BsGrid1X2Fill,
  BsMessenger,
  BsPersonCircle,
  BsTools,
} from "react-icons/bs";
import { useState } from "react";

const Nav = () => {
  const router = useRouter();
  const id = 1;
  const { data, status } = useSession();
  const [openUserOptions, setOpenUserOptions] = useState(false);
  return (
    <div className="p-5 bg-gradient-to-l from-purple-900 to-purple-700 text-white relative z-10">
      <div className="flex container m-auto items-center">
        <nav className="container m-auto flex justify-between items-center p-2 mr-5">
          <Image alt={"logo"} src={"/images/logo.png"} width={75} height={75} />
          <ul className="flex justify-end gap-x-5 items-center">
            <li>
              <Link href="#">About</Link>
            </li>
            <li>
              <Link href="#">T&S</Link>
            </li>
            <li>
              <Link href="#">Notification</Link>
            </li>
          </ul>
        </nav>
        {status === "unauthenticated" ? (
          <div
            onClick={() => signIn("google", { callbackUrl: "/create-user" })}
            className="cursor-pointer flex bg-white text-purple-900 p-2 rounded-md gap-x-2 items-center"
          >
            <p className="font-medium">Signin</p>
            <BsPersonCircle size={20} />
          </div>
        ) : (
          <div
            onClick={() => setOpenUserOptions(!openUserOptions)}
            className="cursor-pointer flex bg-white text-purple-900 p-2 rounded-md gap-x-2 items-center"
          >
            <p className="font-medium">{data && data.user.name}</p>
            <BsPersonCircle size={20} />
          </div>
        )}
        <BsCartFill
          onClick={() => router.push(`/user/cart`)}
          size={25}
          color="white"
          className="ml-5 cursor-pointer"
        />
      </div>
      {openUserOptions && (
        <nav className=" text-purple-900 font-medium container m-auto">
          <ul className="flex flex-end items-end justify-end font-medium space-x-2">
            <li className="flex items-center space-x-2 border-2 p-2 rounded-md bg-white border-purple-900">
              <BsGrid1X2Fill />
              <Link href={`/dashboard`}>Dashboard</Link>
            </li>
            <li className="flex items-center space-x-2 border-2 p-2 bg-white rounded-md border-purple-900">
              <BsDoorClosedFill />
              <Link href={`/api/auth/signout`}>Logout</Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Nav;

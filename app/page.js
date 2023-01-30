import { Inter } from "@next/font/google";
import { Suspense } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  return (
    <Suspense fallback={<p>Loading users...</p>}>
      <p>Home Page</p>
    </Suspense>
  );
}

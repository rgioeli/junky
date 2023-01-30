import { mongo_connect } from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import CreateUsername from "./create-username";
import { authOptions } from "pages/api/auth/[...nextauth]";

async function checkUsername(email) {
  const db = await mongo_connect();
  const response = await db.collection("users").findOne({ email });
  return response;
}

const Page = async (props) => {
  // This component is used to assign a username to a non-credential provider
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  const user = await checkUsername(session.user.email);
  if (user.username) redirect("/");

  return (
    <div className="flex justify-center">
      <CreateUsername />
    </div>
  );
};

export default Page;

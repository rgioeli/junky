import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { mongo_connect } from "@/lib/mongodb";
import Joi from "@hapi/joi";

export default async function handler(req, res) {
  console.log(req.method);
  if (req.method !== "PUT")
    return res.status(400).send("Something went wrong.");

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(400).send("Not a valid user.");

  const username = req.body;

  const schema = Joi.string().min(3).max(16).regex(/[\w]+/);
  const { error } = await schema.validate(username);
  console.log(error);
  if (error) return res.status(400).send(error.message);

  const db = await mongo_connect();
  const saved = await db
    .collection("users")
    .updateOne({ email: session.user.email }, { $set: { username } });
  if (!saved) res.status(404).send("Error came back updating username.");

  return res.json({ success: "ok" });
}

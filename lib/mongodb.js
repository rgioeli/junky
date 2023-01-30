import { MongoClient } from "mongodb";

export const mongo_connect = async () => {
  try {
    const client = await new MongoClient(process.env.MONGO_URI);
    const connection = await client.connect();
    return connection.db("junky");
  } catch (e) {
    throw new Error(e);
  }
};

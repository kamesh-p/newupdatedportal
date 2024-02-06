import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
  const client = await clientPromise;

  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "Missing 'id' parameter" });
    }

    const db = client.db("test");
    const collection = db.collection("users");

    const userObjectId = new ObjectId(id);
    const filteredUser = await collection.findOne({ _id: userObjectId });

    if (!filteredUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(filteredUser);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

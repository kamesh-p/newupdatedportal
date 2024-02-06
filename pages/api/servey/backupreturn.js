import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id } = req.body;
    try {
      const objectId = new ObjectId(id);

      const client = await clientPromise;
      const db = client.db("questionssurvey");

      const result = await db
        .collection("survey")
        .updateOne({ _id: objectId }, { $set: { Backup: false } });

      if (result.modifiedCount === 1) {
        res.status(200).json({ message: "Survey backup successful!" });
      } else {
        res.status(400).json({ error: "Failed to perform survey backup." });
      }
    } catch (error) {
      console.error("Error performing survey backup:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

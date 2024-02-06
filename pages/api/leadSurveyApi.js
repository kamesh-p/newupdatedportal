import { MongoClient } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const loginId = req.query.loginId;

    const client = await clientPromise;
    const db = client.db("questionssurvey");

    const filter = { mentorid: loginId };

    const existingQuestions = await db
      .collection("survey")
      .find(filter)
      .limit(20)
      .toArray();

    res.status(200).json(existingQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

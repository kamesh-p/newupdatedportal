import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
  const client = await clientPromise;

  try {
    const db = client.db("questionssurvey");

    const collection = db.collection("survey");

    const usercollection = await collection.find().toArray();

    res.status(200).json(usercollection);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

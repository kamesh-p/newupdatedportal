import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
  const client = await clientPromise;

  try {
    const db = client.db("questionssurvey");

    const collection = db.collection("survey");

    // Corrected code: use find instead of findOne, and pass the correct filter
    const userCollection = await collection.find({ Backup: true }).toArray();

    res.status(200).json(userCollection);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

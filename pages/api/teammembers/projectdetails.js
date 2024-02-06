import clientPromise from "../../../lib/mongodb"; // Adjust the path based on your project structure

export default async (req, res) => {
  const client = await clientPromise;

  try {
    const db = client.db("projects");

    const collection = db.collection("details");

    const usercollection = await collection.find().toArray();

    res.status(200).json(usercollection);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

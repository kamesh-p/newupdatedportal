import clientPromise from "../../../lib/mongodb"; // Adjust the path based on your project structure

export default async (req, res) => {
  const client = await clientPromise;

  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "Missing 'id' parameter" });
    }
    const db = client.db("questionssurvey");

    const collection = db.collection("survey");

    const surevyquestionscollection = await collection.find().toArray();
    const filtersurvey = surevyquestionscollection.filter((e) => {
      return e.userid === id && e.status === false;
    });

    res.status(200).json(filtersurvey);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

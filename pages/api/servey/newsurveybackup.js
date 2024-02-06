import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const {
    Backup,
    Feedbacktime,
    Formcreateddate,
    Submitteddate,
    command,
    mentor,
    mentorid,
    questions,
    responses,
    status,
    title,
    userid,
    user,
  } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db("questionssurvey");
    const collection = db.collection("survey");

    await collection.insertOne({
      Backup,
      Feedbacktime,
      Formcreateddate,
      Submitteddate,
      command,
      mentor,
      mentorid,
      questions,
      responses,
      status,
      title,
      userid,
      user,
    });

    res.status(200).json({ message: "Answer inserted successfully" });
  } catch (error) {
    console.error("Error inserting answer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

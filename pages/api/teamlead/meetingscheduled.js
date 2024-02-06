import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "Missing 'id' parameter" });
    }

    const client = await clientPromise;
    const db = client.db("Meetings");
    const collection = db.collection("events");

    const meetingcollection = await collection.find().toArray();

    const meetingScheduled = meetingcollection.filter((meet) => {
      return meet.userid === id;
    });

    res.status(200).json(meetingScheduled);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

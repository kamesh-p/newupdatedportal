import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
  try {
    const { id } = req.query;
    // console.log("id leave backup", id);
    if (!id) {
      return res.status(400).json({ error: "Missing 'id' parameter" });
    }

    const client = await clientPromise;
    const db = client.db("leave");
    const collection = db.collection("details");

    const leavecollection = await collection.find().toArray();

    const leaveScheduled = leavecollection.filter((leave) => {
      return leave.user === id;
    });

    res.status(200).json(leaveScheduled);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

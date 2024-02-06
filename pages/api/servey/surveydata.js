import clientPromise from "../../../lib/mongodb"; // Adjust the path based on your project structure

export default async (req, res) => {
  const client = await clientPromise;

  try {
    const db = client.db("test");
    const dbsurvey = client.db("questionssurvey");
    const collection = db.collection("users");
    const surveycollection = dbsurvey.collection("survey");
    const surveyData = await surveycollection.find({}).toArray();

    const teammembers = await collection.find({ type: "teammember" }).toArray();

    // Log the fetched data for debugging
    console.log("Survey Data:", surveyData);
    console.log("Teammembers Data:", teammembers);

    const filteredArray = teammembers.filter(
      (item) =>
        !surveyData.some(
          (obj) => obj.userid === item._id.toString() && obj.status == false
        )
    );
    console.log("Filtered Data:", filteredArray);

    res.status(200).json(filteredArray);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

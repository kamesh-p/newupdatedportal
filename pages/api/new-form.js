import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const client = await clientPromise;
      const formDb = client.db("questionssurvey");

      const { responses, surveyid, Submitteddate } = req.body;

      const testUserCollection = formDb.collection("survey");

      await testUserCollection.updateOne(
        { _id: ObjectId(surveyid) },
        {
          $set: {
            status: true,
            responses: responses,
            Submitteddate: Submitteddate,
          },
        }
      );

      res.status(201).json({ message: "Form submitted successfully!" });
    } catch (error) {
      console.error("Error submitting form:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

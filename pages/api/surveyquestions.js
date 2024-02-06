import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const formClient = await clientPromise;
      const formDb = formClient.db("questionssurvey");

      const {
        submittedValues,
        mentorid,
        mentor,
        user,
        title,
        status,
        userid,
        command,
        responses,
        Formcreateddate,
        Submitteddate,
        Feedbacktime,
        Backup,
      } = req.body;

      console.log("Received form data:", submittedValues);

      await formDb.collection("survey").insertOne({
        questions: submittedValues,
        mentorid,
        mentor,
        user,
        title,
        status,
        userid,
        command,
        responses,
        Formcreateddate,
        Submitteddate,
        Feedbacktime,
        Backup,
      });

      res.status(201).json({ message: "Form submitted successfully!" });
    } catch (error) {
      console.error("Error submitting form:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

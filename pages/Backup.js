import React, { useEffect, useState } from "react";
import ProtectedRoute from "../compoenets/protectedRoutes";

const Backup = () => {
  const [surveyData, setservey] = useState([]);
  const [backup, setbackup] = useState("");
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);
  const [selectedBackup, setSelectedBackup] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/servey/surveydata");
        if (response.ok) {
          const data = await response.json();
          setbackup(data);
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleBackupChange = (event) => {
    const selectedBackupString = event.target.value;
    console.log("selected", selectedBackupString);

    if (selectedBackupString.trim() !== "") {
      try {
        const isValidJSON = /^[\],:{}\s]*$/.test(
          selectedBackupString
            .replace(/\\["\\\/bfnrtu]/g, "@")
            .replace(
              /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
              "]"
            )
            .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
        );

        if (isValidJSON) {
          const parsedBackup = JSON.parse(selectedBackupString);
          setSelectedBackup(parsedBackup);
        } else {
          console.warn("Selected backup string is not valid JSON");
        }
      } catch (error) {
        console.error("Error parsing selected backup:", error);
      }
    } else {
      // Handle the case when the input string is empty
      console.warn("Selected backup string is empty");
      setSelectedBackup(null); // or whatever default value you want to set
    }
  };

  const currentDate = new Date().toISOString();
  const handleClick = async (data) => {
    console.log("data", data);
    try {
      const response = await fetch("/api/servey/newsurveybackup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Backup: "backed",
          Feedbacktime: "",
          Formcreateddate: currentDate,
          Submitteddate: "",
          command: "",
          mentor: selectedBackup.mentor,
          mentorid: selectedBackup.mentor[0].id,
          questions: data.questions,
          responses: data.responses,
          status: false,
          title: data.title,
          userid: selectedBackup._id,
          user: selectedBackup.name,
        }),
      });

      if (response.ok) {
        console.log("Form submitted successfully!");
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/servey/backup");
        if (response.ok) {
          const data = await response.json();
          setservey(data);
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [surveyData]);

  const handleContainerClick = (surveyId) => {
    setSelectedSurveyId((prevSelectedId) =>
      prevSelectedId === surveyId ? null : surveyId
    );
  };
  const Handlebackup = async (id) => {
    console.log("id", id);
    try {
      const response = await fetch("/api/servey/backupreturn", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  //   console.log("backup", backup);

  return (
    <ProtectedRoute>
      <div className="p-4">
        <h2 className="text-center text-teal-700 font-extrabold text-2xl mb-4">
          Backup
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {surveyData.map((data) => (
            <div key={data._id} className="mb-4">
              <div
                className={`block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100`}
              >
                <div className="flex justify-between ">
                  <div
                    className={`cursor-pointer ${
                      selectedSurveyId === data._id ? "bg-gray-100" : ""
                    }`}
                    onClick={() => {
                      handleContainerClick(data._id);
                    }}
                  >
                    {data.title}
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        Handlebackup(data._id);
                      }}
                      className="bg-red-500 rounded-md p-1 text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="backupSelect">Select a backup:</label>
                  <select
                    id="backupSelect"
                    value={selectedBackup}
                    onChange={handleBackupChange}
                  >
                    <option value="">Select Backup</option>
                    {Array.isArray(backup) &&
                      backup.map((back) => (
                        <option key={back._id} value={JSON.stringify(back)}>
                          {back.name}
                        </option>
                      ))}
                  </select>
                </div>

                {selectedSurveyId === data._id && (
                  <div className="mt-4 p-4 bg-white shadow-md rounded-md">
                    {/* <p className="text-teal-700 font-semibold mb-2">Dialog</p> */}
                    {data.questions.map((ques) => (
                      <div key={ques._id} className="mb-2">
                        <div className="text-gray-700 my-2">
                          Type: {ques.type}
                        </div>
                        <div className="text-black my-2">
                          Question: {ques.question}
                        </div>
                        Option:
                        <div className="text-black grid grid-cols-2">
                          {ques.options.map((op) => {
                            return (
                              <div>
                                <p>{op}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <button className="my-4" onClick={() => handleClick(data)}>
                  send
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Backup;

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import ProtectedRoute from "../compoenets/protectedRoutes";

const Totalsurvey = ({ surveyData }) => {
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [backup, setbackup] = useState("");

  const [filterStatus, setFilterStatus] = useState("all");

  const handleSurveyClick = (survey) => {
    setSelectedSurvey(survey);
    // setCommandText("");
  };

  const handleCloseDialog = () => {
    setSelectedSurvey(null);
  };
  const handleFilter = (status) => {
    setFilterStatus(status);
  };

  const Handlebackup = async (id) => {
    console.log("id", id);
    try {
      const response = await fetch("/api/servey/Backupupdate", {
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
        // Update your state or perform other actions as needed
      } else {
        console.error("Failed to fetch data:", response.statusText);
        // Handle error appropriately, show user-friendly message, etc.
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error appropriately
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM d, yyyy");
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const filteredSurveyData = surveyData?.filter((survey) => {
    if (filterStatus === "all") {
      return true;
    } else {
      return (
        (filterStatus === "completed" &&
          survey.status &&
          survey.command !== "") ||
        (filterStatus === "pending" &&
          survey.status &&
          survey.command === "") ||
        (filterStatus === "notFilled" && !survey.status)
      );
    }
  });
  //   console.log("backup filter", backup);
  return (
    <ProtectedRoute>
      <div>
        <div>
          <div className="">
            <div className="flex justify-end mb-4">
              <button
                className={`mx-2 ${
                  filterStatus === "all" ? "bg-teal-500" : "bg-gray-300"
                } text-white py-2 px-4 rounded`}
                onClick={() => handleFilter("all")}
              >
                All
              </button>
              <button
                className={`mx-2 ${
                  filterStatus === "completed" ? "bg-teal-500" : "bg-gray-300"
                } text-white py-2 px-4 rounded`}
                onClick={() => handleFilter("completed")}
              >
                Completed
              </button>
              <button
                className={`mx-2 ${
                  filterStatus === "pending" ? "bg-teal-500" : "bg-gray-300"
                } text-white py-2 px-4 rounded`}
                onClick={() => handleFilter("pending")}
              >
                Pending
              </button>
              <button
                className={`mx-2 ${
                  filterStatus === "notFilled" ? "bg-teal-500" : "bg-gray-300"
                } text-white py-2 px-4 rounded`}
                onClick={() => handleFilter("notFilled")}
              >
                Not Filled
              </button>
            </div>

            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-gray-200 border-2 ">Title</th>
                  <th className="py-2 px-4 border-gray-200 border-2">User</th>
                  <th className="py-2 px-4 border-gray-200 border-2">Status</th>
                  <th className="py-2 px-4 border-gray-200 border-2">Survey</th>
                  <th className="py-2 px-4 border-gray-200 border-2">
                    Created
                  </th>
                  <th className="py-2 px-4 border-gray-200 border-2">
                    Submitted
                  </th>
                  <th className="py-2 px-4 border-gray-200 border-2">
                    Feedback Time
                  </th>
                  <th className="py-2 px-4 border-gray-200 border-2">
                    Feedback
                  </th>
                  <th className="py-2 px-4 border-gray-200 border-2">Backup</th>
                </tr>
              </thead>
              <tbody>
                {filteredSurveyData.map((survey, index) => (
                  <tr
                    key={index}
                    className={
                      survey.status
                        ? survey.command === ""
                          ? "bg-yellow-50"
                          : "bg-teal-50"
                        : "bg-red-50"
                    }
                  >
                    <td className="py-2 text-center px-4 border-gray-200 border-2">
                      {survey.title}
                    </td>
                    <td className="py-2 text-center px-4 border-gray-200 border-2">
                      {survey.user}
                    </td>
                    <td className="py-2 text-center px-4 border-gray-200 border-2">
                      {survey.status
                        ? survey.command === ""
                          ? "Pending"
                          : "Completed"
                        : "Not yet filled"}
                    </td>
                    <td className="py-2 px-4 text-center border-gray-200 border-2">
                      {survey.responses.length === 0 ? (
                        <p>No Response</p>
                      ) : (
                        <button
                          className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded"
                          onClick={() => handleSurveyClick(survey)}
                        >
                          View Survey
                        </button>
                      )}
                    </td>
                    <td className="py-2 text-center px-4  border-gray-200 border-2">
                      {formatDate(survey.Formcreateddate)}
                    </td>
                    <td className="py-2 text-center px-4  border-gray-200 border-2">
                      {survey.Submitteddate
                        ? formatDate(survey.Submitteddate)
                        : "Not Submitted"}
                    </td>
                    <td className="py-2 text-center px-4 border-gray-200 border-2">
                      {survey.Feedbacktime
                        ? formatDate(survey.Feedbacktime)
                        : "No Feedback"}
                    </td>
                    <td className="py-2 text-center px-4 border-gray-200 border-2">
                      {survey.status ? (
                        survey.command === "" ? (
                          <button>mentor</button>
                        ) : (
                          survey.command
                        )
                      ) : (
                        <button>trainee</button>
                      )}
                    </td>
                    <td className="py-2 text-center px-4 border-gray-200 border-2">
                      {!survey.Backup && (
                        <button
                          onClick={() => {
                            Handlebackup(survey._id);
                          }}
                        >
                          <spen> Backup</spen>
                        </button>
                      )}
                      {survey.Backup && <button>Stored</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedSurvey && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-3/4 p-4 max-h-screen overflow-y-auto rounded">
              <button
                className="float-right text-lg font-bold text-gray-700 hover:text-teal-700"
                onClick={handleCloseDialog}
              >
                X
              </button>
              <h2 className="text-2xl font-bold mb-4 text-center text-teal-700">
                Survey Details
              </h2>
              <div className="grid grid-cols-1 bg-gray-100 mr-5 p-2 md:grid-cols-4 my-4 ml-3 gap-4">
                <div>
                  <p className="text-lg font-bold mb-2 text-teal-700">
                    Name:{" "}
                    <span className="font-normal ml-2 text-base text-black">
                      {selectedSurvey.user}
                    </span>
                  </p>
                  <p className="text-lg font-bold text-teal-700">
                    Status:{" "}
                    <span className="text-black ml-2 text-base font-normal">
                      {selectedSurvey.status
                        ? selectedSurvey.command === ""
                          ? "Pending"
                          : "Completed"
                        : "Not Filled Yet"}
                    </span>
                  </p>
                </div>

                <div>
                  <p className="text-lg font-bold mb-2 text-teal-700">Title:</p>
                  <p className="mb-2">{selectedSurvey.title}</p>
                </div>
                <div>
                  <p className="text-lg font-bold mb-2 text-teal-700">
                    Command:
                  </p>
                  <p className="mb-2">
                    {selectedSurvey.command === ""
                      ? "No Comments Yet"
                      : selectedSurvey.command}
                  </p>
                </div>
              </div>
              <div className="w-full my-8">
                <div className="p-4 rounded">
                  <div
                    className="flex items-center  cursor-pointer"
                    onClick={toggleAccordion}
                  >
                    <h2 className="text-lg font-extrabold text-teal-700">
                      Question and Answer
                    </h2>
                    <svg
                      className={`h-6 w-6 ml-5 transition-transform ${
                        isOpen ? "transform rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>

                  {isOpen && (
                    <div className="mt-4">
                      <div className="grid grid-cols-1  md:grid-cols-3 gap-4 mb-4">
                        {selectedSurvey?.responses?.map((response, index) => (
                          <div key={index} className="my-2  bg-gray-100 p-2">
                            <p className="text-lg font-bold mb-2 text-teal-700">
                              {response.question}:
                            </p>
                            <p className="mb-2">{response.answer.join(", ")}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* {selectedSurvey.status ? (
              selectedSurvey.command === "" ? (
                <div>
                  <textarea
                    className="w-full h-20 mb-4 p-2 border rounded resize-none"
                    placeholder="Enter your comment..."
                    value={commandText}
                    onChange={(e) => setCommandText(e.target.value)}
                  />
                  <button
                    className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded"
                    onClick={() => handleExecuteCommand()}
                  >
                    Submit Comment
                  </button>
                </div>
              ) : null
            ) : (
              "Not Filled Yet"
            )} */}
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Totalsurvey;

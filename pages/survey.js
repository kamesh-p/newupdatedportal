import React, { useState, useEffect } from "react";
import Totalsurvey from "./totalsurvey";
import { format } from "date-fns";
import Backup from "./Backup";
import ProtectedRoute from "../compoenets/protectedRoutes";

const Survey = () => {
  const [addButton, setAddButton] = useState(false);
  const [selected, setselected] = useState(null);
  const [questionText, setQuestionText] = useState("");
  const [title, settitle] = useState("");
  const [filtereddata, setData] = useState("");
  const [surveyData, setservey] = useState("");
  const [selecteduser, setselecteduser] = useState("");
  const [selecteduserid, setselecteduserid] = useState("");
  const [options, setOptions] = useState([""]);
  const [numberOfStars, setNumberOfStars] = useState(1);
  const [submittedValues, setSubmittedValues] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isDialog, setdialog] = useState(false);
  const [mentor, setmentor] = useState({});
  const [questionsVisible, setQuestionsVisible] = useState(false);
  const [activeLink, setActiveLink] = useState("Questions");
  const currentDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");

  const typesWithOptions = ["check box", "radio box", "text"];
  const typesWithStars = ["ratings"];

  const handleSelectedType = (selectedOption) => {
    setAddButton(true);
    setselected(selectedOption);
    setOptions([""]);
  };

  const handleQuestionTextChange = (e) => {
    setQuestionText(e.target.value);
  };

  const handleOptionTextChange = (index, e) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  const handleNumberOfStarsChange = (e) => {
    setNumberOfStars(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/servey/surveydata");
        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/servey/totalsurveydata");
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
  // const Handlebackup = async () => {
  //   // console.log("id", id);
  //   try {
  //     const response = await fetch("/api/servey/backupreturn", {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         id: id,
  //       }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("data", data);
  //     } else {
  //       console.error("Failed to fetch data:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const handleSubmit = () => {
    const submission = {
      type: selected,
      title: title,
      user: selecteduser,
      question: questionText,
      options: typesWithOptions.includes(selected) ? options : undefined,
      numberOfStars: typesWithStars.includes(selected)
        ? numberOfStars
        : undefined,
    };

    setSubmittedValues((prevValues) => [...prevValues, submission]);

    // Toggle the form
    //

    // Clear form inputs
    // setselected(null);
    setQuestionText("");
    setOptions([""]);
    setNumberOfStars(1);
  };

  const handleSubmitform = (e) => {
    e.preventDefault();
  };

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleselecteduser = (selected, id, mentor) => {
    setselecteduser(selected);
    setselecteduserid(id);
    setDropdownVisible(false);
    setmentor(mentor);
  };

  const handlesubmitedquestion = async () => {
    try {
      const response = await fetch("/api/surveyquestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          submittedValues,
          mentorid: mentor[0]?.id,
          mentor: mentor,
          user: selecteduser,
          title: title,
          status: false,
          userid: selecteduserid,
          command: "",
          responses: [],
          Formcreateddate: currentDate,
          Submitteddate: "",
          Feedbacktime: "",
          Backup: false,
        }),
      });

      if (response.ok) {
        console.log("New questions submitted successfully.");
      } else {
        console.error("Failed to submit new questions.");
      }
    } catch (error) {
      console.error("Error submitting new questions:", error.message);
    }
    setAddButton((prevAddButton) => !prevAddButton);
  };

  const handleLinkClick = (label) => {
    setActiveLink(label === activeLink ? "" : label);
  };
  const toggleQuestionsVisibility = () => {
    setQuestionsVisible(!questionsVisible);
  };
  return (
    <ProtectedRoute>
      <>
        <div className="flex mt-24">
          <div className="flex bg-gray-100 hover:bg-gray-200 rounded-lg transition p-2 dark:bg-gray-700 dark:hover:bg-gray-600">
            <nav className="flex space-x-2">
              <p
                className={`py-3 px-4 inline-flex items-center gap-2 text-sm text-gray-700 font-medium rounded-lg shadow-sm dark:bg-gray-800 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 ${
                  activeLink === "Questions" ? "bg-white active-link" : ""
                }`}
                onClick={() => handleLinkClick("Questions")}
              >
                Questions
              </p>
              <p
                className={`py-3 px-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 font-medium rounded-lg hover:hover:text-blue-600 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 ${
                  activeLink === "Users" ? "active-link bg-white" : ""
                }`}
                onClick={() => handleLinkClick("Users")}
              >
                Users
              </p>
              <p
                className={`py-3 px-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 font-medium rounded-lg hover:hover:text-blue-600 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 ${
                  activeLink === "Survey" ? "active-link bg-white" : ""
                }`}
                onClick={() => handleLinkClick("Survey")}
              >
                Survey
              </p>
            </nav>
          </div>
        </div>
        {activeLink === "Questions" && (
          <div className="mt-10">
            <div className=" flex ">
              <div className="">
                <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"></div>
                <div class="bg-gray-100 p-8 rounded-lg ">
                  <p class="text-md text-gray-800 mb-4">
                    Enhance team collaboration by using our intuitive survey
                    feature. Easily create and distribute surveys to gather
                    valuable insights from team members, fostering a more
                    informed and engaged work environment.
                  </p>
                  <div class="flex justify-end ">
                    <button
                      className="bg-teal-700 justify-end text-white py-3 px-6 rounded cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
                      onClick={() => {
                        setAddButton(!addButton);
                        setdialog(true);
                      }}
                    >
                      {addButton ? "Close Form" : "New Survey"}
                    </button>
                  </div>
                </div>
                {isDialog && (
                  <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-gray-500 opacity-75 blur"></div>
                    <div className="modal-container bg-white h-96 w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                      <div className="modal-content text-left ">
                        <div className=" items-center pb-3">
                          <div>
                            <form
                              onSubmit={handleSubmitform}
                              className="bg-white  p-6 w-full rounded-lg "
                            >
                              <button
                                className="modal-close cursor-pointer absolute top-16 right-80 mr-12 rounded-xl   text-white bg-red-500   hover:bg-red-700"
                                onClick={() => setdialog(false)}
                              >
                                <span className="text-3xl">×</span>
                              </button>
                              <h2 className="text-teal-700 font-bold my-5">
                                Select Your user and type :
                              </h2>
                              <label className="block mb-2 text-sm font-semibold text-gray-600">
                                Title:
                              </label>
                              <input
                                className="w-full px-4 py-2 mb-4 border rounded-md"
                                placeholder="Enter the title of the survey.."
                                type="text"
                                onChange={(e) => {
                                  settitle(e.target.value);
                                }}
                              />

                              <label className="block mb-2 text-sm font-semibold text-gray-600">
                                Select User:
                              </label>
                              <div className="relative">
                                <button
                                  className="w-36 text-black bg-gray-200 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-left"
                                  type="button"
                                  onClick={handleDropdownToggle}
                                >
                                  {selecteduser !== ""
                                    ? selecteduser
                                    : "Select the user"}
                                  <svg
                                    className="w-2.5 h-2.5 absolute top-5 left-32 transform -translate-y-1/2"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="m1 1 4 4 4-4"
                                    />
                                  </svg>
                                </button>
                                {dropdownVisible && (
                                  <div className="absolute top-full left-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                                    {filtereddata.map((e) => (
                                      <div key={e}>
                                        <ul className="py-2 text-sm text-gray-700">
                                          <li
                                            onClick={() =>
                                              handleselecteduser(
                                                e.name,
                                                e._id,
                                                e.mentor
                                              )
                                            }
                                          >
                                            <p className="block px-4 py-2 hover:bg-gray-100">
                                              {e.name}
                                            </p>
                                          </li>
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <label className="block my-5 text-sm font-semibold text-gray-600">
                                Survey Type:
                              </label>
                              <ul className="flex">
                                {[
                                  "check box",
                                  "radio box",
                                  "ratings",
                                  "text",
                                ].map((option) => (
                                  <div className="flex" key={option}>
                                    <li
                                      className="cursor-pointer mx-2 text-teal-700 bg-gray-200 p-1 hover:underline"
                                      onClick={() => handleSelectedType(option)}
                                    >
                                      {option}
                                    </li>
                                  </div>
                                ))}
                              </ul>
                              {submittedValues.length > 0 && (
                                <div className="ml-28 w-full justify-end">
                                  <button
                                    className="text-teal-700 my-5  w-full "
                                    onClick={toggleQuestionsVisibility}
                                  >
                                    {questionsVisible ? "Hide" : "Show"}
                                  </button>
                                </div>
                              )}

                              {questionsVisible && (
                                <ol className="list-decimal pl-6">
                                  <div className="grid grid-cols-3 gap-3">
                                    {submittedValues.map(
                                      (submission, index) => (
                                        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                                          <li key={index} className="mb-4">
                                            {/* <div className="font-bold  text-teal-700 text-lg mb-2">
                              Title {title}
                            </div> */}
                                            <div className="">
                                              <div className="font-medium mb-2">
                                                Question:
                                              </div>
                                              <div className="ml-4">
                                                {submission.question}
                                              </div>
                                              {submission.options !==
                                                undefined && (
                                                <>
                                                  <div className="font-medium mt-2">
                                                    Options:
                                                  </div>
                                                  <div className="ml-4">
                                                    {submission.options.join(
                                                      ", "
                                                    )}
                                                  </div>
                                                </>
                                              )}
                                              {submission.numberOfStars !==
                                                undefined && (
                                                <>
                                                  <div className="font-medium mt-2">
                                                    Number of Stars:
                                                  </div>
                                                  <div className="ml-4">
                                                    {submission.numberOfStars}
                                                  </div>
                                                </>
                                              )}
                                            </div>
                                          </li>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </ol>
                              )}

                              {selected && (
                                <div className="mt-6">
                                  <h2 className="text-teal-700 font-bold my-5">
                                    Type your {selected} question for the{" "}
                                    {selecteduser}:
                                  </h2>
                                  <label className="block my-5 text-sm font-semibold text-gray-600">
                                    Question
                                  </label>
                                  <input
                                    className="w-full px-4 py-2 border rounded-md"
                                    placeholder="Type your question here.."
                                    value={questionText}
                                    onChange={handleQuestionTextChange}
                                  />

                                  {typesWithOptions.includes(selected) && (
                                    <div>
                                      {options.map((option, index) => (
                                        <div key={index} className="mt-2 ">
                                          {selected === "text" ? null : (
                                            <>
                                              <input
                                                type={
                                                  selected === "check box"
                                                    ? "checkbox"
                                                    : "radio"
                                                }
                                                className="mr-2"
                                                checked={option === "checked"}
                                                onChange={(e) =>
                                                  handleOptionTextChange(
                                                    index,
                                                    e
                                                  )
                                                }
                                              />
                                              <input
                                                type="text"
                                                placeholder="Option text"
                                                className="my-3"
                                                value={option}
                                                onChange={(e) =>
                                                  handleOptionTextChange(
                                                    index,
                                                    e
                                                  )
                                                }
                                              />
                                            </>
                                          )}
                                        </div>
                                      ))}
                                      {selected !== "text" && (
                                        <button
                                          className="text-teal-700 my-5 underline "
                                          onClick={() =>
                                            setOptions([...options, ""])
                                          }
                                        >
                                          Add Option
                                        </button>
                                      )}
                                    </div>
                                  )}

                                  {typesWithStars.includes(selected) && (
                                    <div className="mt-2">
                                      <label
                                        htmlFor="numberOfStars"
                                        className="block mb-2 text-sm font-semibold text-gray-600"
                                      >
                                        Number of Stars:
                                      </label>
                                      <input
                                        id="numberOfStars"
                                        type="number"
                                        value={numberOfStars}
                                        onChange={handleNumberOfStarsChange}
                                        className="w-full px-4 py-2 border rounded-md"
                                      />
                                    </div>
                                  )}

                                  <button
                                    className="bg-gray-200 w-full text-black hover:bg-gray-300 hover:text-black py-3 px-6 rounded cursor-pointer mt-2"
                                    onClick={handleSubmit}
                                  >
                                    Add Questions
                                  </button>
                                  <div className="">
                                    <button
                                      className="bg-teal-500 w-full  hover:bg-teal-700 text-white py-3 px-6 rounded cursor-pointer mt-2"
                                      onClick={handlesubmitedquestion}
                                    >
                                      Submit questions
                                    </button>
                                  </div>
                                </div>
                              )}
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {activeLink === "Users" && <Totalsurvey surveyData={surveyData} />}
        {activeLink === "Survey" && <Backup />}
      </>
    </ProtectedRoute>
  );
};

export default Survey;

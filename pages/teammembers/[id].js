import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import clientPromise from "../../lib/mongodb";
import { useRouter } from "next/router";
import Teammembersproject from "../teammemberproject";

import RatingStars from "react-rating-stars-component";

import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";

import Link from "next/link";
const Teammemberdashboard = ({ projectquestion }) => {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  // const loggined = user.user.user.id;

  // console.log("question", filtersurvey);

  // fetch data state
  const [meetingdata, setmeetingData] = useState([]);
  const [projectdata, setprojectData] = useState([]);
  // const [formdata, setformtData] = useState([]);
  const [surveydata, setserveyData] = useState([]);
  const [userdata, setusers] = useState([]);
  // console.log("surveydata", surveydata[0].status);
  // console.log("user", userdata.servey);
  //

  const [isModalOpen, setIsModalOpen] = useState(false);

  // const [isreview, setreview] = useState(false);

  const [isprojectreview, setprojectreview] = useState(false);
  const [formDataproject, setFormDataproject] = useState({});

  const handleAnswerChange = (questionLabel, answer) => {
    setFormDataproject((prevData) => ({
      ...prevData,
      [questionLabel]: answer,
    }));
    console.log("form", formDataproject);
  };

  // const loggedInUserDetails = Users.find(
  //   (member) => member.userId === loggined
  // );

  // const handledialog = () => {
  //   // setreview(true);
  // };
  const currentDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");

  const email = user?.user?.user?.email;
  const id = user?.user?.user?.id;
  const name = user?.user?.user?.name;

  const mentor = user?.user?.user?.mentor;

  // console.log("SSs", mentor);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/teammembers/form");
        if (response.ok) {
          const data = await response.json();

          console.log("Fetched formsurvey data:", data);
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
        const response = await fetch(`/api/teammembers/users?id=${id}`);
        if (response.ok) {
          const data = await response.json();

          console.log("Fetched formsurvey data:", data);
          setusers(data);
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
        const response = await fetch("/api/teammembers/projectdetails");
        if (response.ok) {
          const data = await response.json();

          console.log("Fetched project data:", data);
          setprojectData(data);
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [projectdata]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/teammembers/questionssurvey?id=${id}`
        );
        if (response.ok) {
          const data = await response.json();

          setserveyData(data);
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [surveydata, userdata.servey]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("/api/teammembers/question");
  //       if (response.ok) {
  //         const data = await response.json();

  //         //////////console.log("Fetched data:", data);
  //       } else {
  //         console.error("Failed to fetch data:", response.statusText);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  //meeting section

  const meetingcount = meetingdata.length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/teammembers/meetingsdata?id=${id}`);
        if (response.ok) {
          const data = await response.json();

          setmeetingData(data);
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [meetingdata]);

  // let reviewdetails = Users.filter((review) => {
  //   return review.user.user.user.name === name;
  // });
  // let reviewcommand = reviewdetails[0]?.command;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // const [formData, setFormData] = useState({});
  const [responses, setResponses] = useState([]);

  const HandleAnswerSubmit = async (e, projectTitle) => {
    e.preventDefault();
    // //////////console.log("forms::", formDataproject);
    // //////////console.log("forms::", projectTitle);
    setprojectreview(false);

    try {
      const response = await fetch("/api/updateAnswer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formDataproject,
          name,
          projectTitle,
          mentor,
        }),
      });

      if (response.ok) {
        //console.log("Form submitted successfully!");
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };
  const [selectedProjectTitle, setSelectedProjectTitle] = useState("");
  const [isUsersAccordionOpen, setUsersAccordionOpen] = useState(false);
  const [isprojectAccordionOpen, setprojectAccordionOpen] = useState(false);

  const handleProjectClick = (title) => {
    setSelectedProjectTitle(title);

    setprojectreview(true);
  };

  const handleSubmit = async (surveyid) => {
    // e.preventDefault();
    //////////console.log("formmmm", formData);
    // console.log("id", id);
    let Submitteddate = currentDate;
    try {
      // const formDataWithUserId = {
      //   ...formData,
      //   user: user,
      //   userId: id,
      //   command: "",
      //   responses: responses,
      //   mentor: mentor,
      //   mentorid: mentorid,

      // };

      //////////console.log("formDataWithUserId:", formDataWithUserId);

      const response = await fetch("/api/new-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          responses,
          surveyid,
          Submitteddate,
        }),
      });

      if (response.ok) {
        //////////console.log("Form submitted successfully!");
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
    setIsModalOpen(false);
  };
  //////////console.log("user", user);

  const projectsurvey = projectquestion.filter((question) => {
    return (
      question.trainee.some((trainee) => trainee.id === id) &&
      question.title === selectedProjectTitle
    );
  });

  // console.log("pr", projectquestion);
  const handleleave = () => {
    router.push({
      pathname: "/leavecalender",
      query: {
        user: id,
        username: name,
        mentor: JSON.stringify(mentor),
      },
    });
  };
  const handletimesheet = () => {
    router.push({
      pathname: "/timesheet",
      query: {
        user: name,
        mentor: mentor,
        userid: id,
      },
    });
  };
  const handlechangepassword = () => {
    router.push({
      pathname: "/changepassword",
      query: {
        user: name,
        mentor: mentor,
        userid: id,
      },
    });
  };

  const handleChange = (event, question) => {
    const { value, type, checked } = event.target;

    setResponses((prevResponses) => {
      let questionResponse = prevResponses.find(
        (response) => response.question === question
      );

      if (!questionResponse) {
        questionResponse = { question, answer: [] };
        prevResponses.push(questionResponse);
      }

      if (type === "checkbox") {
        if (checked) {
          questionResponse.answer.push(value);
        } else {
          questionResponse.answer = questionResponse.answer.filter(
            (v) => v !== value
          );
        }
      } else {
        questionResponse.answer = [value];
      }

      return prevResponses;
    });
  };
  const toggleUsersAccordion = () => {
    setUsersAccordionOpen(!isUsersAccordionOpen);
  };
  const toggleProjectAccordion = () => {
    setprojectAccordionOpen(!isprojectAccordionOpen);
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-4 text-center  text-teal-700">
        Teammember Dashboard
      </h1>
      <div className=" ">
        {/* <div className="w-1/5  ml-5 mt-5 ">
          {email && name && (
            <div className="bg-gray-200 p-4 text-black">
              <h2 className="text-center text-teal-700 text-xl mb-5 font-extrabold">
                PERSONAL INFO
              </h2>
              <span className="font-bold text-black ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 inline-block mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 13c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
                  />
                </svg>
              </span>
              <span className="text-black">{name}</span> <br />
              <br />
              <span className="font-bold  text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 inline-block mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 3l7 7L19 3"
                  />
                </svg>
              </span>
              <span className="text-black">{email}</span> <br /> <br />
              <span className="font-bold  text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 inline-block mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 21l-7-7M19 21l-7-7m7 7H5M6 3h14a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z"
                  />
                </svg>
              </span>
              <span className="text-black">{Role}</span> <br />
            </div>
          )}
          <div className="h-full   bg-gray-200">
            <h2 className="text-teal-700 font-extrabold text-center text-xl px-10 pt-10">
              DETAILS
            </h2>
            <br />
            <ul className="list-none text-black px-6">
              <li className="text-lg text-black mb-5">Dashboard 📊</li>
              <br />
              <li className="text-lg text-black mb-5">Review</li>
              <br />

              <li className="text-lg text-black mb-5 cursor-pointer">
                Meeting{" "}
                <sup className="bg-red-700 text-white p-0.5 rounded-full">
                  {meetingcount}
                </sup>
              </li>
              <br />

              <li
                className="text-lg text-black mb-5 cursor-pointer"
                onClick={handleleave}
              >
                Leave 🗓️
              </li>
              <li
                className="text-lg text-black mb-5 mt-10 cursor-pointer"
                onClick={handletimesheet}
              >
                Timesheet 🗓️
              </li>
              <li
                className="text-lg text-black mb-5 mt-10 cursor-pointer"
                onClick={handlechangepassword}
              >
                Changepassword
              </li>
              <br />
              <Link href="/chat">
                <li className="text-lg text-black mb-5">Messages 💬</li>
              </Link>
              <br />
            </ul>
          </div>
        </div> */}
        <div
          id="docs-sidebar"
          className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0  w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700 mt-20"
        >
          <span className="my-5 w-full mx-10 font-extrabold text-teal-700 text-xl">
            TEAMMEMBER
          </span>
          <nav
            className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
            data-hs-accordion-always-open
          >
            <ul className="space-y-1.5">
              <li className="hs-accordion" id="users-accordion">
                <button
                  type="button"
                  onClick={toggleUsersAccordion}
                  className="hs-accordion-toggle my-2 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  About
                  <svg
                    className="hs-accordion-active:block ms-auto hidden w-4 h-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="m18 15-6-6-6 6" />
                  </svg>
                  <svg
                    className="hs-accordion-active:hidden ms-auto block w-4 h-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    ></path>
                  </svg>
                </button>

                <div
                  id="users-accordion"
                  className={`hs-accordion-content w-full overflow-hidden transition-all duration-300 ${
                    isUsersAccordionOpen ? "block" : "hidden"
                  }`}
                >
                  <ul
                    className="hs-accordion-group ps-3 pt-2"
                    data-hs-accordion-always-open
                  >
                    <div className="px-6 bg-gray-100">
                      <p className="mb-2  font-semibold">{name}</p>
                      <p className="text-sm text-gray-600">{email}</p>
                      {/* <p className="text-sm text-gray-600">{type}</p> */}
                    </div>
                  </ul>
                </div>
              </li>

              {/* <Link href="/survey">
                <li>
                  <p className="flex  items-center gap-x-3.5 py-2 px-2.5  text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                    Survey
                    {surveydata.length > 0 && (
                      <sup className="text-md p-1 py-2  text-white font-extrabold bg-teal-500 rounded-lg">
                        {surveydata.length}
                      </sup>
                    )}
                  </p>
                </li>
              </Link> */}
              <li>
                <p className="flex my-2 items-center gap-x-3.5 py-2 px-2.5  text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                    <path d="M8 14h.01" />
                    <path d="M12 14h.01" />
                    <path d="M16 14h.01" />
                    <path d="M8 18h.01" />
                    <path d="M12 18h.01" />
                    <path d="M16 18h.01" />
                  </svg>
                  Meeting 🗓️
                  {meetingcount > 0 && (
                    <sup className="text-md p-1 py-2  text-white font-extrabold bg-teal-500 rounded-lg">
                      {meetingcount}
                    </sup>
                  )}
                </p>
              </li>

              <li className="hs-accordion" id="projects-accordion">
                <button
                  type="button"
                  onClick={toggleProjectAccordion}
                  className="hs-accordion-toggle my-2 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  <svg
                    className="w-4 h-4"
                    xmlns="ƒhttp://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z" />
                    <path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8" />
                    <path d="M15 2v5h5" />
                  </svg>
                  Actions
                  <svg
                    className="hs-accordion-active:block ms-auto hidden w-4 h-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="m18 15-6-6-6 6" />
                  </svg>
                  <svg
                    className="hs-accordion-active:hidden ms-auto block w-4 h-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    ></path>
                  </svg>
                </button>

                <div
                  id="projects-accordion"
                  className={`hs-accordion-content w-full overflow-hidden transition-all duration-300 ${
                    isprojectAccordionOpen ? "block" : "hidden"
                  }`}
                >
                  <ul className="pt-2 ps-2">
                    <li onClick={handletimesheet}>
                      <p className="flex my-2 items-center gap-x-3.5 py-2 px-2.5  text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        <svg
                          className="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <rect
                            width="18"
                            height="18"
                            x="3"
                            y="4"
                            rx="2"
                            ry="2"
                          />
                          <line x1="16" x2="16" y1="2" y2="6" />
                          <line x1="8" x2="8" y1="2" y2="6" />
                          <line x1="3" x2="21" y1="10" y2="10" />
                          <path d="M8 14h.01" />
                          <path d="M12 14h.01" />
                          <path d="M16 14h.01" />
                          <path d="M8 18h.01" />
                          <path d="M12 18h.01" />
                          <path d="M16 18h.01" />
                        </svg>
                        Timesheet 🗓️
                      </p>
                    </li>
                    <li onClick={handleleave}>
                      <p className="flex my-2 items-center gap-x-3.5 py-2 px-2.5  text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        <svg
                          className="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <rect
                            width="18"
                            height="18"
                            x="3"
                            y="4"
                            rx="2"
                            ry="2"
                          />
                          <line x1="16" x2="16" y1="2" y2="6" />
                          <line x1="8" x2="8" y1="2" y2="6" />
                          <line x1="3" x2="21" y1="10" y2="10" />
                          <path d="M8 14h.01" />
                          <path d="M12 14h.01" />
                          <path d="M16 14h.01" />
                          <path d="M8 18h.01" />
                          <path d="M12 18h.01" />
                          <path d="M16 18h.01" />
                        </svg>
                        Leave 🗓️
                      </p>
                    </li>
                  </ul>
                </div>
              </li>

              <li onClick={handlechangepassword}>
                <p className="flex my-2 items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                    <path d="M8 14h.01" />
                    <path d="M12 14h.01" />
                    <path d="M16 14h.01" />
                    <path d="M8 18h.01" />
                    <path d="M12 18h.01" />
                    <path d="M16 18h.01" />
                  </svg>
                  Change Password
                </p>
              </li>

              <Link href="/chat">
                <li>
                  <p className="flex my-2 items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                    Message
                  </p>
                </li>
              </Link>
            </ul>
          </nav>
        </div>

        <div className="flex-1 w-3/4 ml-64 mt-20 px-8">
          <div className="bg-white px-8 h-20 rounded shadow-md w-full">
            <div className="bg-gray-200 p-4 rounded-lg flex items-center justify-between">
              <div className="text-lg">
                {/* {surveydata[0]?.status ? (
                  <>
                    <div className="flex">
                      <div>
                        <p>You've already filled the survey. Thank you!</p>
                        <p className="text-blue-500 cursor-pointer underline">
                          Click to see the review
                        </p>
                      </div>
                      <div>
                        <button
                          className="ml-40 bg-teal-700 p-2 text-white px-2 py-1 rounded"
                          onClick={handledialog}
                        >
                          Review
                        </button>
                      </div>
                    </div>
                    {isreview && (
                      <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-gray-500 opacity-75 blur"></div>
                        <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                          <div className="modal-content py-4 text-left px-6">
                            <div className="flex justify-between items-center pb-3">
                              <p className="text-2xl font-bold">
                                {reviewcommand !== ""
                                  ? reviewcommand
                                  : "No command"}
                              </p>
                              <button
                                className="modal-close cursor-pointer relative -top-7 -right-6 z-50 text-white bg-red-500   hover:bg-red-700"
                                onClick={() => setreview(false)}
                              >
                                <span className="text-3xl">×</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div>
                    <div>
                      <p className="text-blue-500 cursor-pointer underline">
                        Click Survey to fill
                      </p>
                    </div>
                    <div className="flex">
                      <p>
                        Haven't filled the survey yet? Let us know your
                        thoughts!
                      </p>
                      <button
                        onClick={toggleModal}
                        className="bg-teal-700 text-white text-base ml-10  px-2 py-1 rounded-full"
                      >
                        Fill Survey
                      </button>
                    </div>
                  </div>
                )} */}
                {surveydata.length === 0 && <p>No survey to be filled.</p>}
                {surveydata.length > 0 && (
                  <div>
                    <div className="flex">
                      <p>
                        Haven't filled the survey yet? Let us know your
                        thoughts!
                      </p>
                      <button
                        onClick={toggleModal}
                        className="bg-teal-700 text-white text-base ml-10  px-2 py-1 rounded-full"
                      >
                        Fill Survey
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* {!servey && (
              )} */}
            </div>
            {/* {isDialog && (
              <>
                <div className="fixed top-0 right-0 left-0 z-50 overflow-y-auto overflow-x-hidden hidden md:flex md:items-center md:justify-center ml-64 w-full h-[calc(100%-1rem)] max-h-full">
                  <div className="fixed inset-0 backdrop-blur bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-2xl max-h-full bg-opacity-80 ml-56 mt-20 bg-white dark:bg-gray-700">
                      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Terms of Service
                        </h3>
                        <button
                          type="button"
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                          data-modal-hide="default-modal"
                          onClick={handleclose}
                        >
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                          </svg>
                          <span className="sr-only">Close modal</span>
                        </button>
                      </div>

                      <div>
                        {survey.map((s) => {
                          <div>{s.text}</div>;
                        })}
                      </div>
                      <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                          data-modal-hide="default-modal"
                          type="button"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          I accept
                        </button>
                        <button
                          data-modal-hide="default-modal"
                          type="button"
                          className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )} */}

            {isModalOpen && (
              <div
                id="default-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center"
              >
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h2>Survey</h2>
                      <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={toggleModal}
                      >
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>

                    <div className="p-4 md:p-5 space-y-4">
                      <div>
                        {surveydata.map((survey, surveyIndex) => (
                          <>
                            <div key={surveyIndex} className="mb-8">
                              <p className="mb-4 text-black">{survey.title}</p>
                              {survey.questions.map(
                                (question, questionIndex) => (
                                  <div key={questionIndex} className="mb-4">
                                    <p>{question.question}</p>
                                    {question.type === "text" ? (
                                      <input
                                        type="text"
                                        name={`response-${question}`}
                                        className="border rounded px-3 py-2 mt-1"
                                        onChange={(e) =>
                                          handleChange(e, question.question)
                                        }
                                      />
                                    ) : question.type === "radio box" ? (
                                      question.options.map(
                                        (option, optionIndex) => (
                                          <div
                                            key={optionIndex}
                                            className="flex items-center"
                                          >
                                            <input
                                              type="radio"
                                              id={`option-${question}-${optionIndex}`}
                                              name={`response-${question}`}
                                              value={option}
                                              onChange={(e) =>
                                                handleChange(
                                                  e,
                                                  question.question
                                                )
                                              }
                                              className="mr-2"
                                            />
                                            <label
                                              htmlFor={`option-${question}-${optionIndex}`}
                                            >
                                              {option}
                                            </label>
                                          </div>
                                        )
                                      )
                                    ) : question.type === "check box" ? (
                                      question.options.map(
                                        (option, optionIndex) => (
                                          <div
                                            key={optionIndex}
                                            className="flex items-center"
                                          >
                                            <input
                                              type="checkbox"
                                              id={`option-${question}-${optionIndex}`}
                                              name={`response-${question}`}
                                              value={option}
                                              onChange={(e) =>
                                                handleChange(
                                                  e,
                                                  question.question
                                                )
                                              }
                                              className="mr-2"
                                            />
                                            <label
                                              htmlFor={`option-${question}-${optionIndex}`}
                                            >
                                              {option}
                                            </label>
                                          </div>
                                        )
                                      )
                                    ) : question.type === "ratings" ? (
                                      <RatingStars
                                        count={5} // You can adjust the number of stars
                                        value={
                                          responses[`response-${questionIndex}`]
                                        }
                                        onChange={(value) =>
                                          handleChange(
                                            {
                                              target: {
                                                name: `response-${questionIndex}`,
                                                value,
                                              },
                                            },
                                            question.question
                                          )
                                        }
                                      />
                                    ) : null}
                                  </div>
                                )
                              )}
                            </div>

                            <button
                              type="submit"
                              className="bg-teal-500 text-white px-4 py-2 w-full my-10 rounded hover:bg-teal-700"
                              onClick={() => handleSubmit(survey._id)}
                            >
                              Submit
                            </button>
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="container mx-auto bg-white shadow-md rounded-md p-6 mt-10">
            <h2 className="text-2xl font-extrabold text-center text-teal-700 mb-4">
              Project Details
            </h2>
            <p className="text-gray-600 my-5">
              Welcome to the project survey section! Here, you'll find surveys
              sent by your mentors that are associated with various projects.
              Explore and provide your valuable feedback to contribute to the
              success of each project.
            </p>

            <div className="flex flex-wrap">
              {projectquestion.map((e) => (
                <div key={e._id} className="w-1/3 p-2">
                  <button
                    className="text-white bg-teal-700 py-2 px-4  rounded-lg mt-4 w-full"
                    onClick={() => handleProjectClick(e.title)}
                  >
                    {e.title}
                  </button>
                </div>
              ))}
            </div>
          </div>
          {isprojectreview && (
            <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gray-500 opacity-75 blur"></div>
              <div className="modal-container h-80 bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div className="modal-content py-4 text-left px-6">
                  <div className="justify-between items-center pb-3 w-full">
                    {projectsurvey.map((project) => (
                      <div key={project._id}>
                        <h2 className="text-center mb-5 text-xl font-semibold">
                          {project.title}
                        </h2>
                        {project.questions.map((e, index) => (
                          <div key={index} className="mb-4">
                            <label className="block text-sm text-gray-700 mb-1">
                              {e}:
                            </label>
                            <input
                              type="text"
                              className="form-input w-full h-12 px-4 border rounded-md text-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              onChange={(event) =>
                                handleAnswerChange(e, event.target.value)
                              }
                            />
                          </div>
                        ))}

                        <button
                          className="bg-teal-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-teal-600"
                          onClick={(event) =>
                            HandleAnswerSubmit(event, project.title)
                          }
                        >
                          <span className="w-full">Submit</span>
                        </button>
                        <button
                          className="modal-close cursor-pointer   bg-red-500 p-2 mx-10 rounded-lg text-white"
                          onClick={() => setprojectreview(false)}
                        >
                          <span className="w-full">Cancel</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <Teammembersproject projects={projectdata} userid={id} />
        </div>
      </div>
    </div>
  );
};
export async function getServerSideProps() {
  try {
    const client = await clientPromise;

    const db = client.db("form");
    const dbs = client.db("Meetings");
    const projects = client.db("projects");
    const question = client.db("questionssurvey");
    const projectsurvey = client.db("questions");
    const product = await db.collection("members").find({}).limit(20).toArray();
    const products = await dbs
      .collection("events")
      .find({})
      .limit(20)
      .toArray();
    const projectsdetails = await projects
      .collection("details")
      .find({})
      .limit(20)
      .toArray();
    const survey = await question
      .collection("survey")
      .find({})
      .limit(20)
      .toArray();
    const projectquestions = await projectsurvey
      .collection("project")
      .find({})
      .limit(20)
      .toArray();

    return {
      props: {
        Users: JSON.parse(JSON.stringify(product)),
        forms: JSON.parse(JSON.stringify(products)),
        projects: JSON.parse(JSON.stringify(projectsdetails)),
        survey: JSON.parse(JSON.stringify(survey)),
        projectquestion: JSON.parse(JSON.stringify(projectquestions)),
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { Users: [] },
    };
  }
}

export default Teammemberdashboard;

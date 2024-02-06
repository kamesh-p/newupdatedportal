// Hr.js
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Hierachy from "./Hierachy";
import Employees from "./Employees";
import Surveylist from "./Surveylist";
import clientPromise from "../lib/mongodb";
import { useRouter } from "next/router";
import ProtectedRoute from "../compoenets/protectedRoutes";

const Hr = ({ Employeesdetails, form }) => {
  const userLoggedIn = useSelector((state) => state.user);
  const name = userLoggedIn?.user?.user?.name;
  const type = userLoggedIn?.user?.user?.type;
  const email = userLoggedIn?.user?.user?.email;
  const id = userLoggedIn?.user?.user?.id;

  console.log("empllll", userLoggedIn);
  const [activeTab, setActiveTab] = useState("Employees");
  const [isUsersAccordionOpen, setUsersAccordionOpen] = useState(false);
  const [isprojectAccordionOpen, setprojectAccordionOpen] = useState(false);

  // Function to toggle the visibility of the "Users" section
  const toggleUsersAccordion = () => {
    setUsersAccordionOpen(!isUsersAccordionOpen);
  };
  const toggleProjectAccordion = () => {
    setprojectAccordionOpen(!isprojectAccordionOpen);
  };
  const router = useRouter();
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handlechangepassword = () => {
    router.push({
      pathname: "/changepassword",
      query: {
        user: name,
        email: email,
        userid: id,
      },
    });
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case "Employees":
        return <Employees Employeesdetails={Employeesdetails} />;
      case "Hierachy":
        return <Hierachy Employeesdetails={Employeesdetails} />;
      case "Surveylist":
        return <Surveylist form={form} />;

      default:
        return null;
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex">
        <div
          id="docs-sidebar"
          className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0  w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700 mt-20"
        >
          <span className="my-5 w-full mx-10 font-extrabold text-teal-700 text-xl">
            HR PORTAL
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
                      <p className="text-sm text-gray-600">{type}</p>
                    </div>
                  </ul>
                </div>
              </li>
              <Link href="/register">
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
                      <circle cx="18" cy="15" r="3" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M10 15H6a4 4 0 0 0-4 4v2" />
                      <path d="m21.7 16.4-.9-.3" />
                      <path d="m15.2 13.9-.9-.3" />
                      <path d="m16.6 18.7.3-.9" />
                      <path d="m19.1 12.2.3-.9" />
                      <path d="m19.6 18.7-.4-1" />
                      <path d="m16.8 12.3-.4-1" />
                      <path d="m14.3 16.6 1-.4" />
                      <path d="m20.7 13.8 1-.4" />
                    </svg>
                    Register
                  </p>
                </li>
              </Link>
              <Link href="/survey">
                <li>
                  <p
                    className="flex  items-center gap-x-3.5 py-2 px-2.5  text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    href="#"
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
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                    Survey
                  </p>
                </li>
              </Link>

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
                  Projects
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
                    <Link href="/projectonboarding">
                      <li>
                        <p className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                          Project Onboarding
                        </p>
                      </li>
                    </Link>
                    <Link href="/companyprojects">
                      <li>
                        <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                          Project Details
                        </a>
                      </li>
                    </Link>
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

        <div className="w-full mt-20 ml-64">
          <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
              <li className="me-2">
                <a
                  onClick={() => handleTabClick("Employees")}
                  className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg ${
                    activeTab === "Employees"
                      ? "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                      : ""
                  }`}
                >
                  Employees
                </a>
              </li>
              <li className="me-2">
                <a
                  onClick={() => handleTabClick("Hierachy")}
                  className={`inline-block p-4 border-b-2 ${
                    activeTab === "Hierachy"
                      ? "text-blue-600 border-blue-600 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                      : ""
                  }`}
                  aria-current={activeTab === "Hierachy" ? "page" : undefined}
                >
                  Hierachy
                </a>
              </li>
            </ul>
          </div>
          {renderTabContent()}
        </div>
      </div>
    </ProtectedRoute>
  );
};
export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const form = client.db("form");

    const product = await db.collection("users").find({}).toArray();
    const formdb = await form.collection("members").find({}).toArray();

    return {
      props: {
        Employeesdetails: JSON.parse(JSON.stringify(product)),
        form: JSON.parse(JSON.stringify(formdb)),
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { Employeesdetails: [] },
    };
  }
}
export default Hr;

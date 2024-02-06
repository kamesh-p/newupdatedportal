import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import clientPromise from "../lib/mongodb";

const SidebarComponent = ({ user }) => {
  const [chatmess, setchatmess] = useState("");
  const userLoggedIn = useSelector((state) => state.user);
  const name = userLoggedIn?.user?.user?.name;
  const Id = userLoggedIn?.user?.user?.id;

  const [message, setMessage] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState({
    sendid: "",
    receiveid: "",
    chatMessages: "",
    timestamp: "",
  });
  // console.log("searchresult", newMessage);
  useEffect(() => {
    // Load the selected user from localStorage on component mount
    const storedUser = localStorage.getItem("selectedUser");
    if (storedUser) {
      setSelectedUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSendMessage = async () => {
    if (message.trim() !== "") {
      setMessage("");
    }

    try {
      const timestamp = new Date().toISOString();
      const response = await fetch("/api/chatMessages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatMessages: message,
          sendid: Id,
          receiveid: selectedUser?._id,
          timestamp: timestamp,
        }),
      });

      if (response.ok) {
        console.log("New questions submitted successfully.");

        setNewMessage({
          sendid: Id,
          receiveid: selectedUser?._id,
          chatMessages: message,
          timestamp: timestamp,
        });
        // window.location.reload();
      } else {
        console.error("Failed to submit new questions.");
      }
    } catch (error) {
      console.error("Error submitting new questions:", error.message);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    console.log("search", searchTerm.length);

    const results = user.filter((userData) =>
      userData.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (searchTerm.length === 0) {
      return setSearchResults([]);
    }

    setSearchResults(results);
  };

  const handleSelectUser = (selectedUserData) => {
    setSelectedUser(selectedUserData);
    localStorage.setItem("selectedUser", JSON.stringify(selectedUserData));
  };

  const sortedChat = [...chatmess].sort((a, b) => {
    return new Date(a.timestamp) - new Date(b.timestamp);
  });

  const filtersendchat = sortedChat.filter((e) => {
    return e.sendid === Id && e.receiveid === selectedUser?._id;
  });

  const filterreceivechat = sortedChat.filter((e) => {
    return e.sendid === selectedUser?._id && e.receiveid === Id;
  });

  const combinedChat = [...filtersendchat, ...filterreceivechat];
  const sortedChatuser = [...combinedChat].sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  const filtersendchatuser = sortedChat.filter((e) => {
    return e.sendid === Id;
  });

  const uniqueReceivedNamesSet = new Set();
  filtersendchatuser.forEach((e) => {
    const receivedUser = user.find((u) => u._id === e.receiveid);
    if (receivedUser) {
      uniqueReceivedNamesSet.add(receivedUser);
    }
  });

  const uniqueReceived = Array.from(uniqueReceivedNamesSet);
  // const [recent, setrecent] = useState(null);

  // const Handlerecent = (user) => {
  //   setSelectedUser((prevUser) => (prevUser === user ? null : user));
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/chatmessage/usechatApi");
        if (response.ok) {
          const data = await response.json();

          setchatmess(data);
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [newMessage, chatmess]);

  return (
    <div className="flex h-screen">
      <div className="bg-gray-200 w-full p-4 fixed top-0 bottom-0 right-0">
        <header className="border-b-2 border-gray-100">
          <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
              <span className="text-teal-700 font-extrabold  text-xl">
                {" "}
                PORTAL{" "}
              </span>
              <div className="flex items-center lg:order-2">
                {/* <a className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                  User
                </a> */}

                <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <svg
                    class="absolute w-12 h-12 text-gray-400 -left-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>

                <button
                  data-collapse-toggle="mobile-menu-2"
                  type="button"
                  className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="mobile-menu-2"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <svg
                    className="hidden w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div
                className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                id="mobile-menu-2"
              >
                <form className="flex  items-center my-2 justify-center">
                  <div className="relative w-60 ">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                      placeholder="Search user..."
                      onChange={handleSearch}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="p-2.5 ms-2 text-sm font-medium text-white bg-teal-700 rounded-lg border border-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                    <span className="sr-only">Search</span>
                  </button>
                </form>
                {searchResults.length > 0 && (
                  <div className="mt-5 ml-20 p-2  absolute top-14 left-96 border-gray-300 bg-gray-100 h-max z-30 w-60 mx-auto pt-4">
                    {/* <p className="text-gray-700 font-medium mb-2">
                    Search Results:
                  </p> */}
                    <div className="">
                      {searchResults.map((result, index) => (
                        <div key={index}>
                          <div
                            className="flex flex-row  justify-center items-center border-b-2"
                            onClick={() => handleSelectUser(result)}
                          >
                            <div className="w-1/4">
                              <img
                                src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                                className="object-cover h-12 w-12 rounded-full"
                                alt=""
                              />
                            </div>
                            <div className="w-full">
                              <div className=" font-normal text-sm ml-5">
                                {result.name}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </header>
        <div className="flex flex-col h-full">
          <div className="flex h-full">
            <div className="w-1/4 h-full bg-white p-4 mt-2 overflow-y-auto border-r border-gray-300">
              {/* <p className="text-teal-700 text-2xl font-extrabold text-center my-5">
                Chat History
              </p> */}

              {/* Search Results */}

              {/* Recent Send Section */}
              <div className="mt-4">
                {/* <p className="text-gray-700 font-medium mb-2">Personal user</p> */}
                <div
                  className="flex flex-row py-1 cursor-pointer px-2 justify-center items-center border-b-2"
                  onClick={() => handleSelectUser({ name })}
                >
                  <div className="w-1/4">
                    <img
                      src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                      className="object-cover h-12 w-12 rounded-full"
                      alt=""
                    />
                  </div>
                  <div className="w-full">
                    <div className=" font-semibold text-sm">{name}</div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-700 font-medium mb-2">Recent send:</p>
                {uniqueReceived.map((e) => (
                  <div key={e._id}>
                    <div
                      className="flex flex-row py-2
                       px-2 justify-center items-center border-b-2 "
                      onClick={() => handleSelectUser(e)}
                    >
                      <div className="w-1/4">
                        <img
                          src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                          className="object-cover h-12 w-12 rounded-full"
                          alt=""
                        />
                      </div>
                      <div className="w-full">
                        <div className="text-sm font-semibold">{e.name}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Box */}
            <div className="flex-1 bg-white p-4 ml-1 mt-2 overflow-y-auto">
              <div className="font-bold text-teal-700  text-md mb-7 w-full   py-2 border-teal-800">
                <div className="flex flex-row py-1 px-2 justify-center items-center border-b-2">
                  <div className="">
                    <img
                      src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                      className="object-cover h-12 w-12 rounded-full"
                      alt=""
                    />
                  </div>
                  <div className="w-full">
                    <p className="ml-5">
                      {selectedUser
                        ? ` ${selectedUser.name}`
                        : "Select a user to chat"}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="flex-1 overflow-y-auto h-64 mb-4"
                style={{ overflowX: "hidden" }}
              >
                {sortedChatuser?.map((e) => (
                  <div
                    key={e._id}
                    className={`${
                      e.sendid === Id
                        ? "text-right text-green-500"
                        : "text-left text-blue-500"
                    } mb-2`}
                  >
                    <div
                      className={`${
                        e.sendid === Id ? "bg-green-200" : "bg-blue-200"
                      } p-2 rounded-lg text-sm
                       inline-block`}
                    >
                      {e.chatMessages} -{" "}
                      {new Date(e.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex absolute w-3/5 bottom-1 items-center mt-4">
                <input
                  type="text"
                  placeholder="Type your message"
                  className="border w-full p-3 flex-1 rounded-l"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  className="bg-teal-500 w-40 text-white p-3 rounded-r"
                  onClick={handleSendMessage}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const messages = client.db("chat");

    const product = await db.collection("users").find({}).toArray();
    const chat = await messages.collection("messages").find({}).toArray();

    return {
      props: {
        user: JSON.parse(JSON.stringify(product)),
        chat: JSON.parse(JSON.stringify(chat)),
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { user: [] },
    };
  }
}

export default SidebarComponent;

// pages/leaverequest.js
import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

const Leaverequest = () => {
  const router = useRouter();
  const { user, id } = router.query;
  const [leave, setleave] = useState([]);
  const leaveRequests = leave;
  console.log("leave", leaveRequests);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/teamlead/leavescheduled?id=${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched data:", data);
          setleave(data);
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [leave]);

  const handleAccept = async (id) => {
    console.log("id", id);
    try {
      const response = await fetch("/api/accept", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
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

  const handleDelete = async (id) => {
    console.log("id", id);
    try {
      const response = await fetch("/api/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
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

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-teal-700 text-center text-2xl font-extrabold mb-10">
        Leave Requests for {user}
      </h1>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Start Date</th>
            <th className="py-2 px-4 border">End Date</th>
            <th className="py-2 px-4 border">Name</th>

            <th className="py-2 px-4 border">Reason</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((request, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              <td className="py-2 px-4 border">
                {new Date(request.newEvent.start).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border">
                {new Date(request.newEvent.end).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border">{request.username}</td>
              <td className="py-2 px-4 border">{request.newEvent.reason}</td>
              <td className="py-2 px-4 border">
                {request.status ? "Approved" : "Pending"}
              </td>
              {!request.status && (
                <td className="py-2 px-4 border">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleAccept(request._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(request._id)}
                  >
                    Delete
                  </button>
                </td>
              )}
              {request.status && (
                <td className="py-2 px-4 border">Completed</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaverequest;

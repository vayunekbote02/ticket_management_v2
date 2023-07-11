import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UserTickets = () => {
  const { user_id } = useParams();
  const [userTickets, setUserTickets] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get(`/api/user/${user_id}/tickets`, {
          headers: {
            // Authorization: `Bearer ${cookies.token}`, // Include the token in the request headers
            "Content-Type": "application/json",
          },
          //   withCredentials: true,
        });

        const data = await res.data;
        if (data.status === 200) {
          console.log(data);
          setUserTickets(data.tickets);
        } else if (data.status === 403) {
          navigate("/unauthorized");
        } else {
          navigate("/unauthorized");
        }
      } catch (error) {
        navigate("/unauthorized");
      }
    };

    fetchTickets();
  }, [user_id, navigate]);

  const sortedTickets = userTickets.sort((a, b) => {
    if (a.resolved === b.resolved) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    return a.resolved ? 1 : -1;
  });

  return (
    <div>
      <div className="p-4">
        <h2 className="text-3xl font-bold text-center mb-4">My Tickets</h2>
        {userTickets.length === 0 ? (
          <p className="text-lg text-center">
            You have not created any tickets yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="py-2 px-4">
                    <h3 className="text-lg font-bold">Issue</h3>
                  </th>
                  <th className="py-2 px-4">
                    <h3 className="text-lg font-bold">Classification</h3>
                  </th>
                  <th className="py-2 px-4">
                    <h3 className="text-lg font-bold">Channel</h3>
                  </th>
                  <th className="py-2 px-4">
                    <h3 className="text-lg font-bold">Date/Time</h3>
                  </th>
                  <th className="py-2 px-4">
                    <h3 className="text-lg font-bold">Resolved</h3>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedTickets.map((ticket, index) => (
                  <tr
                    key={ticket.id}
                    className={index % 2 === 0 ? "bg-green-50" : ""}
                  >
                    <td className="py-2 px-4 text-center">{ticket.issue}</td>
                    <td className="py-2 px-4 text-center">
                      {ticket.classification}
                    </td>
                    <td className="py-2 px-4 text-center">{ticket.channel}</td>
                    <td className="py-2 px-4 text-center">
                      {new Date(ticket.createdAt).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="py-2 px-4 text-center">
                      {ticket.resolved ? "Yes" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTickets;

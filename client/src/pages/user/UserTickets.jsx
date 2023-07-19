import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserRoleContext } from "../../contexts/userRoleContext"; //change to use localStorage

const UserTickets = () => {
  const { user_id } = useParams();
  const [userTickets, setUserTickets] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const getRole = () => {
    if (role === "9087-t1-vaek-123-riop") {
      return "admin";
    } else if (role === "2069-t2-prlo-456-fiok") {
      return "engineer";
    } else if (role === "4032-t3-raek-789-chop") {
      return "user";
    }
  };
  // console.log(userRole);
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get(`/api/${getRole()}/${user_id}/tickets`, {
          headers: {
            // Authorization: `Bearer ${cookies.token}`, // Include the token in the request headers
            "Content-Type": "application/json",
          },
          //   withCredentials: true,
        });

        const data = await res.data;
        if (data.status === 200) {
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

  const handleTicketClick = (ticketId) => {
    navigate(`/user/${user_id}/ticket_details/${ticketId}`);
  };

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
            {role === "9087-t1-vaek-123-riop"
              ? "No one has created any tickets, what a surprise! Either the systems are working really well, or there is an error!"
              : role === "2069-t2-prlo-456-fiok"
              ? "You have not been assigned any tickets yet"
              : "You have not created any tickets yet."}
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
                    <h3 className="text-lg font-bold">Created At</h3>
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
                    onClick={() => handleTicketClick(ticket.id)}
                    className={
                      ticket.resolved
                        ? "bg-green-50 cursor-pointer border-b-2 border-slate-200 border-dashed"
                        : "bg-red-50 cursor-pointer  border-b-2 border-gray-300 border-dashed"
                    }
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

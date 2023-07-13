import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewTicketDetails = () => {
  const { user_id } = useParams();
  const { ticket_id } = useParams();
  const [ticket, setTicket] = useState({});
  const [status, setStatus] = useState(ticket.resolved);
  useEffect(() => {
    let isMounted = true;

    const fetchTicketDetails = async () => {
      try {
        const res = await axios.get(`/api/user/${user_id}/ticket/${ticket_id}`);
        const ticket = await res.data.ticket;

        if (isMounted) {
          setTicket(ticket);
          setStatus(ticket.resolved);
          console.log("Ticket fetched!");
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchTicketDetails();

    return () => {
      isMounted = false;
    };
  }, [user_id, ticket_id]);

  useEffect(() => {
    const updateResolvedStatus = async () => {
      try {
        await axios.put(
          `/api/user/${user_id}/ticket/${ticket_id}/update`,
          {
            resolved: status,
          },
          {
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${cookies.token}`,
            },
          }
        );
        console.log("Resolved status updated successfully!");
      } catch (error) {
        console.error("Failed to update resolved status:", error);
      }
    };

    updateResolvedStatus();
  }, [status, user_id, ticket_id]);
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-green-200">
        <div className="max-w-md w-full mx-4 my-8 bg-slate-100 shadow-lg rounded-lg border-dotted border-2 border-blue-500">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">
              Ticket Details
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="font-bold text-blue-800">Created By: </span>
                <span className="ml-2 text-gray-700">{ticket.name}</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold text-blue-800">Issue: </span>
                <span className="ml-2 text-gray-700">{ticket.issue}</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold text-blue-800">
                  Classification:{" "}
                </span>
                <span className="ml-2 text-gray-700">
                  {ticket.classification}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-bold text-blue-800">Channel: </span>
                <span className="ml-2 text-gray-700">{ticket.channel}</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold text-blue-800">Created At: </span>
                <span className="ml-2 text-gray-700">
                  {new Date(ticket.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-bold text-blue-800">Ticket Status: </span>
                <span
                  className={`ml-2 text-gray-700 ${
                    status ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {status ? "Resolved" : "Unresolved"}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-bold text-blue-800">Priority: </span>
                <span className="ml-2 text-gray-700">{ticket.priority}</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold text-blue-800">Remarks: </span>
                <span className="ml-2 text-gray-700">{ticket.remarks}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center py-4 border-t border-gray-300">
            <button
              className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              onClick={() => setStatus(!status)}
            >
              {status ? "Mark Unresolved" : "Mark Resolved"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTicketDetails;

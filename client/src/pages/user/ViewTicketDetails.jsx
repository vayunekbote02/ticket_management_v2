import React from "react";
import { useParams } from "react-router-dom";

const ViewTicketDetails = () => {
  const { ticket_id } = useParams();
  return <div>Ticket details of ticket: {ticket_id}</div>;
};

export default ViewTicketDetails;
{
  /* <div>Ticket details of ticket: {ticket_id}</div> */
}

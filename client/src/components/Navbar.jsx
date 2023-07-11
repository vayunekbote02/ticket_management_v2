import React from "react";
import { Link, useParams } from "react-router-dom";

const Navbar = () => {
  const { user_id } = useParams();
  return (
    <header className="text-gray-600 body-font shadow-lg rounded-xl bg-slate-50">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img
            src="https://images.pexels.com/photos/163007/phone-old-year-built-1955-bakelite-163007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 rounded-full"
            viewBox="0 0 0 0"
          />

          <span className="ml-2 text-xl">Ticket Guru</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link to={`/user/${user_id}/create_ticket`}>
            <span className="mr-5 hover:text-gray-900 text-blue-500 ">
              Create Ticket
            </span>
          </Link>
          <Link to={`/user/${user_id}/tickets`}>
            <span className="mr-5 hover:text-gray-900 text-green-500">
              View Tickets
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

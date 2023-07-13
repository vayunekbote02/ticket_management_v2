import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Navbar = () => {
  const { user_id } = useParams();
  const navigate = useNavigate();
  return (
    <header className="text-gray-600 body-font shadow-lg rounded-xl bg-slate-50">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img
            src="https://i.ibb.co/bW5ycwG/Screenshot-2023-06-27-115737.png"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 rounded-full"
            viewBox="0 0 0 0"
          />

          <span className="ml-2 text-xl">Global Infocomm</span>
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
        <button
          onClick={() => {
            fetch("/api/auth/logout");
            navigate("/login");
          }}
          className="inline-flex items-center bg-red-100 border-0 py-1 px-3 focus:outline-none hover:bg-slate-100 rounded text-base mt-4 md:mt-0"
        >
          Logout
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;

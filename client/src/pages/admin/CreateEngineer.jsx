import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
// import { UserRoleContext } from "../../contexts/userRoleContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateEngineer = () => {
  // const { userRole, setUserRole } = useContext(UserRoleContext);
  // console.log(userRole);
  const { user_id } = useParams();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("role") !== "9087-t1-vaek-123-riop") {
      navigate(-1);
    }
  });

  const fetchEngineers = async () => {
    toast.info("Remember to write a function to fetch engineers!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `/api/admin/${user_id}/create_engineer`,
        { email: email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = res.data;
      if (data.status === 200) {
        toast.success(
          "User has successfully been assigned the role of engineer."
        );
      } else if (data.status === 501) {
        toast.error(data.text);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto my-8 px-8">
      <div className="flex justify-center">
        <h2 className="text-3xl font-semibold text-gray-800">
          Assign Engineer Role
        </h2>
      </div>
      <p className="text-sm text-gray-600 text-center">
        Please add the email address of a <b>registered</b> user to assign the
        role of engineer.
      </p>
      <form className="mt-4">
        <div className="mb-2">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-800"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-slate-100 border border-black rounded-md focus:border-gray-500 focus:ring-gray-300 focus:border-none focus:ring focus:outline-none focus:ring-opacity-40"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
        >
          Assign Role
        </button>
      </form>
      <br />
      <div className="flex flex-col gap-2">
        <h2 className="block text-sm font-semibold text-gray-800">
          List of Engineers
        </h2>
        <button
          onClick={fetchEngineers}
          className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
        >
          See all engineers
        </button>
      </div>
    </div>
  );
};

export default CreateEngineer;

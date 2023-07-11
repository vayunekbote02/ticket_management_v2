import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [obj, setObj] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (event) => {
    event.preventDefault();
    const userId = generateUserId();
    try {
      const response = await axios.post(
        "/api/auth/register",
        { ...obj, userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      if (data.error) {
        alert(data.error);
      } else if (data.status === 200) {
        alert("Your account has been created! Please login.");
      }

      setObj({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const generateUserId = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    // Generate the unique code using your preferred algorithm (e.g., UUID, shortid, etc.)
    const uniqueCode = Math.floor(Math.random() * 10000);

    const userId = `${year}${month}${day}${uniqueCode}`;

    return userId;
  };

  const handleChange = (e) => {
    setObj((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-500">
      <div className="grid grid-cols-6 gap-8 bg-white rounded-lg shadow-md p-8">
        {/* Image and Register on mobile */}
        <div className="col-span-6 sm:col-span-3 sm:mb-0 flex justify-center">
          <div
            className="bg-register-image bg-cover bg-center h-20 sm:h-full w-full sm:w-48 mb-0 sm:mb-4 relative sm:text-center"
            style={{
              backgroundImage:
                "url(https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
            }}
          >
            <h1 className="text-4xl text-white font-bold absolute inset-0 flex justify-center items-center sm:items-start z-10 sm:mt-2">
              Register
            </h1>
            <span className="absolute inset-0 bg-gray-700 opacity-50 backdrop-filter backdrop-blur sm:z-[1]"></span>
          </div>
        </div>

        {/* Form */}
        <div className="col-span-6 sm:col-span-3">
          <form className="space-y-4" onSubmit={registerUser}>
            <div className="mb-3">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                value={obj.name}
                name="name"
                className="border border-blue-300 focus:ring-2 focus:ring-green-500 block w-full p-3 rounded-md shadow-sm outline-none"
                onChange={handleChange}
                autoComplete="username"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                value={obj.email}
                name="email"
                className="border border-blue-300 focus:ring-2 focus:ring-green-500 block w-full p-3 rounded-md shadow-sm outline-none"
                onChange={handleChange}
                autoComplete="username"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                value={obj.password}
                name="password"
                className="border border-blue-300 focus:ring-2 focus:ring-green-500 block w-full p-3 rounded-md shadow-sm outline-none"
                onChange={handleChange}
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-300"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

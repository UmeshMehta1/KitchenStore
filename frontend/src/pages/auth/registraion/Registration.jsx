import React from "react";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../../store/authSlice";
import { STATUSES } from "../../../global/mic/statuses";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Registration = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserdata] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  console.log("userdata", userData);

  useEffect(() => {
    if (status === STATUSES.SUCCESS) {
      return navigate("/login");
    }
    if (status === STATUSES.ERROR) {
      return alert("something went wrong");
    }
  }, [status]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUser(userData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserdata({
      ...userData,
      [name]: value,
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Registration Form
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-left text-gray-700 text-sm font-semibold mb-2"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="username"
              onChange={handleChange}
              type="text"
              required
              placeholder="enter your name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="number"
              className="block text-left text-gray-700 text-sm font-semibold mb-2"
            >
              Number <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="phoneNumber"
              type="number"
              onChange={handleChange}
              required
              placeholder="enter your number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-left text-gray-700 text-sm font-semibold mb-2"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              required
              placeholder="email@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-left text-gray-700 text-sm font-semibold mb-2"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              required
              placeholder="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;

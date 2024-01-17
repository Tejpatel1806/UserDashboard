import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditPage = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    // Add other user details as needed
  });

  useEffect(() => {
    // Fetch data for the user with the specified ID and populate the form
    // Replace the following with your actual API call
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/users/${userId}`
        );
        const userData = await response.json();
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement logic to update user data
    console.log("User data updated:", userData);
  };

  return (
    <div className="w-full max-w-screen-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit User with ID: {userId}</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-md p-6"
      >
        <div className="mb-4">
          <label
            htmlFor="first_name"
            className="block text-sm font-medium text-gray-600"
          >
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={userData.first_name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="last_name"
            className="block text-sm font-medium text-gray-600"
          >
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={userData.last_name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        {/* Add other input fields for additional user details here */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPage;

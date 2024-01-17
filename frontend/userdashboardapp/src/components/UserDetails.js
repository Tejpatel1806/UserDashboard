import React, { useState } from "react";
import { useParams } from "react-router-dom";
import EditUserModal from "./EditUserModal";
import { useNavigate } from "react-router-dom";
const UserDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = () => {
    // Open the edit modal
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    // Close the edit modal
    setIsEditModalOpen(false);
  };

  const handleSaveChanges = (editedDetails) => {
    // Handle logic to save edited details (e.g., send API request)
    console.log("Save changes:", editedDetails);
  };

  const handleDelete = async () => {
    try {
      // Send a DELETE request to the backend API with the user ID
      alert("Are you sure want to delete this User");
      const response = await fetch(
        `http://localhost:8000/api/userdelete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("User deleted successfully");
        // Redirect to the home page after successful deletion
        navigate("/");
      } else {
        console.error("Failed to delete user:", response.statusText);
        // Handle error scenario as needed
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle error scenario as needed
    }
    console.log("Delete button clicked");
  };

  return (
    <>
      {/* User Details Display */}
      <div className="container mx-auto mt-8">
        <div className="bg-white p-8 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4">User Details</h1>
          <p className="text-lg">User ID: {id}</p>

          {/* Edit and Delete buttons */}
          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Edit User Modal */}
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onEdit={handleSaveChanges}
        id={id}
      />
    </>
  );
};

export default UserDetails;

import React, { useState } from "react";
import { useParams,useLocation  } from "react-router-dom";
import EditUserModal from "./EditUserModal";
import { useNavigate } from "react-router-dom";
const UserDetails = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedUser = location.state?.selectedUser;
  const { id } = useParams();
  

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveChanges = (editedDetails) => {
    
    console.log("Save changes:", editedDetails);
  };

  const handleDelete = async () => {
    try {
      alert("Are you sure want to delete this User");
      const response = await fetch(
        `http://localhost:8000/api/userdelete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("User deleted successfully");
        navigate("/");
      } else {
        console.error("Failed to delete user:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
    console.log("Delete button clicked");
  };

  return (
    <>
     
      <div className="container mx-auto mt-8">
        <div className= "bg-blue-50 p-8 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4">User Details</h1>
          <p className="text-lg">User ID: {id}</p>
          <p className="text-lg">User Name:- {selectedUser.user_name}</p>
          <p className="text-lg">User Email:- {selectedUser.email}</p>
          <p className="text-lg">User Role:- {selectedUser.role}</p>
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

import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";

function Tabledisplay() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const navigate = useNavigate();
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User Name",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];
  const hello = (id) => {
    const selectedUser = data.find((item) => item.id === id);
    console.log("selected user is:-", selectedUser);
    navigate(`/details/${id}`, { state: { selectedUser } });
  };

  const dataget = async () => {
    try {
      console.log("Called API");
      const response = await fetch(
        `http://localhost:8000/api/users?page=${currentPage}`
      );
      const data = await response.json();
      console.log(data.totalPages);
      setTotalPage(data.totalPages);
      console.log(data);
      setData(data.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    dataget();
  }, [currentPage]);
  const handleCreateUser = () => {
    navigate("/create-user");
  };
  const handlePageChange = (newPage) => {
    console.log("button is clicked");
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen ">
        <div className="w-full max-w-screen-md overflow-hidden px-3 rounded-lg shadow-lg border-2 border-slate-500 bg-blue-50">
          <h1 className="flex justify-center my-5 font-black">User details</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-collapse border-gray-200 shadow-md rounded-md">
              <thead className="">
                <tr>
                  {columns.map((column) => (
                    <th key={column.key} className="py-2 px-4 border-b">
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={index}
                    style={{ cursor: "pointer" }}
                    onClick={() => hello(item.id)}
                  >
                    {columns.map((column) => (
                      <td key={column.key} className="py-2 px-4 border-2">
                        {column.render
                          ? column.render(item[column.dataIndex], item)
                          : item[column.dataIndex]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex  justify-around items-center m-2 ">
            <button
              className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded cursor-pointer mb-2"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-gray-600 text-sm mb-2">
              Page {currentPage}
            </span>
            <button
              className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded cursor-pointer mb-2"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPage}
            >
              Next
            </button>
          </div>
          <div className="flex justify-center mb-3">
            <button
              type="button"
              className="border rounded-md text-center p-2 transition duration-300 hover:scale-110 bg-blue-300 hover:bg-blue-400"
              onClick={handleCreateUser}
            >
              Create User
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tabledisplay;

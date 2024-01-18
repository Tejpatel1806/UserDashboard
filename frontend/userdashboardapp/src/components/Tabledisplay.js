import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    console.log("selected user is:-",selectedUser);
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
       {/* <div className="flex justify-center items-center h-screen bg-slate-300">
        <div className="w-full max-w-screen-md bg-white">
          <h1 className="my-5 px-[315px] font-black ">User details</h1>
          <table className="min-w-full border border-collapse  border-gray-200 shadow-md rounded-md">
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
          <div className="float-right my-2 mx-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-gray-600 text-sm mx-2">Page {currentPage}</span>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPage}
            >
              Next
            </button>
          </div>
          <button
            type="button"
            className="border rounded-md text-center w-[100px] my-5 ml-[330px] bg-blue-300"
            onClick={handleCreateUser}
          >
            {" "}
            Create User
          </button>
        </div>
      </div>  */}

<div className="flex flex-col items-center justify-center h-screen bg-slate-300">
  <div className="w-full max-w-screen-md bg-white overflow-hidden">
    <h1 className="my-5 px-[315px] font-black">User details</h1>
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
    <div className="flex flex-col items-center my-2 mx-2">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer mb-2"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="text-gray-600 text-sm mb-2">Page {currentPage}</span>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer mb-2"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPage}
      >
        Next
      </button>
      <button
        type="button"
        className="border rounded-md text-center w-[100px] my-2 bg-blue-300"
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

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Tabledisplay() {
  const [data, setData] = useState([]);
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
    navigate(`/details/${id}`);
  };

  const dataget = async () => {
    try {
      console.log("Called API");
      const response = await fetch("http://localhost:8000/api/users");
      const data = await response.json();
      // console.log("data", data);
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    dataget();
  }, []);
  const handleCreateUser = () => {
    navigate("/create-user");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-screen-md">
        <table className="min-w-full border border-collapse border-gray-200 shadow-md rounded-md">
          <thead className="bg-gray-100">
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
        <button
          type="button"
          className="border rounded-md text-center w-[100px] mt-5 ml-[330px] bg-blue-300"
          onClick={handleCreateUser}
        >
          {" "}
          Create User
        </button>
      </div>
    </div>
  );
}

export default Tabledisplay;

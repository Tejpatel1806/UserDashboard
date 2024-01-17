import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Tabledisplay() {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Link
            to={`/edit/${record.key}`}
            className="text-blue-500 hover:underline mr-2"
          >
            Edit
          </Link>
          <button
            className="text-red-500 hover:underline"
            onClick={() => handleDelete(record.key)}
          >
            Delete
          </button>
        </span>
      ),
    },
  ];

  const dataget = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/users");
      const data = await response.json();
      console.log("data", data);
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = (key) => {
    // Handle delete logic here
    console.log("Delete button clicked for key:", key);
  };

  useEffect(() => {
    dataget();
  }, []);

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
              <tr key={index}>
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
    </div>
  );
}

export default Tabledisplay;

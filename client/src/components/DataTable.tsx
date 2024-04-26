import React, { useState, useEffect } from "react";
import axios from "axios";

type DataType = {
  Lines: {
    LinesArray: { Line: string }[];
  }[];
  Tables: [];
};

function UploadData() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<DataType[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Assuming the response data is an array of DataType
      if (Array.isArray(response.data)) {
        setData(response.data);
      }
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch data from your database
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/data");
      // Assuming the response data is an array of DataType
      if (Array.isArray(response.data)) {
        setData(response.data);
      }
      console.log(response.data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on initial render
  }, []);

  return (
    <>
      {/* {data &&
        data.map((dataType) =>
          dataType.Tables.map((table, index) => (
            <table key={index}>
              <tr>
                <th>{table.TableJson}</th>
                <th>{table.rowNumber}</th>
                <th>{table.columnNumber}</th>
              </tr>
              <td>{table.TableJson}</td>
            </table>
          ))
        )} */}
    </>
  );
}

export default UploadData;

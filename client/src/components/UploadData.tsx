import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "@nextui-org/react";
import DataTable from "./DataTable";

function UploadData() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState([]);

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

      console.log(response.data);
      fetchData(); // Fetch data after file upload
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch data from your database
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/data");
      setData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on initial render
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='file'
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        />
        <button type='submit'>Upload</button>
      </form>
      {/* Render data in a table */}
      {/* <Table
        data={data}
        columns={[
          { title: "Column 1", prop: "col1" },
          { title: "Column 2", prop: "col2" },
          // Add more columns as needed
        ]}
      />{" "}
      as any; */}
      <DataTable/>
    </div>
  );
}

export default UploadData;

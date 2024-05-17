/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import axios from "axios";

import DataTable from "./DataTable";
import { Button } from "@nextui-org/react";

function UploadData() {
  const [file, setFile] = useState<File | null>(null);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [, setData] = useState<any[]>([]);


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
        `${import.meta.env.VITE_BASE_URL}/upload`,
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
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/data`);
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
        <Button type='submit' color="primary">Upload</Button>
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

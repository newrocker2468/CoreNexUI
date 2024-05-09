/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
type DataType = {
  Tables: any;
  Lines: {
    LinesArray: { Line: string }[];
  }[];
  tables: any[]; // Change this to any[] if tables can have any structure
};

function UploadData() {
  // const [file] = useState<File | null>(null);
  const [data, setData] = useState<DataType[]>([]);
  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();

  //   if (!file) {
  //     alert("Please select a file");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("file", file);

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3000/upload",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //       console.log(response.data);
  //     // Assuming the response data is an array of DataType
  //     if (Array.isArray(response.data)) {
  //       setData(response.data);
  //     }
  //     console.log(response.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // Fetch data from your database
  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/data`);
      // Assuming the response data is an array of DataType
      if (Array.isArray(response.data)) {
        setData(response.data);
      }
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on initial render
  }, []);


  return (
    <div>
      {/* ... other code remains the same */}
      {data.map((table, index) => (
        <div className='p-5' key={index}>
          <h2 className='text-2xl font-bold mb-5'>Table {index + 1}</h2>
          {table.Tables.map((table : any, index : any) => {
            if (table.TableJson) {
              const headers = Object.values(table.TableJson[0]);
              const rows = Object.values(table.TableJson).slice(1);
              return (
                <div key={index} className="m-5">
                  <Table aria-label={`Table ${index + 1}`}>
                    <TableHeader>
                      {headers.map((header : any, headerIndex) => (
                        <TableColumn key={headerIndex}>{header}</TableColumn>
                      ))}
                    </TableHeader>
                    <TableBody>
                      {rows.map((row : any, rowIndex) => (
                        <TableRow key={rowIndex}>
                          {Object.values(row).map((cell : any, cellIndex) => (
                            <TableCell key={cellIndex}>{cell || '--'}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              );
            } else {
              const headers = Object.values(table[0]);
              const rows = Object.values(table).slice(1);
              return (
                <div key={index} className="m-5">
                  <Table aria-label={`Sub Table ${index + 1}`}>
                    <TableHeader>
                      {headers.map((header : any, headerIndex) => (
                        <TableColumn key={headerIndex}>{header}</TableColumn>
                      ))}
                    </TableHeader>
                    <TableBody>
                      {rows.map((row : any, rowIndex) => (
                        <TableRow key={rowIndex}>
                          {/*object.values converts objects to array of its properties*/}
                          {Object.values(row).map((cell : any, cellIndex) => (
                            <TableCell key={cellIndex}>{cell || '-'}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
}

export default UploadData;

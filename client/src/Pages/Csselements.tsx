import Sidebar from '@/components/SideBar';
import LiveEditor from '@/components/LiveEditor';
import { v4 as uuidv4 } from "uuid";
import { Link } from 'react-router-dom';
import Btn from '@/components/Btn';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CssElement from '@/components/CssElement';
import "normalize.css";

export default function Csselements() {
  const [htmlCssPairs, setHtmlCssPairs] = useState([]);

useEffect(() => {
  // Replace with your own server URL and endpoints
  axios
    .get("http://localhost:3000/allcsselements")
    .then((response) => {
      console.log(response.data);
      const pairs = response.data.map((item: { html: string; css: string;_id:string }) => ({
        html: item.html,
        css: item.css,
        id: item._id,
      }));
console.log(pairs);
      setHtmlCssPairs(pairs);

    })
    .catch((error) => console.error(error));
    console.log(htmlCssPairs);
}, []);

  const id = uuidv4();
    return (
      <>
        <div className='inline-flex'>
          <Sidebar />

          <div className='grid'>
            <Link
              to={`/editor/create/${id}`}
              className='self-center relative top-[-1rem]'
            >
              <Btn Text='Create' color='primary' />
            </Link>

            <div className='grid grid-cols-1 gap-x-3 gap-y-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:min-w-[294px] items-stretch content-stretch w-full mb-48'>
              {htmlCssPairs.map(
                (pair: { id: string; html: string; css: string }) => (
                  <div className='m-3'>
                    <CssElement htmlcssPairs={pair} key={uuidv4()} />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </>
    );
}
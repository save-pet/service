import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RenderList from './RenderList';

export default function ShelterCodeList() {
  const [shelterList, setShelterList] = useState([]);
  const location = useLocation();
  const careCode = location.pathname.split('/')[2];

  async function getRescue() {
    useEffect(() => {
      const asyncGetRescue = async () => {
        const { data } = await axios(
          `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/${process.env.REACT_APP_ROUTER_RESCUE}/care-code/${careCode}`,
        );
        setShelterList(data);
      };
      asyncGetRescue();
    }, []);
  }
  getRescue();

  return (
    <>
      {shelterList.length > 0 && (
        <div className="px-4 py-5 sm:px-6">
          <div className="text-2xl font-semibold text-gray-800">
            {shelterList[0].careName}
          </div>
        </div>
      )}
      <main className="inline-flex flex-wrap justify-start gap-[20px] p-[20px]">
        <RenderList list={shelterList} />
      </main>
    </>
  );
}

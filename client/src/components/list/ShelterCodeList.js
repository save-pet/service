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
          `${process.env.REACT_APP_SERVER_DOMAIN}/${process.env.REACT_APP_ROUTER_RESCUE}/care-code/${careCode}`,
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
          <div className="text-3xl font-bold text-gray-800">
            {shelterList[0].careName}
          </div>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 ">
            {shelterList[0].careName}에서 보호중인 동물입니다.
          </p>
        </div>
      )}
      <main className="lg:w-11/12 mx-auto my-0 p-5 text-[0px]">
        <RenderList list={shelterList} />
      </main>
    </>
  );
}

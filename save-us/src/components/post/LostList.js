/* eslint-disable no-unused-vars */
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function LostList() {
  const [lostList, setLostList] = useState([]);

  async function getRescue() {
    useEffect(() => {
      const asyncGetRescue = async () => {
        const { data } = await axios(
          `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/lost`,
        );
        console.log(data);
        setLostList(data);
      };
      asyncGetRescue();
    }, []);
  }
  getRescue();

  return (
    <div>
      <div className="px-4 py-5 sm:px-6">
        <div className="text-3xl font-bold text-gray-800">분실 목록</div>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 ">
          회원들이 등록한 분실 신고 목록입니다.
        </p>
      </div>
      <div className="grid gap-4 grid-cols-3 mx-4">
        {lostList.map((rescue) => {
          const { shortId, animalName, detail, lostDate, address, image } =
            rescue;
          return (
            <div className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl">
              <div>
                <img
                  src={`${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/static/${image}`}
                  alt="lost animal"
                  className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                />
              </div>
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  이름 : {animalName}
                </h5>
                <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
                  분실 일시: {lostDate}
                </p>
                <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
                  분실 장소: {address}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  특징: {detail}
                </p>
                <div
                  key={shortId}
                  className="inline-flex items-center py-2 px-3 text-sm font-bold text-center bg-[#ffa000]  hover:text-gray-700 text-white rounded-lg"
                >
                  <Link to={`/lost/${shortId}`}>상세보기</Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

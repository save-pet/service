import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function LostList() {
  const [lostList, setLostList] = useState([]);

  async function getData() {
    useEffect(() => {
      const asyncGetData = async () => {
        const { data } = await axios(
          `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/${process.env.REACT_APP_ROUTER_LOST}`,
        );
        setLostList(data);
      };
      asyncGetData();
    }, []);
  }
  getData();

  return (
    <div>
      <div className="px-4 py-5 sm:px-6">
        <div className="text-3xl font-bold text-gray-800">분실 목록</div>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 ">
          회원들이 등록한 분실 신고 목록입니다.
        </p>
      </div>
      <div className="grid grid-cols-3 mx-4">
        {lostList.map((rescue) => {
          const { shortId, animalName, detail, lostDate, address, image } =
            rescue;
          return (
            <div className="inline-flex flex-wrap justify-center p-4 gap-5">
              <div
                key={shortId}
                className="content-start overflow-hidden shadow-lg rounded-lg h-90 w-80 md:w-96 min-w-full cursor-pointer m-auto"
              >
                <Link to={`/lost/${shortId}`} className="w-full block h-full">
                  <img
                    src={`${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/static/${image}`}
                    alt="lost animal"
                    className="max-h-64 w-full object-cover"
                  />
                  <div className="m-4">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                      {animalName}
                    </h5>
                    <p className="mb-1 font-normal text-gray-700">
                      분실 일시: {lostDate}
                    </p>
                    <p className="mb-1 font-normal text-gray-700">
                      분실 장소: {address}
                    </p>
                    <p className="mb-3 font-normal text-gray-700">
                      특징: {detail}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

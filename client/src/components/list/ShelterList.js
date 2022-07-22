import { React, useEffect, useState } from 'react';
import axios from 'axios';

function ShelterList() {
  const [isLoading, setIsLoading] = useState(false);
  const [shelterList, setShelterList] = useState([]);

  const getShelterList = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/shelter/`,
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        },
      );
      setShelterList(data);
    } catch (error) {
      alert(error.response.data.reason);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getShelterList();
  }, []);

  if (isLoading) return <div>로딩중...</div>;

  return (
    <div>
      <div className="px-4 py-5 sm:px-6">
        <div className="text-3xl font-bold text-gray-800">보호소 목록</div>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 ">
          보호소 선택시 보호소별 구조목록으로 이동합니다.
        </p>
      </div>
      {shelterList.map((list) => {
        const { careCode, careName, careAddress, careTel } = list;
        return (
          <div key={careCode}>
            <li className="flex flex-row">
              <div className="select-none flex flex-1 items-center p-4 text-center">
                <div className="font-medium w-full">{careName}</div>
                <div className="font-medium w-full">{careAddress}</div>
                <div className="font-medium w-full">{careTel}</div>
              </div>
            </li>
          </div>
        );
      })}
    </div>
  );
}

export default ShelterList;

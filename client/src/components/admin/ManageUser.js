import { React, useEffect, useState } from 'react';
import axios from 'axios';

import MenuBar from './menu/MenuBar';

function LostList() {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUserData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/${process.env.REACT_APP_ROUTER_USERS}`,
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        },
      );
      setUserList(data);
    } catch (error) {
      alert(error.response.data.reason);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (isLoading) return <div>로딩중...</div>;

  return (
    <div className="container flex flex-row">
      <MenuBar />
      <div className=" mt-16 container flex flex-col mx-auto w-full items-center justify-center ">
        <div className="px-4 py-5 sm:px-6 border-b-2 border-gray-700 w-full">
          <h2 className="text-lg text-bold leading-6 font-bold text-gray-900 ">
            회원 정보 관리
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 ">
            회원정보 관리 페이지 입니다.
          </p>
        </div>

        <ul className="flex flex-col divide divide-y w-full text-center">
          <li className="flex flex-row">
            <div className="select-none flex flex-1 items-center p-4">
              <div className="font-medium w-full">아이디</div>
              <div className="font-medium w-full">이름</div>
              <div className="font-medium w-full">전화번호</div>
              <div className="font-medium w-full">계정</div>
            </div>
          </li>

          {userList.map((list) => {
            const { id, fullName, phoneNumber, role } = list;
            return (
              <div key={id}>
                <li className="flex flex-row">
                  <div className="select-none flex flex-1 items-center p-4">
                    <div className="font-medium w-full">{id}</div>
                    <div className="font-medium w-full">{fullName}</div>
                    <div className="font-medium w-full">{phoneNumber}</div>
                    <div className="font-medium w-full">
                      {role === 'basic-user' ? '일반회원' : '관리자'}
                    </div>
                  </div>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default LostList;

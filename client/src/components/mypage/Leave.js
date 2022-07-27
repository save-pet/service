/* eslint-disable no-underscore-dangle */
import { React, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import MenuBar from './menu/MenuBar';

function Leave() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserInfo = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_DOMAIN}/${process.env.REACT_APP_ROUTER_USER}`,
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        },
      );
      setUserInfo(data);
    } catch (error) {
      alert(error.response.data.reason);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUserAccount = async () => {
    try {
      await axios({
        url: `${process.env.REACT_APP_SERVER_DOMAIN}/${process.env.REACT_APP_ROUTER_USER}/${userInfo._id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        data: {
          currentPassword,
        },
      });
      alert('탈퇴가 완료되었습니다.');
      sessionStorage.removeItem('token');
      window.location.replace('/');
    } catch (error) {
      alert(error.response.data.reason);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    deleteUserAccount();
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (isLoading) return <div>로딩중...</div>;

  return (
    <div className="container flex flex-row">
      <MenuBar />
      <div className="mt-16 container flex flex-col mx-auto w-full items-center justify-center">
        <div className="px-20 py-5 sm:px-6 border-b-2 border-gray-700 w-full">
          <h2 className="text-lg text-bold leading-6 font-bold text-gray-900 ">
            계정 탈퇴
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 ">
            탈퇴 시 해당 계정으로 작성한 글을 삭제할 수 없습니다. 원하는 글이
            있다면 탈퇴 전 삭제 해주세요.
          </p>
        </div>
        <div className="mt-8">
          <form onSubmit={handleSubmit} className="flex flex-row">
            <div className="flex flex-col mb-2">
              <div className="flex relative">
                <span className="rounded-l-md inline-flex  items-center px-5 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  className=" text-center rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-3 px-20 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-red-500   focus:border-transparent"
                  name="password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="현재 비밀번호"
                />
              </div>
            </div>
            <button
              type="submit"
              className="ml-10 py-2 px-4 mt-1 mb-10 bg-[#ff3d3d]  hover:font-bold text-white w-28 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none rounded-lg"
            >
              탈퇴하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Leave;

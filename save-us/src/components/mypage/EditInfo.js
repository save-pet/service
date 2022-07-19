/* eslint no-underscore-dangle: "warn" */
import { React, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser, faPhone } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import MenuBar from './menu/MenuBar';

function EditInfo() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeUserInfo = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const editUserInfo = () =>
    axios.patch(
      `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/${process.env.REACT_APP_ROUTER_USER}/${userInfo._id}`,
      {
        userId: userInfo.userId,
        id: userInfo.id,
        fullName: userInfo.fullName,
        currentPassword,
        password: newPassword,
        address: userInfo.address,
        phoneNumber: userInfo.phoneNumber,
        role: userInfo.role,
      },
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      },
    );

  const getUserInfo = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/${process.env.REACT_APP_ROUTER_USER}`,
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        },
      );
      setUserInfo(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetUserInfo = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('새로운 비밀번호가 서로 일치하지 않습니다.');
      return;
    }
    try {
      await editUserInfo();
      alert(`회원정보가 변경되었습니다.`);
      resetUserInfo();
    } catch (error) {
      alert(error.response.data.reason);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  if (isLoading) return <div>로딩중...</div>;

  return (
    <div className="container flex flex-row">
      <MenuBar />
      <div className="mt-16 container flex flex-col mx-auto w-full items-center justify-center">
        <div className="px-20 py-5 sm:px-6 border-b-2 border-gray-700 w-full">
          <h2 className="text-lg text-bold leading-6 font-bold text-gray-900 ">
            개인 정보 수정
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 ">
            개인 정보 수정을 위해 현재 비밀번호를 입력해주세요.
          </p>
        </div>
        {userInfo && (
          <div className="mt-8">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mb-2">
                <div className="flex relative">
                  <span className="rounded-l-md inline-flex  items-center px-5 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                  <input
                    className=" text-center rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-3 px-20 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-[#ffa000]   focus:border-transparent"
                    name="id"
                    type="text"
                    value={userInfo.id}
                    placeholder="아이디"
                    readOnly
                    disabled
                  />
                </div>
              </div>
              <div className="flex flex-col mb-2">
                <div className="flex relative">
                  <span className="rounded-l-md inline-flex  items-center px-5 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                  <input
                    className="text-center rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-3 px-10 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-[#ffa000]   focus:border-transparent"
                    name="fullName"
                    type="text"
                    value={userInfo.fullName}
                    onChange={handleChangeUserInfo}
                    placeholder="이름"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-2">
                <div className="flex relative">
                  <span className="rounded-l-md inline-flex  items-center px-5 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <input
                    className="text-center rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-3 px-20 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-[#ffa000]   focus:border-transparent"
                    name="password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="현재 비밀번호"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-2">
                <div className="flex relative">
                  <span className="rounded-l-md inline-flex  items-center px-5 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <input
                    className="text-center rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-3 px-20 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-[#ffa000]   focus:border-transparent"
                    name="password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="새 비밀번호"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-2">
                <div className="flex relative">
                  <span className="rounded-l-md inline-flex  items-center px-5 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <input
                    className="text-center rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-3 px-20 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-[#ffa000]   focus:border-transparent"
                    name="password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="새 비밀번호 확인"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-2">
                <div className="flex relative">
                  <span className="rounded-l-md inline-flex  items-center px-5 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <FontAwesomeIcon icon={faPhone} />
                  </span>
                  <input
                    className="text-center rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-3 px-20 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-[#ffa000]   focus:border-transparent"
                    name="phoneNumber"
                    type="phoneNumber"
                    value={userInfo.phoneNumber}
                    onChange={handleChangeUserInfo}
                    placeholder="전화번호"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="ml-80 py-2 px-4 mt-1 mb-10 bg-[#ffa000]  hover:bg-[#ffd149] text-white w-28 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none rounded-lg"
              >
                수정하기
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditInfo;

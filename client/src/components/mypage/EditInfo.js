/* eslint-disable no-underscore-dangle */
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
      `${process.env.REACT_APP_SERVER_DOMAIN}/${process.env.REACT_APP_ROUTER_USER}/${userInfo._id}`,
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

  const resetUserInfo = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('????????? ??????????????? ?????? ???????????? ????????????.');
      return;
    }
    try {
      await editUserInfo();
      alert(`??????????????? ?????????????????????.`);
      resetUserInfo();
    } catch (error) {
      alert(error.response.data.reason);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  if (isLoading) return <div>?????????...</div>;

  return (
    <div className="container flex flex-row pb-7">
      <MenuBar />
      <div className="mt-16 container flex flex-col mx-auto w-full items-center justify-center">
        <div className="px-20 py-5 sm:px-6 border-b-2 border-gray-700 w-full">
          <h2 className="text-lg text-bold leading-6 font-bold text-gray-900 ">
            ?????? ?????? ??????
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 ">
            ?????? ?????? ????????? ?????? ?????? ??????????????? ??????????????????.
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
                    placeholder="?????????"
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
                    placeholder="??????"
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
                    placeholder="?????? ????????????"
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
                    placeholder="??? ????????????"
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
                    placeholder="??? ???????????? ??????"
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
                    placeholder="????????????"
                  />
                </div>
              </div>
              <button type="submit" className="float-right btn-submit">
                ????????????
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditInfo;

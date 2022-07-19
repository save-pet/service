/* eslint no-underscore-dangle: "warn" */
import { React, useState, useEffect } from 'react';
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
    <div>
      <MenuBar />
      {userInfo && (
        <form onSubmit={handleSubmit}>
          <div>
            아이디 :
            <input
              name="id"
              type="text"
              value={userInfo.id}
              placeholder="아이디"
              readOnly
              disabled
            />
          </div>
          <div>
            이름 :
            <input
              name="fullName"
              type="text"
              value={userInfo.fullName}
              onChange={handleChangeUserInfo}
              placeholder="이름"
            />
          </div>
          <div>
            현재 비밀번호 :
            <input
              name="password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div>
            새 비밀번호 :
            <input
              name="password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            새 비밀번호 확인 :
            <input
              name="password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            전화번호 :
            <input
              name="phoneNumber"
              type="phoneNumber"
              value={userInfo.phoneNumber}
              onChange={handleChangeUserInfo}
              placeholder="010-1234-5678"
            />
          </div>
          <button type="submit">회원정보수정</button>
        </form>
      )}
    </div>
  );
}

export default EditInfo;

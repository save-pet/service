/* eslint no-underscore-dangle: "warn" */
import { React, useState, useEffect } from 'react';
import axios from 'axios';

function Leave() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserInfo = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/user`,
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

  const deleteUserAccount = async () => {
    try {
      await axios({
        url: `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/user/${userInfo._id}`,
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
    <div>
      <p>탈퇴 시 해당 계정으로 작성한 글을 삭제할 수 없습니다.</p>
      <p>삭제를 원하는 글이 있다면 탈퇴 전 삭제 해주세요.</p>
      <form onSubmit={handleSubmit}>
        <div>
          비밀번호 확인 :
          <input
            name="password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <button type="submit">탈퇴</button>
      </form>
    </div>
  );
}

export default Leave;

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
        `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/user/users`,
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        },
      );
      setUserList(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (isLoading) return <div>로딩중...</div>;

  return (
    <div>
      <MenuBar />
      <div>
        <h2 style={{ display: 'inline' }}>회원 정보 관리</h2>
        <span>회원정보 관리 페이지 입니다.</span>
      </div>
      <hr
        style={{
          border: '1px solid black',
          backgroundColor: 'black',
          width: '450px',
          margin: 0,
        }}
      />
      <table>
        <thead>
          <tr>
            <th>아이디</th>
            <th>이름</th>
            <th>전화번호</th>
          </tr>
        </thead>
      </table>
      {userList.map((list) => {
        const { id, fullName, phoneNumber } = list;
        return (
          <div>
            <table>
              <tbody>
                <tr>
                  <td>{id}</td>
                  <td>{fullName}</td>
                  <td>{phoneNumber}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}

export default LostList;

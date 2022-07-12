import { React, useEffect, useState } from 'react';

import MenuBar from './menu/MenuBar';

function ManageUser() {
  const [userList, setUserList] = useState([]);

  async function getList() {
    const res = await fetch('/UserInfoMockData.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const data = await res.json();
    return data;
  }
  useEffect(() => {
    const getUserFunc = async () => {
      setUserList(await getList());
    };
    getUserFunc();
  }, []);

  return (
    <div>
      <MenuBar />
      <div>
        <h2 style={{ display: 'inline' }}>회원 정보 관리</h2>
        <span>회원 정보 관리 페이지 입니다.</span>
      </div>

      <hr
        style={{
          border: '1px solid black',
          backgroundColor: 'black',
          width: '450px',
          margin: '0 0 5px 0',
        }}
      />
      <button type="button">번호순 정렬</button>
      <button type="button">아이디순 정렬</button>
      <button type="button">이름순 정렬</button>

      <table>
        <thead>
          <tr>
            <th>아이디</th>
            <th>이름</th>
            <th>전화 번호</th>
          </tr>
        </thead>
      </table>
      {userList.map((list) => {
        const { id, name, phoneNumber } = list;
        return (
          <table>
            <tbody>
              <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{phoneNumber}</td>
              </tr>
            </tbody>
          </table>
        );
      })}
    </div>
  );
}

export default ManageUser;

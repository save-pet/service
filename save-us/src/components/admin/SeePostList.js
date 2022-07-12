import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import MenuBar from './menu/MenuBar';

function LostList() {
  const [myLostList, setmyLostList] = useState([]);

  async function getList() {
    const res = await fetch('/LostListMockData.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const data = await res.json();
    return data;
  }
  useEffect(() => {
    const getListFunc = async () => {
      setmyLostList(await getList());
    };
    getListFunc();
  }, []);

  return (
    <div>
      <MenuBar />
      <div>
        <h2 style={{ display: 'inline' }}>목격 신고 리스트</h2>
        <span>회원님이 등록한 목격 신고 목록입니다.</span>
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
            <th>선택 </th>
            <th>번호</th>
            <th>이름</th>
            <Content>
              <th>실종 날짜</th>
            </Content>
          </tr>
        </thead>
      </table>
      {myLostList.map((list) => {
        const { lostNumber, name, lostDate } = list;
        return (
          <div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <Content>
                    <td>{lostNumber}</td>
                  </Content>
                  <Content>
                    <td>{name}</td>
                  </Content>
                  <Content>
                    <td>{lostDate}</td>
                  </Content>
                  <Link to="/lost">
                    <td>상세보기</td>
                  </Link>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}

const Content = styled.td`
  padding: 0 8px;
  margin: 0;
`;

export default LostList;

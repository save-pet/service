import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import MenuBar from './menu/MenuBar';

function LostList() {
  const [myLostList, setmyLostList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/lost/user`,
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        },
      );
      setmyLostList(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const Delete = async (shortId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/lost/delete/${shortId}`,
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        },
      );
    } catch (error) {
      console.log(error);
    } finally {
      alert('게시글이 삭제 되었습니다.');
      window.location.replace('/mypage/lost-list');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) return <div>로딩중...</div>;

  return (
    <div>
      <MenuBar />
      <div>
        <h2 style={{ display: 'inline' }}>분실 신고 리스트</h2>
        <span>회원님이 등록한 분실 신고 목록입니다.</span>
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
            <th>이름</th>
            <th>실종 날짜</th>
            <th>상태</th>
          </tr>
        </thead>
      </table>
      {myLostList.map((list) => {
        const { animalName, lostDate, processState } = list;
        return (
          <div>
            <table>
              <tbody>
                <tr>
                  <td>{animalName}</td>
                  <td>{lostDate}</td>
                  <td>{processState}</td>
                  <button type="button">완료</button>
                  <button type="button" onClick={() => Delete(list.shortId)}>
                    삭제하기
                  </button>
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

export default LostList;

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

  const deleteLostItem = async (shortId) => {
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
      setmyLostList(myLostList.filter((item) => item.shortId !== shortId));
      alert('게시글이 삭제 되었습니다.');
    } catch (error) {
      console.log(error);
    }
  };

  const changeState = async (processState, shortId) => {
    await axios.patch(
      `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/lost/edit/${shortId}`,
      {
        processState: processState === 'lost' ? 'done' : 'lost',
      },
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      },
    );
    setmyLostList(
      myLostList.map((item) =>
        item.shortId === shortId
          ? {
              ...item,
              processState: item.processState === 'lost' ? 'done' : 'lost',
            }
          : item,
      ),
    );
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
      <div>이름 실종 날짜 상태</div>
      {myLostList.map((list) => {
        const { shortId, animalName, lostDate, processState } = list;
        return (
          <div key={shortId}>
            {animalName}
            {lostDate}
            {processState === 'lost' ? '분실' : '완료'}
            <button
              type="button"
              onClick={() => changeState(processState, shortId)}
            >
              {processState === 'lost' ? '완료처리' : '분실처리'}
            </button>
            <button type="button" onClick={() => deleteLostItem(shortId)}>
              삭제하기
            </button>
            <Link to={`/lost/${shortId}`}>상세보기</Link>
          </div>
        );
      })}
    </div>
  );
}

export default LostList;

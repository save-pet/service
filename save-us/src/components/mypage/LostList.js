import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashCan,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import MenuBar from './menu/MenuBar';

function LostList() {
  const [myLostList, setmyLostList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/${process.env.REACT_APP_ROUTER_LOST}/user`,
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
        `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/${process.env.REACT_APP_ROUTER_DELETE}/${shortId}`,
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
      `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/${process.env.REACT_APP_ROUTER_EDIT}/${shortId}`,
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
    <div className="container flex flex-row">
      <MenuBar />
      <div className=" mt-8 container flex flex-col mx-auto w-full items-center justify-center">
        <div className="px-4 py-5 sm:px-6 border-b-2 border-gray-700 w-full">
          <h2 className="text-lg text-bold leading-6 font-bold text-gray-900 ">
            분실 신고 리스트
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 ">
            회원님이 등록한 분실 신고 목록입니다.
          </p>
        </div>

        <ul className="flex flex-col divide divide-y w-full text-center">
          <li className="flex flex-row">
            <div className="select-none flex flex-1 items-center p-4">
              <div className="font-medium w-full">이름</div>
              <div className="font-medium w-full">
                실종 날짜
              </div>
              <div className="font-medium w-full">상태</div>
              <div className="font-medium w-full">-</div>
              <div className="font-medium w-full">상세보기</div>
              <div className="font-medium w-full">-</div>
            </div>
          </li>

          {myLostList.map((list) => {
            const { shortId, animalName, lostDate, processState } = list;
            return (
              <div key={shortId}>
                <li className="flex flex-row">
                  <div className="select-none flex flex-1 items-center p-4 text-center">
                    <div className="font-medium w-full">
                      {animalName}
                    </div>
                    <div className="font-medium w-full">
                      {lostDate}
                    </div>
                    <div className="font-medium w-full">
                      {processState === 'lost' ? '분실' : '완료'}
                    </div>
                    <div className="font-medium w-full cursor-pointer">
                      <button
                        type="button"
                        onClick={() => changeState(processState, shortId)}
                      >
                        {processState === 'lost' ? '완료처리' : '분실처리'}
                      </button>
                    </div>
                    <div className="font-medium w-full cursor-pointer">
                      <Link to={`/lost/${shortId}`}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </Link>
                    </div>
                    <div className="font-medium w-full cursor-pointer">
                      <button
                        type="button"
                        onClick={() => deleteLostItem(list.shortId)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} /> 삭제
                      </button>
                    </div>
                  </div>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default LostList;

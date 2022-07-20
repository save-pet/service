/* eslint-disable jsx-a11y/label-has-associated-control */
import { React, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RenderList from './RenderList';
// import useFetch from './useFetch';

function RescueList() {
  const [rescueList, setRescueList] = useState([]);
  const [showList, setShowList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [toggleList, setToggleList] = useState(true);
  const [perPage, setPerPage] = useState(15);
  const navigate = useNavigate();

  const getRescue = useCallback(() => {
    axios(
      `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/${process.env.REACT_APP_ROUTER_RESCUE}/rescues?page=${pageNum}&perPage=${perPage}`,
    ).then(({ data }) => {
      setRescueList(data.posts);
      setTotalPage(data.totalPage);
      setShowList(data.posts);
    });
  }, [pageNum, perPage]);
  useEffect(() => getRescue(), [getRescue]);

  function pageHandler(e) {
    if (e.target.innerText === '이전 페이지') {
      if (pageNum === 1) {
        return;
      }
      setPageNum((prev) => prev - 1);
    } else {
      if (pageNum === totalPage) {
        return;
      }
      setPageNum((prev) => prev + 1);
    }
  }
  const [checked, setChecked] = useState([]);
  function checkHandler(e) {
    if (e.target.checked === true) {
      setChecked((prev) => [...prev, e.target.value]);
    } else {
      setChecked((prev) => prev.filter((item) => item !== e.target.value));
    }
  }

  useEffect(() => {
    if (checked.length === 0) {
      setShowList([...rescueList]);
      return;
    }
    const newList = [];
    checked.forEach((checkedItem) => {
      setShowList(() => {
        rescueList.forEach((rescue) => {
          if (rescue.kindCode.includes(checkedItem)) {
            newList.push(rescue);
          }
        });
        return newList;
      });
    });
  }, [checked, rescueList]);

  function handleDropdown(e) {
    setPerPage(e.target.value);
  }
  return (
    <>
      <p className="text-3xl font-normal leading-normal px-16 py-7 text-slate-800">
        구조 리스트
      </p>
      <div className="flex flex-col items-center">
        <div className="flex justify-around items-center h-12">
          <div>
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="checkbox-input"
                name="animal"
                value="개"
                onChange={checkHandler}
              />
              개
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="checkbox-input"
                name="animal"
                value="고양이"
                onChange={checkHandler}
              />
              고양이
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="checkbox-input"
                name="animal"
                value="기타"
                onChange={checkHandler}
              />
              기타
            </label>
          </div>
          <button
            type="button"
            className="btn-light"
            onClick={() => {
              if (toggleList) {
                navigate('/lostMap');
              } else {
                navigate('/');
              }
              setToggleList((toggle) => !toggle);
            }}
          >
            {toggleList ? '지도 보기' : '리스트 보기'}
          </button>
          <div>
            <select className="dropdown" onChange={handleDropdown}>
              <option className="hover:bg-yellow" value="15">
                15개씩 보기
              </option>
              <option className="hover:bg-yellow" value="30">
                30개씩 보기
              </option>
              <option className="hover:bg-yellow" value="60">
                60개씩 보기
              </option>
            </select>
          </div>
        </div>

        <main className="inline-flex flex-wrap justify-center p-5 gap-5">
          <RenderList list={showList} />
        </main>

        <div className="py-7">
          <button
            className="inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            type="button"
            onClick={pageHandler}
          >
            이전 페이지
          </button>
          {`${pageNum}/${totalPage}`}
          <button
            className="inline-flex items-center py-2 px-4 ml-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            type="button"
            onClick={pageHandler}
          >
            다음 페이지
          </button>
        </div>
      </div>
    </>
  );
}

export default RescueList;

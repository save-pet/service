/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { React, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import RenderList from './RenderList';
import Map2ListToggle from '../map/Map2ListToggle';
import Pagination from './Pagination';

function RescueList() {
  const [rescueList, setRescueList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [selected, setSelected] = useState({
    dog: 0,
    cat: 0,
    etc: 0,
  });

  const getRescue = useCallback(
    ({ dog, cat, etc }) => {
      axios(
        `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/${process.env.REACT_APP_ROUTER_RESCUE}/rescues/kind/${dog}/${cat}/${etc}?page=${pageNum}&perPage=${perPage}`,
      ).then(({ data }) => {
        setRescueList(data.posts);
        setTotalPage(data.totalPage);
      });
    },
    [pageNum, perPage],
  );
  useEffect(() => {
    getRescue(selected);
  }, [getRescue, selected]);

  function selectHandler(e) {
    setSelected({ dog: 0, cat: 0, etc: 0 });
    setPageNum(1);
    console.log(e.target);
    if (e.target.id) {
      setSelected((prev) => ({
        ...prev,
        [e.target.id]: 1,
      }));
    }
  }
  function handleDropdown(e) {
    setPerPage(e.target.value);
  }
  return (
    <>
      <div className="px-4 py-5 sm:px-6">
        <div className="text-3xl font-bold text-gray-800">구조 목록</div>
        <p className="mt-3 max-w-2xl text-sm text-gray-500 ">
          구조되어 보호소에 있는 동물 목록입니다.
        </p>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex w-screen justify-between h-12">
          <div className="self-end pl-5">
            <button type="button" className="btn-light" onClick={selectHandler}>
              전체
            </button>
            <button
              type="button"
              className="btn-light"
              onClick={selectHandler}
              id="dog"
            >
              개
            </button>
            <button
              type="button"
              className="btn-light"
              onClick={selectHandler}
              id="cat"
            >
              고양이
            </button>
            <button
              type="button"
              className="btn-light"
              onClick={selectHandler}
              id="etc"
            >
              기타
            </button>

            {/* <label className="checkbox-label" htmlFor="dog-checkbox">
              <input
                type="checkbox"
                className="checkbox-input"
                id="dog-checkbox"
                name="animal"
                value="dog"
                onChange={checkHandler}
              />
              개
            </label>
            <label className="checkbox-label" htmlFor="cat-checkbox">
              <input
                type="checkbox"
                className="checkbox-input"
                id="cat-checkbox"
                name="animal"
                value="cat"
                onChange={checkHandler}
              />
              고양이
            </label>
            <label className="checkbox-label" htmlFor="others-checkbox">
              <input
                type="checkbox"
                className="checkbox-input"
                id="others-checkbox"
                name="animal"
                value="etc"
                onChange={checkHandler}
              />
              기타
            </label> */}
          </div>
          <Map2ListToggle />
          <div className="self-end pr-10">
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

        <main className="inline-flex flex-wrap justify-center p-5">
          <RenderList list={rescueList} />
        </main>
        <Pagination
          pageNum={pageNum}
          totalPage={totalPage}
          setPageNum={setPageNum}
        />
      </div>
    </>
  );
}

export default RescueList;

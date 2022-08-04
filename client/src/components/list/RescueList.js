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
        `${process.env.REACT_APP_SERVER_DOMAIN}/${process.env.REACT_APP_ROUTER_RESCUE}/rescues/kind/${dog}/${cat}/${etc}?page=${pageNum}&perPage=${perPage}`,
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
      <div className="px-5 py-7 md:py-9 md:px-9">
        <div className="text-3xl font-bold text-gray-800">구조 목록</div>
        <p className="mt-3 max-w-2xl text-sm text-gray-500 ">
          구조되어 보호소에 있는 동물 목록입니다.
        </p>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-wrap px-8 md:px-10 w-screen justify-between h-min-12 gap-4">
          <div className="flex self-end basis-1/3 text-sm font-medium text-center text-gray-800 dark:text-gray-400">
            <button type="button" className="btn-tab " onClick={selectHandler}>
              전체
            </button>
            <button
              type="button"
              className="btn-tab"
              onClick={selectHandler}
              id="dog"
            >
              개
            </button>
            <button
              type="button"
              className="btn-tab"
              onClick={selectHandler}
              id="cat"
            >
              고양이
            </button>
            <button
              type="button"
              className="btn-tab"
              onClick={selectHandler}
              id="etc"
            >
              기타
            </button>
          </div>
          <Map2ListToggle className="basis-1/3" />
          <div className="flex justify-end self-end basis-1/3">
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

        <main className="w-screen mx-auto my-0 text-[0px]">
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

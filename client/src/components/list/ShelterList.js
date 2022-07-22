import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ShelterList() {
  const [isLoading, setIsLoading] = useState(false);
  const [shelterList, setShelterList] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);

  const getShelterList = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/shelter/shelters?page=${page}`,
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        },
      );
      setShelterList(data.posts);
      if (page !== 1) return;
      setPage(data.page);
      // setPerPage(data.perPage);
      setTotalPage(data.totalPage);
    } catch (error) {
      alert(error.response.data.reason);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getShelterList();
  }, [page]);

  if (isLoading) return <div>로딩중...</div>;

  return (
    <div>
      <div className="px-4 py-5 sm:px-6">
        <div className="text-3xl font-bold text-gray-800">보호소 목록</div>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 ">
          보호소 선택시 보호소별 구조목록으로 이동합니다.
        </p>
      </div>

      <div className="flex align-center">
        <ul className="flex flex-col divide divide-y w-full text-center ml-">
          <li className="flex flex-row">
            <div className="select-none flex flex-1 items-center p-4">
              <div className="font-bold w-full">보호소</div>
              <div className="font-bold w-full">주소</div>
              <div className="font-bold w-full">전화번호</div>
            </div>
          </li>
          {shelterList &&
            shelterList.map((list) => {
              const { careCode, careName, careAddress, careTel } = list;
              return (
                <div key={careCode}>
                  <li className="flex flex-row">
                    <div className="flex flex-1 items-center p-4 text-center">
                      <div className="font-medium w-full">
                        <Link to={`/shelter/${careCode}`}>{careName}</Link>
                      </div>
                      <div className="font-medium w-full">{careAddress}</div>
                      <div className="font-medium w-full">{careTel}</div>
                    </div>
                  </li>
                </div>
              );
            })}
        </ul>
      </div>
      <div className="py-2 flex flex-row items-center justify-center">
        <button
          className={`inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 ${
            page === 1
              ? 'disabled:opacity-75'
              : 'hover:bg-gray-100 hover:text-gray-700'
          }`}
          type="button"
          disabled={page === 1}
          onClick={(e) => {
            e.preventDefault();
            setPage((prev) => prev - 1);
          }}
        >
          이전 페이지
        </button>
        {`${page}/${totalPage}`}
        <button
          className={`inline-flex items-center py-2 px-4 ml-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 ${
            page === totalPage
              ? 'disabled:opacity-75'
              : 'hover:bg-gray-100 hover:text-gray-700'
          }`}
          type="button"
          disabled={page === totalPage}
          onClick={(e) => {
            e.preventDefault();
            setPage((prev) => prev + 1);
          }}
        >
          다음 페이지
        </button>
      </div>
    </div>
  );
}

export default ShelterList;

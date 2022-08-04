import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function LostDetail() {
  const location = useLocation();
  const [lostList, setLostList] = useState([]);
  const locationId = location.pathname.split('/')[2];

  async function getLost() {
    const { data } = await axios(
      `${process.env.REACT_APP_SERVER_DOMAIN}/api/rescue/${locationId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return data;
  }

  useEffect(() => {
    const getLostFunc = async () => {
      setLostList(await getLost());
    };
    getLostFunc();
  }, []);

  const {
    age,
    careAddress,
    careCode,
    careName,
    colorCode,
    desertionNo,
    happenDate,
    happenPlace,
    imgUrl,
    kindCode,
    noticeEndDate,
    noticeStartDate,
    officeTel,
    processState,
    sexCode,
    specialMark,
    weight,
  } = lostList;

  return (
    <div className="flex flex-col">
      <div className="inline-flex flex-wrap px-4 py-5 sm:px-6 gap-3 items-end">
        <div className="text-3xl font-bold text-gray-800">구조 상세</div>
        <p className="ml-2 max-w-2xl text-sm text-gray-500 ">
          구조된 동물의 세부사항을 확인할 수 있습니다.
        </p>
      </div>
      <div className="inline-flex flex-wrap justify-center mx-auto my-0 p-7">
        <img
          src={imgUrl}
          alt="rescued animal"
          className="w-96 h-full object-cover"
        />
        <div className="grid content-between p-[2vw] w-full md:w-[50vw]">
          <div className="border-y w-full mb-[5vh]">
            <div className="divide divide-y divide-gray-200">
              <div className="grid-head">
                <div className="grid-content">나이</div>
                <div className="col-span-3">{age}</div>
                <div className="grid-content">색</div>
                <div className="col-span-3"> {colorCode}</div>
              </div>
              <div className="grid-head">
                <div className="grid-content">종</div>
                <div className="col-span-3"> {kindCode}</div>
                <div className="grid-content">성별</div>
                <div className="col-span-3"> {sexCode}</div>
              </div>
              <div className="grid-head">
                <div className="grid-content">몸무게</div>
                <div className="col-span-3"> {weight}</div>
                <div className="grid-content">유기번호</div>
                <div className="col-span-3"> {desertionNo}</div>
              </div>
              <div className="grid-head">
                <div className="grid-content">발견 장소</div>
                <div className="col-span-3"> {happenPlace}</div>
                <div className="grid-content">발견날짜</div>
                <div className="col-span-3"> {happenDate}</div>
              </div>
              <div className="grid-head">
                <div className="grid-content">특이 사항</div>
                <div className="col-span-3"> {specialMark}</div>
                <div className="grid-content">현재 상태</div>
                <div className="col-span-3"> {processState}</div>
              </div>
              <div className="grid-head">
                <div className="grid-content">공고 시작일</div>
                <div className="col-span-3"> {noticeStartDate}</div>
                <div className="grid-content">공고 종료일</div>
                <div className="col-span-3"> {noticeEndDate}</div>
              </div>
              <div className="grid-head">
                <div className="grid-content">보호소</div>
                <div className="col-span-3"> {careName}</div>
                <div className="grid-content">보호소 주소</div>
                <div className="col-span-3"> {careAddress}</div>
              </div>
              <div className="grid-head">
                <div className="grid-content">보호소 코드</div>
                <div className="col-span-3"> {careCode}</div>
                <div className="grid-content">보호소 번호</div>
                <div className="col-span-3"> {officeTel}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LostDetail;

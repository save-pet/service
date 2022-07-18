import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function LostDetail() {
  const location = useLocation();
  const [lostList, setLostList] = useState([]);
  const locationId = location.pathname.split('/')[2];

  async function getLost() {
    const { data } = await axios(
      `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/rescue/${locationId}`,
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
    console.log(locationId);
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
    <>
      {/* <img src={filename} alt="rescued animal" /> */}

      <div>
        <img
          src={imgUrl}
          alt="rescued animal"
          style={{
            width: '350px',
            height: '270px',
            objectFit: 'cover',
          }}
        />
        <div>나이: {age}</div>
        <div>보호소: {careName}</div>
        <div>보호소 주소: {careAddress}</div>
        <div>보호소 코드: {careCode}</div>
        <div>보호소 전화번호: {officeTel}</div>
        <div>색: {colorCode}</div>
        <div>종: {kindCode}</div>
        <div>성별: {sexCode}</div>
        <div>몸무게: {weight}</div>
        <div>desertionNo: {desertionNo}</div>
        <div>발견 장소: {happenPlace}</div>
        <div>발견 날짜: {happenDate}</div>
        <div>특이 사항: {specialMark}</div>
        <div>현재 상태: {processState}</div>
        <div>공고 시작일: {noticeStartDate}</div>
        <div>공고 종료일: {noticeEndDate}</div>
      </div>
    </>
  );
}

export default LostDetail;

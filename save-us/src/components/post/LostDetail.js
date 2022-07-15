import React, { useState, useEffect } from 'react';
// import { useLocation, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function LostDetail() {
  const location = useLocation();
  const [lostList, setLostList] = useState([]);
  const locationId = location.pathname.split('/')[2];
  // console.log(location.pathname.split('/'));

  async function handleClickDelete() {
    if (
      window.confirm('삭제하시겠습니까? 삭제된 데이터는 복구할 수 없습니다.')
    ) {
      const res = await fetch(
        `http://localhost:5000/api/lost/delete/${locationId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await res.json();
      window.location.replace('/lost/list');

      console.log(data);
      return data;
    }
    return false;
  }

  async function getLost() {
    const res = await fetch(`http://localhost:5000/api/lost/${locationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    console.log(data);
    return data;
  }

  useEffect(() => {
    const getLostFunc = async () => {
      setLostList(await getLost());
    };
    getLostFunc();
    console.log(locationId);
  }, []);

  const { lostDate, address, animalName, detail, processState } = lostList;

  return (
    <>
      {/* <img src={filename} alt="rescued animal" /> */}
      {/* <button>
      <Link to=`${location}/edit`>수정</Link>

      </button> */}
      <button type="button" onClick={handleClickDelete}>
        삭제
      </button>
      <div style={{ backgroundColor: '#ffd149', fontStyle: 'none' }}>
        <div>접수일: {lostDate}</div>
        <div>발견장소: {address}</div>
        <div>이름: {animalName}</div>
        <div>특이 사항: {detail}</div>
        <div>현재 상태: {processState}</div>
      </div>
    </>
  );
}

export default LostDetail;

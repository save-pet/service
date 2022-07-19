import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

function LostDetail() {
  const location = useLocation();
  const [lostList, setLostList] = useState([]);
  const locationId = location.pathname.split('/')[2];
  // console.log(location.pathname.split('/'));
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function handleClickDelete() {
    const navigate = useNavigate;
    if (
      window.confirm('삭제하시겠습니까? 삭제된 데이터는 복구할 수 없습니다.')
    ) {
      const { data } = await axios(
        `http://localhost:5000/api/lost/delete/${locationId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      navigate('/lost/list');

      console.log(data);
      return data;
    }
    return false;
  }
  const getUserInfo = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/user/`,
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        },
      );
      await setUserInfo(data);

      console.log(userInfo);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  async function getLost() {
    const { data } = await axios(
      `http://localhost:5000/api/lost/${locationId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log(data);
    return data;
  }

  useEffect(() => {
    const getLostFunc = async () => {
      setLostList(await getLost());
    };
    getLostFunc();
    getUserInfo();
    console.log(locationId);
  }, []);

  const { lostDate, address, animalName, detail, processState, image } =
    lostList;
  if (isLoading) return <div>로딩중...</div>;
  return (
    <>
      <button type="button" onClick={handleClickDelete}>
        삭제
      </button>

      <button type="button">
        <Link to="edit">수정</Link>
      </button>
      <div>
        <img
          src={`${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/static/${image}`}
          alt="rescued animal"
          style={{
            width: '350px',
            height: '270px',
            objectFit: 'cover',
          }}
        />
        <div style={{ backgroundColor: '#ffd149', fontStyle: 'none' }}>
          <div>이름: {animalName}</div>

          <div>접수일: {lostDate}</div>
          <div>분실 장소: {address}</div>
          <div>특이 사항: {detail}</div>
          <div>현재 상태: {processState}</div>
        </div>
      </div>
    </>
  );
}

export default LostDetail;

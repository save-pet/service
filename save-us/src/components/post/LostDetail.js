/* eslint no-underscore-dangle: "warn" */

import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

function LostDetail() {
  const location = useLocation();
  const [lostList, setLostList] = useState([]);
  const locationId = location.pathname.split('/')[2];
  // console.log(location.pathname.split('/'));
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const checkId = () => {
    if (userInfo._id === lostList.userId) {
      return true;
    }
    return false;
  };
  async function handleClickDelete() {
    const navigate = useNavigate;
    if (checkId()) {
      if (
        window.confirm('삭제하시겠습니까? 삭제된 데이터는 복구할 수 없습니다.')
      ) {
        await axios(`http://localhost:5000/api/lost/delete/${locationId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        navigate('/lost/list');
      }
    } else {
      alert('본인이 작성한 게시물만 삭제할 수 있습니다.');
      return false;
    }
    return false;
  }
  const handleClickEdit = () => {
    // const navigate = useNavigate();
    if (checkId()) {
      // navigate('edit');
      window.location.href = `${locationId}/edit`;
    } else {
      alert('본인이 작성한 게시물만 수정할 수 있습니다.');
    }
  };
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
  const getLost = async () => {
    const { data } = await axios(
      `http://localhost:5000/api/lost/${locationId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    setLostList(data);
    console.log(lostList);
  };

  useEffect(() => {
    const asyncFn = async () => {
      await getLost();
      await getUserInfo();
    };

    asyncFn().then();
  }, []);

  const { lostDate, address, animalName, detail, processState, image } =
    lostList;
  if (isLoading) return <div>로딩중...</div>;
  return (
    <>
      <button type="button" onClick={handleClickDelete}>
        삭제
      </button>

      <button type="button" onClick={handleClickEdit}>
        {/* <Link to="edit">수정</Link> */}
        수정
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
          <div>발견장소: {address}</div>
          <div>특이 사항: {detail}</div>
          <div>현재 상태: {processState}</div>
        </div>
      </div>
    </>
  );
}

export default LostDetail;

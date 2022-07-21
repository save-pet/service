/* eslint no-underscore-dangle: "warn" */

import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

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
    // const navigate = useNavigate;
    if (checkId()) {
      if (
        window.confirm('삭제하시겠습니까? 삭제된 데이터는 복구할 수 없습니다.')
      ) {
        await axios(
          `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/lost/delete/${locationId}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        ).then((window.location.href = '/lost/list'));
        // navigate('/lost/list');
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
      `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/lost/${locationId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    setLostList(data);
  };

  useEffect(() => {
    const asyncFn = async () => {
      await getLost();
      await getUserInfo();
    };

    asyncFn().then();
  }, []);

  useEffect(() => {
    const asyncFn = async () => {
      await getLost();
    };
    asyncFn();
  }, [lostList]);
  const { lostDate, address, animalName, detail, processState, image, radius } =
    lostList;
  if (isLoading) return <div>로딩중...</div>;
  return (
    <div>
      <div className="px-4 py-5 sm:px-6 flex items-end">
        <div className="text-3xl font-bold text-gray-800">분실 상세</div>
        <p className="ml-2 max-w-2xl text-sm text-gray-500 ">
          회원님이 등록한 분실 신고를 확인할 수 있습니다.
        </p>
      </div>
      <div className="flex justify-center pt-10">
        <img
          src={`${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/static/${image}`}
          alt="rescued animal"
          className="w-96 h-auto"
        />
        <div className="grid gap-2 content-between w-1/2 ml-4 mr-4">
          <div className="text-4xl font-bold tracking-tight text-gray-900 pl-4">
            {animalName}
          </div>
          <div className="border-y w-full mb-40">
            <div className="divide divide-y divide-gray-200">
              <div className="grid grid-cols-3 p-4">
                <div className="font-bold col-sapn-1">실종일</div>
                <div>{lostDate}</div>
              </div>
              <div className="grid grid-cols-3 p-4">
                <div className="font-bold col-sapn-1">분실 장소</div>
                <div>{address}</div>
              </div>
              <div className="grid grid-cols-3 p-4">
                <div className="font-bold col-sapn-1">특이 사항</div>
                <div>{detail}</div>
              </div>
              <div className="grid grid-cols-3 p-4">
                <div className="font-bold col-sapn-1">연락받을 반경(km)</div>
                <div>{radius}</div>
              </div>
              <div className="grid grid-cols-3 p-4">
                <div className="font-bold col-sapn-1">현재 상태</div>
                <div>{processState === 'lost' ? '분실' : '완료'}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleClickEdit}
              className="mr-2 btn-submit"
            >
              <FontAwesomeIcon icon={faPencil} />
              수정하기
            </button>
            <button
              type="button"
              onClick={handleClickDelete}
              className="btn-submit"
            >
              <FontAwesomeIcon icon={faTrash} />
              삭제하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LostDetail;

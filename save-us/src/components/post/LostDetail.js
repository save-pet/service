/* eslint no-underscore-dangle: "warn" */

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
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
    <div>
      <div className="flex justify-center pt-10">
        <img
          src={`${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/static/${image}`}
          alt="rescued animal"
          className="w-auto h-128"
        />
        <div className="grid gap-2 content-between w-1/2 ml-4 mr-4">
          <div className="text-4xl font-bold tracking-tight text-gray-900 pl-4">
            {animalName}
          </div>
          <div className="border-y w-full mb-40">
            <div className="divide divide-y divide-gray-200">
              <div className="grid grid-cols-3 p-4">
                <div className="font-bold col-sapn-1">접수일</div>
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
                <div className="font-bold col-sapn-1">현재 상태</div>
                <div>{processState}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleClickEdit}
              className="py-2 px-4 mt-1 mr-2 bg-[#ffa000]  hover:text-gray-700 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none rounded-lg"
            >
              <FontAwesomeIcon icon={faPencil} />
              <Link to="edit">수정하기</Link>
            </button>
            <button
              type="button"
              onClick={handleClickDelete}
              className="py-2 px-4 mt-1 bg-[#ffa000]  hover:text-gray-700 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none rounded-lg"
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

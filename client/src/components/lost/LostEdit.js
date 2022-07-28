import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import ModalButton from '../modal/ModalButton';
import LostPostMap from './LostPostMap';

function LostEdit() {
  const location = useLocation();
  const locationId = location.pathname.split('/')[2];
  const [isLoading, setIsLoading] = useState(false);
  const [lostDetail, setLostDetail] = useState();
  const [address, setAddress] = useState('');
  const [addressName, setAddressName] = useState('');
  const navigate = useNavigate();

  const getLostDetail = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/lost/${locationId}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setLostDetail(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeLost = (event) => {
    const { name, value } = event.target;
    setLostDetail({
      ...lostDetail,
      [name]: value,
    });
  };

  const onSubmit = () => {
    axios.patch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/${process.env.REACT_APP_ROUTER_EDIT}/${locationId}`,
      {
        address: addressName,
        animalName: lostDetail.animalName,
        createdAt: lostDetail.createdAt,
        detail: lostDetail.detail,
        image: lostDetail.image,
        latitude: address.lat,
        longitude: address.lng,
        lostDate: lostDetail.lostDate,
        processState: 'lost',
        radius: lostDetail.radius,
        shortId: lostDetail.shortId,
        updatedAt: lostDetail.updatedAt,
        userId: lostDetail.userId,
        __v: 0,
      },
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      },
    );
    navigate(`/lost/${locationId}`);
  };
  useEffect(() => {
    getLostDetail();
  }, []);

  if (isLoading) return <div>로딩중...</div>;
  return (
    <div>
      {lostDetail && (
        <div>
          <div className="px-4 py-5 sm:px-6 flex items-end">
            <div className="text-3xl font-bold text-gray-800">분실 수정</div>
            <p className="ml-2 max-w-2xl text-sm text-gray-500 ">
              회원님이 등록한 분실 신고를 수정할 수 있습니다.
            </p>
          </div>
          <form className="flex justify-center pt-10">
            <img
              src={`${process.env.REACT_APP_SERVER_DOMAIN}/static/${lostDetail.image}`}
              alt="rescued animal"
              className="w-96 h-auto"
            />
            <div className="grid gap-2 content-between w-1/2 ml-4 mr-4">
              <div className="text-4xl font-bold tracking-tight text-gray-900 pl-4">
                {lostDetail.animalName}
              </div>
              <div className="border-y w-full mb-40">
                <div className="divide divide-gray-200">
                  <div className="grid grid-cols-3 p-4">
                    <div className="font-bold col-sapn-1">실종일</div>
                    <input
                      name="lostDate"
                      type="date"
                      value={lostDetail.lostDate}
                      onChange={handleChangeLost}
                    />
                  </div>
                  <div className="grid grid-cols-3 p-4">
                    <div className="font-bold col-sapn-1">실종장소</div>
                    <p>{addressName || lostDetail.address}</p>
                    <ModalButton
                      buttonName="지도 열기"
                      title="지도"
                      content={
                        <LostPostMap
                          setAddress={setAddress}
                          setAddressName={setAddressName}
                        />
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 p-4">
                  <div className="font-bold col-sapn-1">특이사항</div>
                  <input
                    name="detail"
                    type="text"
                    value={lostDetail.detail}
                    placeholder="특이사항"
                    onChange={handleChangeLost}
                  />
                </div>
                <div className="grid grid-cols-3 p-4">
                  <div className="font-bold col-sapn-1">연락받을 반경(km)</div>
                  <input
                    name="radius"
                    type="number"
                    value={lostDetail.radius}
                    placeholder="단위 : km"
                    onChange={handleChangeLost}
                  />
                </div>
                <div className="grid grid-cols-3 p-4">
                  <div className="font-bold col-sapn-1">현재상태</div>
                  <div>
                    {lostDetail.processState === 'lost' ? '분실' : '완료'}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button type="submit" onClick={onSubmit} className="btn-submit">
                  등록하기
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default LostEdit;

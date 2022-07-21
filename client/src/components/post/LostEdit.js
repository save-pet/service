import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function LostEdit() {
  const location = useLocation();
  const locationId = location.pathname.split('/')[2];
  const [isLoading, setIsLoading] = useState(false);
  const [lostDetail, setLostDetail] = useState();

  const getLostDetail = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/lost/${locationId}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      await setLostDetail(data);
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
      `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/lost/edit/${locationId}`,
      {
        address: lostDetail.address,
        animalName: lostDetail.animalName,
        createdAt: lostDetail.createdAt,
        detail: lostDetail.detail,
        image: 'ss',
        latitude: 36.345230105406095,
        longitude: 127.45200281799188,
        lostDate: lostDetail.lostDate,
        processState: 'lost',
        radius: 50,
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
    console.log('변경되었습니다.');
    window.location.replace(`/lost/${locationId}`);
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
              src={`${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/static/${lostDetail.image}`}
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
                    <div className="font-bold col-sapn-1">접수일</div>
                    <div>{lostDetail.lostDate}</div>
                  </div>
                  <div className="grid grid-cols-3 p-4">
                    <div className="font-bold col-sapn-1">실종장소</div>
                    <input />
                    {/* <ModalButton
                    buttonName="지도 열기"
                    title="지도"
                    content={
                      <LostPostMap
                        address={address}
                        setAddress={setAddress}
                        addressName={addressName}
                        setAddressName={setAddressName}
                      />
                    }
                              />
                              {addressName} */}
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
                  <div className="font-bold col-sapn-1">현재상태</div>
                  <div>{lostDetail.processState}</div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  onClick={onSubmit}
                  className="btn-submit"
                >
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

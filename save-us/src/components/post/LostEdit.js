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
    // const res = await fetch(`http://localhost:5000/api/lost/${locationId}`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    // const data = await res.json();
    // console.log(data);
    // return data;
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
        <form>
          <img
            src={`${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/static/${lostDetail.image}`}
            alt="rescued animal"
            style={{
              width: '350px',
              height: '270px',
              objectFit: 'cover',
            }}
          />
          <div style={{ backgroundColor: '#ffd149', fontStyle: 'none' }}>
            <div>
              이름:{' '}
              <input
                name="animalName"
                type="text"
                value={lostDetail.animalName}
                placeholder="이름"
                onChange={handleChangeLost}
              />
            </div>
            <div>
              접수일:{' '}
              <input
                name="lostDate"
                type="date"
                value={lostDetail.lostDate}
                placeholder="접수일"
                onChange={handleChangeLost}
                readOnly
                disabled
              />
            </div>
            <div>
              실종 장소 :
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

            <div>
              특이 사항:{' '}
              <input
                name="detail"
                type="text"
                value={lostDetail.detail}
                placeholder="특이사항"
                onChange={handleChangeLost}
              />
            </div>
            <div>
              현재 상태:{' '}
              <input
                name="processState"
                type="text"
                value={lostDetail.processState}
                placeholder="현재 상태"
                readOnly
                disabled
              />
            </div>
          </div>
          <button type="submit" onClick={onSubmit}>
            등록하기
          </button>
        </form>
      )}
    </div>
  );
}

export default LostEdit;

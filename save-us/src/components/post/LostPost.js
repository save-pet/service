import { React, useState, useEffect } from 'react';
import axios from 'axios';

import PostImg from './LostPostImg';
import ModalButton from '../modal/ModalButton';
import LostPostMap from './LostPostMap';

export default function InputData() {
  const [animalName, setAnimalName] = useState();
  const [animalSpecies, setAnimalSpecies] = useState('');
  const [lostDate, setLostDate] = useState('');
  const [phoneNumber2, setPhoneNumber2] = useState();
  const [detail, setDetail] = useState('');
  const [address, setAddress] = useState('');
  const [addressName, setAddressName] = useState('');
  const [radius, setRadius] = useState();

  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeAnimalName = ({ target: { value } }) =>
    setAnimalName(value);
  const handleAnimalSpecies = ({ target: { value } }) =>
    setAnimalSpecies(value);
  const handleLostDate = ({ target: { value } }) => setLostDate(value);
  const handlePhoneNumber2 = ({ target: { value } }) => setPhoneNumber2(value);
  const handleDetail = ({ target: { value } }) => setDetail(value);
  const handleRadius = ({ target: { value } }) => setRadius(value);

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
      setUserInfo(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { result } = await axios('http://localhost:5000/api/lost/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        animalName,
        lostDate,
        address: addressName,
        detail,
        image: 'ss',
        processState: 'lost',
        latitude: address.lat,
        longitude: address.lng,
      }),
    });
    console.log(result);
    console.log(addressName);

    // axios 활용한 분실등록 API
    // if (!animalName || !lostDate || !addressName || !detail) {
    //   alert('빈칸을 작성해주세요.');
    //   return;
    // }

    // try {
    //   await axios({
    //     url: `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/lost/post}`,
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json; charset=utf-8',
    //       authorization: `Bearer ${sessionStorage.getItem('token')}`,
    //     },
    //     data: {
    //       animalName,
    //       lostDate,
    //       address: addressName,
    //       detail,
    //       image: 'ss',
    //       processState: 'lost',
    //       latitude: address.lat,
    //       longitude: address.lng,
    //     },
    //   });
    //   alert('분실 등록이 되었습니다.');
    //   return;
    // } catch (error) {
    //   alert(error.response.data.reason);
    // }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  if (isLoading) return <div>로딩중...</div>;

  return (
    <form>
      <div>
        반려 동물 이름 :
        <input
          name="반려 동물 이름"
          value={animalName}
          type="string"
          onChange={handleChangeAnimalName}
        />
      </div>
      <div>
        품종 :
        <input
          type="text"
          list="animalSpecies"
          value={animalSpecies}
          onChange={handleAnimalSpecies}
        />
      </div>
      <datalist id="animalSpecies">
        <option value="믹스견">믹스견</option>
        <option value="푸들">푸들</option>
        <option value="비숑">비숑</option>
      </datalist>
      <div>
        실종 날짜 :
        <input type="date" value={lostDate} onChange={handleLostDate} />
      </div>
      <div>
        실종 장소 :
        <ModalButton
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
        {addressName}
      </div>
      <div>
        보호자 연락처1 :
        <input type="tel" value={userInfo.phoneNumber} readOnly disabled />
      </div>
      <div>
        보호자 연락처2 :
        <input
          type="phoneNumber"
          value={phoneNumber2}
          onChange={handlePhoneNumber2}
          placeholder="010-1234-5678"
        />
      </div>
      <div>
        특이 사항 <input type="text" value={detail} onChange={handleDetail} />
      </div>
      <div>
        연락받을 반경 선택(km)
        <input type="number" value={radius} onChange={handleRadius} />
      </div>
      <PostImg />
      <button type="submit" onClick={onSubmit}>
        등록하기
      </button>
    </form>
  );
}

import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PostImg from './LostPostImg';
import ModalButton from '../modal/ModalButton';
import LostPostMap from './LostPostMap';
import LoginContent from '../../_layout/LoginContent';
import ModalWindow from '../modal/ModalWindow';

export default function InputData() {
  const BTN_CLASS =
    'ml-80 py-2 px-4 mt-1 mb-10 bg-[#ffa000]  hover:font-extrabold text-white w-28 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none rounded-lg';
  const BTN_CLASS_DISABLED =
    'ml-80 py-2 px-4 mt-1 mb-10 bg-[#ffd149] text-white w-28 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none rounded-lg';

  const [animalName, setAnimalName] = useState();
  const [lostDate, setLostDate] = useState('');
  const [phoneNumber2, setPhoneNumber2] = useState();
  const [detail, setDetail] = useState('');
  const [address, setAddress] = useState('');
  const [addressName, setAddressName] = useState('');
  const [radius, setRadius] = useState();
  const [image, setImage] = useState();
  const [btnText, setBtnText] = useState('등록하기');
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);

  const [userInfo, setUserInfo] = useState({});
  const [isLogIn, setIsLogIn] = useState(true);
  const navigate = useNavigate();
  const handleChangeAnimalName = ({ target: { value } }) =>
    setAnimalName(value);

  const handleLostDate = ({ target: { value } }) => setLostDate(value);
  const handlePhoneNumber2 = ({ target: { value } }) => setPhoneNumber2(value);
  const handleDetail = ({ target: { value } }) => setDetail(value);
  const handleRadius = ({ target: { value } }) => setRadius(value);
  const saveImage = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      await axios({
        url: `${process.env.REACT_APP_SERVER_DOMAIN}/api/lost/upload`,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        data: formData,
      });
    } catch (error) {
      alert(error);
    }
  };

  const getUserInfo = async () => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_DOMAIN}/${process.env.REACT_APP_ROUTER_USER}`,
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        },
      )
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!animalName || !radius || !addressName || !image || !lostDate) {
      alert('빈칸을 작성해주세요.');
      return;
    }
    if (radius > 400 || radius < 1) {
      alert('0부터 400까지의 숫자 중에 입력해주세요.');
      return;
    }

    setBtnText('등록중...');
    setBtnDisabled(true);

    saveImage();
    try {
      axios({
        url: `${process.env.REACT_APP_SERVER_DOMAIN}/api/lost/post`,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        data: {
          animalName,
          lostDate,
          address: addressName,
          detail,
          image: image.name,
          processState: 'lost',
          latitude: address.lat,
          longitude: address.lng,
          radius,
        },
      }).then(() => {
        alert('분실 등록이 성공적으로 완료되었습니다.');
        navigate('/lost/list');
      });
    } catch (error) {
      alert('분실 등록에 문제가 생겼습니다: ', error);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setIsLogIn(false);
      getUserInfo();
    }
  }, []);
  if (isLogIn)
    return (
      <ModalWindow
        open={modalOpen}
        close={() => setModalOpen(false)}
        header="로그인"
        content={<LoginContent locationPath={window.location.pathname} />}
      >
        {' '}
      </ModalWindow>
    );
  return (
    <div className="flex flex-row justify-center z-0">
      <form className="mt-8">
        <div className="px-4 py-5 sm:px-6">
          <div className="text-3xl font-bold text-gray-800">분실 등록</div>
          <p className="mt-3 max-w-2xl text-sm text-gray-500 ">
            근처에서 구조된 동물이 있을 때 알림을 받으려면 분실 등록을 해주세요.
          </p>
        </div>
        <div className="flex flex-col mb-2">
          <div className="flex relative">
            <span className="w-1/3 rounded-l-md inline-flex  items-center px-5 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
              반려 동물 이름
            </span>
            <input
              name="반려 동물 이름"
              value={animalName}
              type="string"
              onChange={handleChangeAnimalName}
              className="text-center rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-3 px-20 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-[#ffa000]   focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex flex-col mb-2">
          <div className="flex relative">
            <span className="w-1/3 rounded-l-md inline-flex  items-center px-5 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
              실종 날짜
            </span>

            <input
              type="date"
              value={lostDate}
              onChange={handleLostDate}
              className="text-center rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-3 px-20 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-[#ffa000]   focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex flex-col mb-2">
          <div className="flex relative">
            <span className="w-1/3 rounded-l-md inline-flex  items-center px-5 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
              실종 장소
            </span>
            <button
              type="button"
              className="text-center rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-3 px-20 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-[#ffa000]   focus:border-transparent"
            >
              <ModalButton
                buttonName="지도 열기"
                title="지도"
                content={
                  <LostPostMap
                    setAddress={setAddress}
                    setAddressName={setAddressName}
                    setRadius={setRadius}
                  />
                }
              />
            </button>
          </div>
          <div className="flex relative">
            {addressName && (
              <p className="mx-2 my-1 text-sm text-[#ffa000] text-center">
                반려동물을 잃어버린 장소는 {addressName} 부근입니다.
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col mb-2">
          <div className="flex relative">
            <span className="w-1/3 rounded-l-md inline-flex  items-center px-5 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
              보호자 연락처1
            </span>

            <input
              type="tel"
              value={userInfo.phoneNumber}
              readOnly
              disabled
              className="text-center rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-3 px-20 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-[#ffa000]   focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex flex-col mb-2">
          <div className="flex relative">
            <span className="w-1/3 rounded-l-md inline-flex  items-center px-5 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
              보호자 연락처2
            </span>
            <input
              type="phoneNumber"
              value={phoneNumber2}
              onChange={handlePhoneNumber2}
              placeholder="010-1234-5678"
              className="text-center rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-3 px-20 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-[#ffa000]   focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex flex-col mb-2">
          <div className="flex relative">
            <span className="w-1/3 rounded-l-md inline-flex  items-center px-5 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
              특이 사항
            </span>
            <input
              type="text"
              value={detail}
              onChange={handleDetail}
              className="text-center rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-3 px-20 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-[#ffa000]   focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex flex-col mb-2">
          <div className="flex relative">
            <span className="w-1/3 rounded-l-md inline-flex  items-center px-5 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
              연락받을 반경(km)
            </span>
            <input
              type="number"
              min="0"
              max="400"
              value={radius}
              onChange={handleRadius}
              className="text-center rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-3 px-20 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-[#ffa000]   focus:border-transparent"
            />
          </div>
          <div className="flex flex-col mb-2">
            <div className="flex relative justify-center">
              <p className="mx-2 my-1 text-sm text-gray-400 text-start">
                반경은 최소 0에서 최대 400까지 입력 가능합니다. <br />
                반경이 너무 클 경우 알림이 과도하게 갈 수 있으니 신중하게
                입력해주세요.
                <br />
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-2">
          <PostImg image={image} setImage={setImage} />
        </div>
        <button
          type="submit"
          onClick={onSubmit}
          disabled={btnDisabled}
          className={btnDisabled ? BTN_CLASS_DISABLED : BTN_CLASS}
        >
          {btnText}
        </button>
      </form>
    </div>
  );
}

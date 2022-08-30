/* eslint-disable no-underscore-dangle */

import { React, useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import axios from 'axios';
import { SpinningCircles } from 'react-loading-icons';
import PropTypes from 'prop-types';
import Map2ListToggle from './Map2ListToggle';
import MapRenderList from '../list/MapRenderList';

function InfoWindowContent({ data }) {
  return (
    <div className="px-[20px] py-[15px] w-[220px] text-left">
      <div className="text-black">
        <span className="notranslate">
          <ul>
            <li className="text-sm">{data.careName}</li>
          </ul>
        </span>
      </div>
    </div>
  );
}

function getInfoWindowData(data) {
  return data.map((obj) => ({
    content: <InfoWindowContent data={obj} />,
    latlng: { lat: obj.latitude, lng: obj.longitude },
    id: obj._id,
    careCode: obj.careCode,
  }));
}

function Aside({ rescueList }) {
  const getAsideTitle = () => {
    let result;
    if (rescueList.length === 0) {
      result = '해당 보호소에는 보호동물이 없습니다.';
    } else {
      const careNameList = rescueList.map((rescue) => rescue.careName);
      const careNameSet = new Set(careNameList);
      result = careNameSet;
    }
    return result;
  };

  return (
    <div
      id="menu_wrap"
      className="absolute w-96 h-[78vh] top-10 left-0 bottom-0 mt-0 mr-0 mb-30 ml-30 p-2 overflow-y-auto z-10 bg-white text-center"
    >
      <div className="text-center font-bold m-3">
        {getAsideTitle(rescueList)}
      </div>
      <ul id="rescueList">
        <MapRenderList list={rescueList} />
      </ul>
    </div>
  );
}
function EventMarkerContainer({ position, content, careCode, onMarkerClick }) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <MapMarker
      position={position}
      onClick={() => {
        onMarkerClick(careCode);
      }}
      onMouseOver={() => setIsVisible(true)}
      onMouseOut={() => setIsVisible(false)}
      image={{
        src: 'https://i.ibb.co/MsqtRCN/pin.png',
        size: {
          width: 64,
          height: 69,
        },
        options: {
          offset: {
            x: 27,
            y: 69,
          },
        },
      }}
    >
      {isVisible && content}
    </MapMarker>
  );
}

function MapView() {
  const [makeShelterList, setShelterList] = useState([]);
  const [rescueList, setRescueList] = useState([]);
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const getShelterData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios({
        url: `${process.env.REACT_APP_SERVER_DOMAIN}/api/shelter`,
        method: 'GET',
      });
      setShelterList(data);
    } catch (error) {
      alert(error.response.data.reason);
    } finally {
      setIsLoading(false);
    }
  };

  const getRescueDataByShelter = async (careCode) => {
    try {
      const { data } = await axios({
        url: `${process.env.REACT_APP_SERVER_DOMAIN}/api/rescue/care-code/${careCode}`,
        method: 'GET',
      });
      setRescueList(data);
    } catch (error) {
      alert(error.response.data.reason);
    }
  };

  const findMyLocation = () => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        },
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false,
      }));
    }
  };

  useEffect(() => {
    const asyncGetData = async () => {
      await getShelterData();
    };
    findMyLocation();
    asyncGetData().then();
  }, []);

  const shelterList = getInfoWindowData(makeShelterList);
  if (isLoading)
    return (
      <div className="flex justify-center items-center	 w-100 h-screen">
        <SpinningCircles fill="#EDA900" stroke="#997000" />
      </div>
    );
  return (
    <div id="map_wrap" className="relative w-full h-96 m-0 p-0">
      <div id="map" className="relative w-full h-full">
        <p className="mx-2 my-1 text-sm text-gray-400">
          *핀 위에 마우스를 올리면 해당 위치에서 구조된 동물을 볼 수 있으며,
          핀을 클릭하면 구조 동물 상세로 이동합니다.
          <br />
          **현재 버전은 배포 상 보안의 문제로 지도에서 현재 위치를 사용할 수
          없습니다. 기본 위치는 제주도이니 스크롤 및 줌인/줌아웃으로 지도를
          움직여 주세요.
        </p>
        <div className="relative">
          <div className="h-12 z-10 absolute top-[3vh] mx-auto inset-x-0 text-center opacity-80">
            <Map2ListToggle />
          </div>

          <Map // 지도를 표시할 Container
            center={state.center}
            className="w-full h-[77vh]"
            level={3} // 지도의 확대 레벨
          >
            {!state.isLoading && (
              <MapMarker position={state.center}>
                <div className="p-[5px] text-black">
                  {state.errMsg ? state.errMsg : '현재 위치'}
                </div>
              </MapMarker>
            )}
            {shelterList.map((shelter) => (
              <div key={shelter.careCode}>
                <EventMarkerContainer
                  key={`EventMarkerContainer-${shelter.latlng.lat}-${shelter.latlng.lng}`}
                  position={shelter.latlng}
                  content={shelter.content}
                  careCode={shelter.careCode}
                  onMarkerClick={getRescueDataByShelter}
                />
              </div>
            ))}
          </Map>
        </div>
      </div>
      <Aside rescueList={rescueList} />
    </div>
  );
}

export default MapView;

InfoWindowContent.propTypes = {
  data: PropTypes.shape().isRequired,
};
EventMarkerContainer.propTypes = {
  position: PropTypes.shape().isRequired,
  content: PropTypes.element.isRequired,
  careCode: PropTypes.string.isRequired,
  onMarkerClick: PropTypes.func.isRequired,
};

Aside.propTypes = {
  rescueList: PropTypes.arrayOf(PropTypes.element).isRequired,
};

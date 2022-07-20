/*eslint-disable */
import { React, useEffect, useState } from 'react';
import { Map, MapMarker, useMap } from 'react-kakao-maps-sdk';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Map2ListToggle from '../main/Map2ListToggle';

function InfoWindowContent({ data }) {
  const latest = data.noticeStartDate;
  const latestDate = new Date(
    `${latest.substring(0, 4)}-${latest.substring(4, 6)}-${latest.substring(
      6,
    )}`,
  );
  const today = new Date();
  const diffDate = Math.ceil(
    (latestDate.getTime() - today.getTime()) / (1000 * 3600 * 24),
  );

  return (
    <InfoWindowDiv>
      <div style={{ color: '#000' }}>
        <span className="notranslate">
          <ul>
            <li className="font-semibold">{data.careName}</li>
            <li className="text-xs text-gray-400">최근 공고 {diffDate}일 전</li>
            <img
              src={data.imgUrl}
              style={{
                width: '200px',
              }}
            ></img>
          </ul>
        </span>
      </div>
    </InfoWindowDiv>
  );
}

function getInfoWindowData(data) {
  return data.map((obj) => {
    return {
      content: <InfoWindowContent data={obj}></InfoWindowContent>,
      latlng: { lat: obj.happenLatitude, lng: obj.happenLongitude },
      id: obj.careCode,
    };
  });
}

function EventMarkerContainer({ position, content, id }) {
  const map = useMap();
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  return (
    <MapMarker
      position={position}
      onClick={(marker) => {
        map.panTo(marker.getPosition());
        navigate(`/shelter/${id}`);
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
  const [toggleMap, setToggleMap] = useState(true);
  const [makeRescueList, setMakeRescueList] = useState([]);
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });
  const navigate = useNavigate();
  useEffect(() => {
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
  }, []);

  const getRescueData = async () => {
    await axios({
      url: `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/rescue`,
      method: 'GET',
    }).then((res) => {
      setMakeRescueList(res.data);
    });
  };
  getRescueData();

  // const rescueList = getInfoWindowData(_data);
  const rescueList = getInfoWindowData(makeRescueList);

  return (
    <>
      <p className="mx-2 my-1 text-sm text-gray-400">
        *핀 위에 마우스를 올리면 해당 보호소의 최신 공고를 볼 수 있으며, 핀을
        클릭하면 보호소 구조 목록으로 이동합니다.
      </p>
      <div className="relative">
        <div className=" h-12 z-10 absolute top-[3vh] mx-auto inset-x-0 text-center opacity-80">
          <Map2ListToggle />
        </div>

        <Map // 지도를 표시할 Container
          // center={{
          //   // 지도의 중심좌표
          //   // lat: 36.33689689105572,
          //   // lng: 127.4495082397018,
          //   state.center;
          // }}
          center={state.center}
          className="w-full h-[80vh]"
          level={3} // 지도의 확대 레벨
        >
          {rescueList.map((rescue, index) => (
            <div key={index}>
              <EventMarkerContainer
                key={`EventMarkerContainer-${rescue.latlng.lat}-${rescue.latlng.lng}`}
                position={rescue.latlng}
                content={rescue.content}
                id={rescue.id}
              />
            </div>
          ))}
        </Map>
      </div>
    </>
  );
}

export default MapView;

const InfoWindowDiv = styled.div`
  padding: 15px 20px;
  width: 220px;
  text-align: left;
  font-family: notosanskr, Malgun Gothic, 맑은 고딕, Dotum, 돋움, sans-serif;
`;

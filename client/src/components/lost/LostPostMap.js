import React, { useEffect, useState, useRef } from 'react';
import { Map, MapMarker, Circle, Polyline } from 'react-kakao-maps-sdk';
import PropTypes from 'prop-types';
import FindPlaceName from './FindPlaceName';

function FindLocation({ setAddress, setAddressName }) {
  const [position, setPosition] = useState({
    center: {
      lat: null,
      lng: null,
    },
  });
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });
  const [isDrawing, setIsDrawing] = useState(false);
  const drawingLineRef = useRef();
  const [mousePosition, setMousePosition] = useState({
    lat: 0,
    lng: 0,
  });
  const handleClick = (_map, mouseEvent) => {
    if (!isDrawing) {
      setPosition({
        center: {
          lat: mouseEvent.latLng.getLat(),
          lng: mouseEvent.latLng.getLng(),
        },
        radius: 0,
      });
      setIsDrawing(true);
    }
  };

  const handleMouseMove = (_map, mouseEvent) => {
    setMousePosition({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    });
    if (isDrawing) {
      const drawingLine = drawingLineRef.current;
      setPosition((prev) => ({
        ...prev,
        radius: drawingLine.getLength(),
      }));
    }
  };

  // const handleRightClick = (_map, _mouseEvent) => {
  //   if (isDrawing) {
  //     setIsDrawing(false)
  //     setCircles((prev) => [...prev, { ...position, mousePosition }])
  //   }
  // }

  const handleClickSubmit = (event) => {
    event.preventDefault();

    setAddress(position.center);
    alert('위치 등록이 완료되었습니다. 지도를 닫아주세요.');
  };
  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: pos.coords.latitude, // 위도
              lng: pos.coords.longitude, // 경도
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

  return (
    <>
      <Map // 지도를 표시할 Container
        center={state.center}
        className="w-full h-[450px]" // 지도의 크기
        level={3} // 지도의 확대 레벨
        onClick={handleClick}
        // onRightClick={handleRightClick}
        onMouseMove={handleMouseMove}
      >
        {isDrawing && (
          <>
            <Circle
              center={position.center}
              radius={position.radius}
              strokeWeight={1} // 선의 두께입니다
              strokeColor="#00a0e9" // 선의 색깔입니다
              strokeOpacity={0.1} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
              strokeStyle="solid" // 선의 스타일입니다
              fillColor="#00a0e9" // 채우기 색깔입니다
              fillOpacity={0.2} // 채우기 불투명도입니다
            />
            <Polyline
              path={[position.center, mousePosition]}
              ref={drawingLineRef}
              strokeWeight={3} // 선의 두께 입니다
              strokeColor="#00a0e9" // 선의 색깔입니다
              strokeOpacity={1} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
              strokeStyle="solid" // 선의 스타일입니다
            />
          </>
        )}
        {position.center && (
          <MapMarker
            position={position.center}
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
          />
        )}
        {!state.isLoading && (
          <MapMarker
            position={state.center}
            image={{
              src: 'https://i.ibb.co/zmQjZVT/favicon.png',
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
            <div className="p-[5px] text-black">
              {state.errMsg ? state.errMsg : '현재 위치'}
            </div>
          </MapMarker>
        )}
      </Map>

      <FindPlaceName
        position={position.center}
        setAddressName={setAddressName}
      />
      <button
        className="btn-light border-1 border-gray-200"
        type="submit"
        onClick={handleClickSubmit}
      >
        확인
      </button>
    </>
  );
}
FindLocation.propTypes = {
  setAddress: PropTypes.func.isRequired,
  setAddressName: PropTypes.func.isRequired,
};
export default FindLocation;

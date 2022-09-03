import React, { useEffect, useState, useRef } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import PropTypes from 'prop-types';
import FindPlaceName from './FindPlaceName';
import DrawCircle from './DrawCircle';

function FindLocation({ setAddress, setAddressName, setRadius }) {
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
  const [circle, setCircle] = useState();
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
        mousePosition,
        radius: 0,
      });
      setIsDrawing(true);
    } else if (isDrawing) {
      setIsDrawing(false);
      setCircle({ ...position, mousePosition });
      setRadius((position.radius / 1000).toFixed(1));
    } else {
      console.log('분실 지도 반경 이벤트 에러');
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
        mousePosition,
        radius: drawingLine.getLength(),
      }));
    }
  };

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
        onMouseMove={handleMouseMove}
      >
        {isDrawing && (
          <DrawCircle position={position} drawingLineRef={drawingLineRef} />
        )}
        {circle && (
          <DrawCircle position={circle} drawingLineRef={drawingLineRef} />
        )}

        {!state.isLoading && (
          <MapMarker
            position={state.center}
            image={{
              src: 'https://i.ibb.co/F4q5WKP/image.png',
              size: {
                width: 40,
                height: 40,
              },
            }}
          />
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
  setRadius: PropTypes.number.isRequired,
};

export default FindLocation;

import React, { useEffect, useState, useRef } from 'react';
import { Map, Circle, Polyline, CustomOverlayMap } from 'react-kakao-maps-sdk';
import PropTypes from 'prop-types';
import FindPlaceName from './FindPlaceName';
import DistanceInfo from './DistanceInfo';
import ShelterMarker from '../map/ShelterMarker';
import getShelterData from '../../api/getShelterData';
import CurrentPositionMarker from '../map/CurrentPositionMarker';

function FindLocation({ setAddress, setAddressName, setRadius }) {
  const [position, setPosition] = useState(false);
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });
  const [shelterList, setShelterList] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const drawingLineRef = useRef();
  const handleClick = (_map, mouseEvent) => {
    const startDrawing = () => {
      setPosition({
        center: {
          lat: mouseEvent.latLng.getLat(),
          lng: mouseEvent.latLng.getLng(),
        },
        mousePosition: {
          lat: mouseEvent.latLng.getLat(),
          lng: mouseEvent.latLng.getLng(),
        },
        radius: 0,
      });
      setIsDrawing(!isDrawing);
    };

    const endDrawing = () => {
      setRadius((position.radius / 1000).toFixed(1));
      setIsDrawing(!isDrawing);
    };

    if (!isDrawing) startDrawing();
    else endDrawing();
  };

  const handleMouseMove = (_map, mouseEvent) => {
    const drawing = () => {
      const drawingLine = drawingLineRef.current;
      setPosition((prev) => ({
        ...prev,
        mousePosition: {
          lat: mouseEvent.latLng.getLat(),
          lng: mouseEvent.latLng.getLng(),
        },
        radius: drawingLine.getLength(),
      }));
    };
    if (isDrawing) drawing();
  };

  const handleClickSubmit = (event) => {
    event.preventDefault();

    setAddress(position.center);
    alert('위치 등록이 완료되었습니다. 지도를 닫아주세요.');
  };

  useEffect(() => {
    const asyncGetData = async () => {
      setShelterList(await getShelterData());
    };
    asyncGetData();
  }, []);

  return (
    <>
      <Map // 지도를 표시할 Container
        center={state.center}
        className="w-full h-[450px]" // 지도의 크기
        level={9} // 지도의 확대 레벨
        onClick={handleClick}
        onMouseMove={handleMouseMove}
      >
        {position && (
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
              path={[position.center, position.mousePosition]}
              ref={drawingLineRef}
              strokeWeight={3} // 선의 두께 입니다
              strokeColor="#00a0e9" // 선의 색깔입니다
              strokeOpacity={1} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
              strokeStyle="solid" // 선의 스타일입니다
            />
            <CustomOverlayMap
              position={position.mousePosition}
              xAnchor={0}
              yAnchor={0}
              zIndex={1}
            >
              <DistanceInfo distance={Math.floor(position.radius)} />
            </CustomOverlayMap>
          </>
        )}

        <CurrentPositionMarker
          state={state}
          setState={setState}
          iconHeight={40}
          iconWidth={40}
        />

        {shelterList.map((shelter) => (
          <ShelterMarker
            key={`EventMarkerContainer-${shelter._id}`}
            shelter={shelter}
          />
        ))}
      </Map>
      {position && (
        <FindPlaceName
          position={position.center}
          setAddressName={setAddressName}
        />
      )}
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
  setRadius: PropTypes.func.isRequired,
};

export default FindLocation;

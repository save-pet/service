import { React, useEffect } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';
import PropTypes from 'prop-types';

function CurrentPositionMarker({ state, setState, iconWidth, iconHeight }) {
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
    findMyLocation();
  }, []);

  return (
    <>
      {' '}
      {!state.isLoading && (
        <MapMarker
          position={state.center}
          image={{
            src: 'https://i.ibb.co/F4q5WKP/image.png',
            size: {
              width: iconWidth,
              height: iconHeight,
            },
          }}
          clickable={false}
        />
      )}
    </>
  );
}

export default CurrentPositionMarker;

CurrentPositionMarker.propTypes = {
  state: PropTypes.shape({
    center: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
    errMsg: PropTypes.element,
    isLoading: PropTypes.bool,
  }).isRequired,
  setState: PropTypes.func.isRequired,
  iconWidth: PropTypes.number.isRequired,
  iconHeight: PropTypes.number.isRequired,
};

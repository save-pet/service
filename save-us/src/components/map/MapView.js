/*eslint-disable */
import { React, useState } from 'react';
import { Map, MapMarker, useMap } from 'react-kakao-maps-sdk';

function EventMarkerContainer({ position, content }) {
  const map = useMap();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <MapMarker
      position={position} // 마커를 표시할 위치
      // @ts-ignore
      onClick={(marker) => map.panTo(marker.getPosition())}
      onMouseOver={() => setIsVisible(true)}
      onMouseOut={() => setIsVisible(false)}
    >
      {isVisible && content}
    </MapMarker>
  );
}

function getInfoWindowData(data) {
  return data.map((e) => {
    return {
      content: <div style={{ color: '#000' }}>{e.kindCd}</div>,
      latlng: { lat: e.lat, lng: e.lng },
    };
  });
}

function MapView() {
  // const data = [
  //   {
  //     content: <div style={{ color: '#000' }}>카카오</div>,
  //     latlng: { lat: 33.450705, lng: 126.570677 },
  //   },
  //   {
  //     content: <div style={{ color: '#000' }}>생태연못</div>,
  //     latlng: { lat: 33.450936, lng: 126.569477 },
  //   },
  //   {
  //     content: <div style={{ color: '#000' }}>텃밭</div>,
  //     latlng: { lat: 33.450879, lng: 126.56994 },
  //   },
  //   {
  //     content: <div style={{ color: '#000' }}>근린공원</div>,
  //     latlng: { lat: 33.451393, lng: 126.570738 },
  //   },
  // ];
  const _data = [
    {
      id: 1,
      happenPlace: '대전 동구 가양1동',
      kindCd: '[개] 웰시 코기 카디건',
      lat: 36.343024529567934,
      lng: 127.4415250548001,
    },
    {
      id: 2,
      happenPlace: '대전 동구 가양2동',
      kindCd: '[개] 믹스견',
      lat: 36.3482200788126,
      lng: 127.45463973689542,
    },
    {
      id: 3,
      happenPlace: '대전 동구 자양동',
      kindCd: '[개] 푸들',
      lat: 36.33689689105572,
      lng: 127.4495082397018,
    },
  ];

  const data = getInfoWindowData(_data);

  return (
    <Map // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: 33.450701,
        lng: 126.570667,
      }}
      style={{
        // 지도의 크기
        width: '100%',
        height: '100vh',
      }}
      level={3} // 지도의 확대 레벨
    >
      {data.map((value) => (
        <EventMarkerContainer
          key={`EventMarkerContainer-${value.latlng.lat}-${value.latlng.lng}`}
          position={value.latlng}
          content={value.content}
        />
      ))}
    </Map>
  );
}

export default MapView;

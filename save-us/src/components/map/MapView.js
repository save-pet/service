/*eslint-disable */
import { React, useState } from 'react';
import { Map, MapMarker, useMap } from 'react-kakao-maps-sdk';

function InfoWindowContent({ data }) {
  return (
    <div style={{ color: '#000' }} className="notranslate">
      {data.kindCd}
    </div>
  );
}

function getInfoWindowData(data) {
  return data.map((obj) => {
    return {
      content: <InfoWindowContent data={obj}></InfoWindowContent>,
      latlng: { lat: obj.lat, lng: obj.lng },
    };
  });
}

function EventMarkerContainer({ position, content }) {
  const map = useMap();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <MapMarker
      position={position}
      onClick={(marker) => map.panTo(marker.getPosition())}
      onMouseOver={() => setIsVisible(true)}
      onMouseOut={() => setIsVisible(false)}
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
      {isVisible && content}
    </MapMarker>
  );
}

function MapView() {
  const _data = [
    {
      id: 1,
      happenPlace: '대전 동구 가양1동',
      kindCd: 'test1 key',
      lat: 36.343024529567934,
      lng: 127.4415250548001,
    },
    {
      id: 2,
      happenPlace: '대전 동구 가양2동',
      kindCd: 'test2 key',
      lat: 36.3482200788126,
      lng: 127.45463973689542,
    },
    {
      id: 3,
      happenPlace: '대전 동구 자양동',
      kindCd: 'test3 key',
      lat: 36.33689689105572,
      lng: 127.4495082397018,
    },
  ];

  const data = getInfoWindowData(_data);

  return (
    <Map // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: 36.33689689105572,
        lng: 127.4495082397018,
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

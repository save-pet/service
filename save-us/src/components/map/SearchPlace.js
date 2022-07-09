/*eslint-disable */
// 사용하지 않는 코드입니다.
// 키워드 장소로 검색하기
// https://react-kakao-maps-sdk.jaeseokim.dev/docs/sample/library/keywordBasic
import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const { kakao } = window;

function Maps() {
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch('대전 가양1동', (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        // console.log(data);
        //수정코드
        const lat =
          data.reduce((prev, e) => prev + Number(e.y), 0) / data.length;
        const lng =
          data.reduce((prev, e) => prev + Number(e.x), 0) / data.length;
        console.log(lat, lng);

        const markers = [
          {
            position: {
              lat,
              lng,
            },
            content: data[0].place_name,
          },
        ];
        //원래 코드
        // const markers = [];

        // for (let i = 0; i < data.length; i += 1) {
        //   // @ts-ignore
        //   markers.push({
        //     position: {
        //       lat: data[i].y,
        //       lng: data[i].x,
        //     },
        //     content: data[i].place_name,
        //   });
        //   // @ts-ignore
        //   bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        // }

        bounds.extend(new kakao.maps.LatLng(lat, lng));
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  }, [map]);

  return (
    <Map // 로드뷰를 표시할 Container
      center={{
        lat: 37.566826,
        lng: 126.9786567,
      }}
      style={{
        width: '100%',
        height: '350px',
      }}
      level={3}
      onCreate={setMap}
    >
      {markers.map((marker) => (
        <MapMarker
          key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
          position={marker.position}
          onClick={() => setInfo(marker)}
        >
          {info && info.content === marker.content && (
            <div style={{ color: '#000' }}>{marker.content}</div>
          )}
        </MapMarker>
      ))}
    </Map>
  );
}

export default Maps;

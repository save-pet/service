import React from 'react';
import { Circle, Polyline, CustomOverlayMap } from 'react-kakao-maps-sdk';
import PropTypes from 'prop-types';

function DistanceInfo({ distance }) {
  const totalRadius =
    distance >= 1000 ? `${(distance / 1000).toFixed(1)}km` : `${distance}m`;
  return (
    <ul className="relative bg-white top-1 left-1 p-2 m-0 text-xs border-1 border-solid shadow rounded">
      <li>총반경 {totalRadius}</li>
    </ul>
  );
}

function DrawCircle({ position, drawingLineRef }) {
  return (
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
  );
}

DistanceInfo.propTypes = {
  distance: PropTypes.number.isRequired,
};

DrawCircle.propTypes = {
  position: PropTypes.node.isRequired,
  mousePosition: PropTypes.node.isRequired,
  drawingLineRef: PropTypes.func.isRequired,
};
export default DrawCircle;

import React, { useEffect, useState } from 'react';
// import React from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios';

function FindPlaceName({ position }) {
  const [data, setData] = useState();

  const findLocationName = async (location) => {
    const resp = await fetch(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${location.lng}&y=${location.lat}`,
      {
        method: 'GET',
        headers: {
          Host: 'dapi.kakao.com',
          Authorization: 'KakaoAK 9af9de6fad57bca234b42bb02bcc14a2',
        },
      },
    );
    const result = await resp.json();
    setData(result.documents[0].address.address_name);
    return data;
  };
  // console.log(findLocationName(position));

  useEffect(() => {
    findLocationName(position);
  }, [position]);

  return <p>반려동물을 잃어버린 장소는 {data} 부근 입니다.</p>;
}

FindPlaceName.propTypes = {
  position: PropTypes.string.isRequired,
};

export default FindPlaceName;

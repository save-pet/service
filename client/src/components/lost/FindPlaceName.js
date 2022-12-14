import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function FindPlaceName({ position, setAddressName }) {
  const [data, setData] = useState();

  const findLocationName = async (location) => {
    await axios(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${location.lng}&y=${location.lat}`,
      {
        method: 'GET',
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_REST_KEY}`,
        },
      },
    ).then((res) => {
      setData(res.data.documents[0].address.address_name);
      setAddressName(res.data.documents[0].address.address_name);
    });
  };

  useEffect(() => {
    findLocationName(position);
    
  }, [position]);
  
  return (
    data && (
      <p className="mx-2 my-1 text-sm text-[#ffa000]">
        반려동물을 잃어버린 장소는 {data} 부근입니다.
      </p>
    )
  );
}

FindPlaceName.propTypes = {
  position: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  setAddressName: PropTypes.func.isRequired,
};

export default FindPlaceName;

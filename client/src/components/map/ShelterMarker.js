import { React, useState } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';
import PropTypes from 'prop-types';

function ShelterMarker({ shelter, onMarkerClick }) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <MapMarker
      position={{ lat: shelter.latitude, lng: shelter.longitude }}
      onClick={onMarkerClick}
      onMouseOver={() => setIsVisible(true)}
      onMouseOut={() => setIsVisible(false)}
      image={{
        src: 'https://i.ibb.co/MsqtRCN/pin.png',
        size: {
          width: 50,
          height: 50,
        },
      }}
    >
      {isVisible && (
        <div className="px-[20px] py-[15px] w-[220px] text-left">
          <div className="text-black">
            <span className="notranslate">
              <ul>
                <li className="text-sm">{shelter.careName}</li>
              </ul>
            </span>
          </div>
        </div>
      )}
    </MapMarker>
  );
}

export default ShelterMarker;

ShelterMarker.defaultProps = {
  onMarkerClick: () => 1,
};
ShelterMarker.propTypes = {
  shelter: PropTypes.shape({
    _id: PropTypes.string,
    careCode: PropTypes.string,
    careAddress: PropTypes.string,
    careName: PropTypes.string,
    careTel: PropTypes.string,
    longitude: PropTypes.number,
    latitude: PropTypes.number,
    lngLat: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  onMarkerClick: PropTypes.func,
};

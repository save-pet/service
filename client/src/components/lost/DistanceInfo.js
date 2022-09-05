import React from 'react';
import PropTypes from 'prop-types';

export default function DistanceInfo({ distance }) {
  const totalRadius =
    distance >= 1000 ? `${(distance / 1000).toFixed(1)}km` : `${distance}m`;
  return (
    <ul className="relative bg-white top-1 left-1 p-2 m-0 text-xs border-1 border-solid shadow rounded">
      <li>총반경 {totalRadius}</li>
    </ul>
  );
}

DistanceInfo.propTypes = {
  distance: PropTypes.number.isRequired,
};

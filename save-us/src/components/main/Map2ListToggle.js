/* eslint-disable react/prop-types */
import { React } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Map2ListToggle() {
  const navigate = useNavigate();
  const location = useLocation();
  const toggleState = location.pathname;

  return (
    <button
      type="button"
      className="btn-light"
      onClick={() => {
        if (toggleState === '/') {
          navigate('/lostMap');
        } else {
          navigate('/');
        }
      }}
    >
      {toggleState === '/' ? '지도 보기' : '리스트 보기'}
    </button>
  );
}

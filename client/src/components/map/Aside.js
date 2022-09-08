import { React } from 'react';
import PropTypes from 'prop-types';
import MapRenderList from '../list/MapRenderList';

function Aside({ rescueList }) {
  const getAsideTitle = () => {
    let result;
    if (rescueList.length === 0) {
      result = '해당 보호소에는 보호동물이 없습니다.';
    } else {
      const careNameList = rescueList.map((rescue) => rescue.careName);
      const careNameSet = new Set(careNameList);
      result = careNameSet;
    }
    return result;
  };

  return (
    <div
      id="menu_wrap"
      className="absolute w-96 h-[85vh] top-0 left-0 bottom-0 mt-0 mr-0 mb-30 ml-30 p-2 overflow-y-auto z-10 bg-white text-center"
    >
      <div className="text-center font-bold m-3">
        {getAsideTitle(rescueList)}
      </div>
      <ul id="rescueList">
        <MapRenderList list={rescueList} />
      </ul>
    </div>
  );
}

export default Aside;

Aside.propTypes = {
  rescueList: PropTypes.arrayOf(
    PropTypes.shape({
      age: PropTypes.string,
      careAddress: PropTypes.string,
      careCode: PropTypes.string,
      careName: PropTypes.string,
      careTel: PropTypes.string,
      colorCode: PropTypes.string,
      coords: PropTypes.arrayOf(PropTypes.number),
      desertionNo: PropTypes.string,
      happenDate: PropTypes.string,
      happenLatitude: PropTypes.string,
      happenLongitude: PropTypes.string,
      happenPlace: PropTypes.string,
      imgUrl: PropTypes.string,
      kindCode: PropTypes.string,
      kindCodeByNum: PropTypes.number,
      neutering: PropTypes.string,
      noticeEndDate: PropTypes.string,
      noticeStartDate: PropTypes.string,
      officeTel: PropTypes.string,
      processState: PropTypes.string,
      sex: PropTypes.string,
      specialMark: PropTypes.string,
      weight: PropTypes.string,
      _id: PropTypes.string,
    }),
  ).isRequired,
};

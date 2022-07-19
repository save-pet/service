import { React } from 'react';
import { Link } from 'react-router-dom';

import Leave from '../Leave';
import ModalButton from '../../modal/ModalButton';

function MenuBar() {
  return (
    <div className="w-64 m-4">
      <div className="overflow-y-auto py-4 px-3  rounded dark:bg-gray-800">
        <div className="text-3xl font-bold">마이 페이지</div>
        <div className="space-y-2">
          <div className="mt-2 flex items-center p-2 text-base font-semibold text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <Link to="/mypage">개인 정보 수정</Link>
          </div>
          <div className="flex items-center p-2 text-base font-semibold text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <Link to="/mypage/lost-list">분실 신고 리스트</Link>
          </div>
          <div className="flex items-center p-2 text-base font-semibold text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <ModalButton
              buttonName="계정탈퇴"
              title="회원탈퇴안내"
              content={<Leave />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuBar;

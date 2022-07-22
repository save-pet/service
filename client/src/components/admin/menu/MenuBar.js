import { React } from 'react';
import { Link } from 'react-router-dom';

function MenuBar() {
  return (
    <div className="w-64 m-4">
      <div className="overflow-y-auto py-4 px-3  rounded">
        <div className="text-3xl font-bold">관리자 페이지</div>
        <div className="space-y-2">
          <div className="mt-2 flex items-center p-2 text-base font-semibold text-gray-900 rounded-lg hover:bg-gray-100">
            <Link to="/admin">회원 정보 관리</Link>
          </div>
          <div className="flex items-center p-2 text-base font-semibold text-gray-900 rounded-lg hover:bg-gray-100">
            <Link to="/admin/lost-list">분실 신고 리스트</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuBar;

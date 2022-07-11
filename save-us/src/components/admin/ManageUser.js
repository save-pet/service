import { React } from 'react';

import MenuBar from './menu/MenuBar';

function ManageUser() {
  return (
    <div>
      <MenuBar />
      <div>
        <h2 style={{ display: 'inline' }}>회원 정보 관리</h2>
        <span>회원 정보 관리 페이지 입니다.</span>
      </div>
      <button type="button">번호순 정렬</button>
      <button type="button">아이디순 정렬</button>
      <button type="button">이름순 정렬</button>
      <hr style={{ border: '1px solid black', backgroundColor: 'black' }} />

      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>아이디</th>
            <th>이름</th>
            <th>전화 번호</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>12313</td>
            <td>꼬똥이</td>
            <td>010-1234-5678</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ManageUser;

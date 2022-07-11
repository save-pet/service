import { React, useEffect } from 'react';

import MenuBar from './menu/MenuBar';

function LostList() {
  useEffect(async () => {
    const response = await fetch('/LostListMockData.json');
    const lostList = await response.json();
    console.log(lostList);
  }, []);

  return (
    <div>
      <MenuBar />
      <div>
        <h2 style={{ display: 'inline' }}>분실 신고 리스트</h2>
        <span>
          회원님이 등록한 분실 신고 목록입니다.
          <button type="button">삭제</button>
        </span>
      </div>
      <hr style={{ border: '1px solid black', backgroundColor: 'black' }} />

      <table>
        <thead>
          <tr>
            <th>선택</th>
            <th>분실 번호</th>
            <th>반려 동물 이름</th>
            <th>실종 날짜</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td><input type="checkbox" /></td>
            <td>12313</td>
            <td>꼬똥이</td>
            <td>2022.07.07</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default LostList;

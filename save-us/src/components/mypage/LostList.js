import { React } from 'react';

function LostList() {
  return (
    <div>
      분실 신고건 리스트
      <table>
        <thead>
          <tr>
            <th>분실번호</th>
            <th>상세내용</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>내용입니다.</td>
            <td>2022.07.07</td>
            <td>
              <button type="button">X</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default LostList;

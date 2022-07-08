import { React, useState } from 'react';

function Leave() {
  const [pwd, setPwd] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleChangePwd = ({ target: { value } }) => setPwd(value);

  const handleSubmit = async (event) => {
    setDisabled(true);
    event.preventDefault();
    await new Promise((r) => {
      setTimeout(r, 1000);
    });
    alert(`회원탈퇴가 완료되었습니다.`);
    setDisabled(false);
  };

  return (
    <div>
      <h2>계정 탈퇴</h2>
      <p>탈퇴 시 해당 계정으로 작성한 글을 삭제할 수 없습니다.</p>
      <p>삭제를 원하는 글이 있다면 탈퇴 전 삭제 해주세요.</p>
      <hr/>
      <form onSubmit={handleSubmit}>
        <div>
          비밀번호 확인 :
          <input
            name="password"
            type="password"
            value={pwd}
            onChange={handleChangePwd}
            placeholder="••••••••"
          />
        </div>
        <button type="submit" disabled={disabled}>
          탈퇴하기
        </button>
      </form>
    </div>
  );
}

export default Leave;

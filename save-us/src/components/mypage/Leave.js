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
      <form onSubmit={handleSubmit}>
        <div>
          비밀번호 :
          <input
            name="password"
            type="password"
            value={pwd}
            onChange={handleChangePwd}
            placeholder="********"
          />
        </div>
        <div>
          비밀번호 확인:
          <input
            name="password"
            type="password"
            value={pwd}
            onChange={handleChangePwd}
            placeholder="********"
          />
        </div>
        <button type="submit" disabled={disabled}>
          {' '}
          탈퇴하기
        </button>
      </form>
    </div>
  );
}

export default Leave;

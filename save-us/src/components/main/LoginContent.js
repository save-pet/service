import React, { useState } from 'react';

function LoginContent() {
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  const onClickLogin = async () => {
    console.log('구해줘 댕냥쓰! 정상적으로 로그인 되었습니다.');
    console.log(inputId);
    console.log(inputPw);

    const resp = await fetch(
      `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/${process.env.REACT_APP_ROUTER_LOGIN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: inputId, password: inputPw }),
      },
    );
    const result = await resp.json();

    if (Object.prototype.hasOwnProperty.call(result, 'token')) {
      sessionStorage.setItem('token', result.token);
      window.location.replace('/');
    } else {
      alert('회원가입 바랍니다.');
    }
  };

  return (
    <div>
      <form>
        <div className="container">
          <label htmlFor="inputId">
            <b>아이디 : </b>
            <input
              type="text"
              placeholder="id"
              name="id"
              value={inputId}
              onChange={handleInputId}
              required
            />
          </label>
          <br />
          <label htmlFor="inputPw">
            <b>비밀번호 : </b>
            <input
              type="text"
              placeholder="password"
              name="inputPw"
              value={inputPw}
              onChange={handleInputPw}
              required
            />
          </label>
        </div>
      </form>
      <button type="button" className="login" onClick={onClickLogin}>
        로그인
      </button>
    </div>
  );
}

export default LoginContent;

// ref : https://ddeck.tistory.com/35?category=866566

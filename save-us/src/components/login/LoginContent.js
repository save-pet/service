// https://ddeck.tistory.com/35?category=866566
import React, { useState, useEffect } from 'react';

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

    const resp = await fetch('http://localhost:5000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: inputId, password: inputPw }),
    });
    const result = await resp.json();

    if (Object.prototype.hasOwnProperty.call(result, 'token')) {
      sessionStorage.setItem('token', result.token);
    } else {
      alert('회원가입 바랍니다.');
    }
  };

  useEffect(() => {
    // const getLoginToken = ()
    console.log('start');
  }, []);

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

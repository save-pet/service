import { React, useState } from 'react';
import axios from 'axios';

function LoginContent() {
  const [inputId, setInputId] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPassword = (e) => {
    setInputPassword(e.target.value);
  };

  const onClickLogin = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/${process.env.REACT_APP_ROUTER_LOGIN}`,
        {
          id: inputId,
          password: inputPassword,
        },
      );
      sessionStorage.setItem('token', data.token);
      
    } catch (error) {
      alert(error.response.data.reason);
      return;
    }
    alert('정상적으로 로그인 되었습니다.');
    window.location.replace('/');
  };

  return (
    <div>
      <form>
        <div className="container">
          <label htmlFor="inputId">
            <b>아이디 : </b>
            <input
              type="text"
              placeholder="아이디를 입력하세요."
              name="id"
              value={inputId}
              onChange={handleInputId}
              required
            />
          </label>
          <br />
          <label htmlFor="inputPassword">
            <b>비밀번호 : </b>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요."
              name="inputPassword"
              value={inputPassword}
              onChange={handleInputPassword}
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

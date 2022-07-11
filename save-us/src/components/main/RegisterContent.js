import React, { useState } from 'react';

function RegisterContent() {
  const [inputId, setInputId] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPassword = (e) => {
    setInputPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const onClickRegister = async () => {
    alert('구해줘 댕냥쓰! 정상적으로 로그인 되었습니다.');

    const resp = await fetch(
      `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/${process.env.REACT_APP_ROUTER_REGISTER}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: phoneNumber,
          id: inputId,
          password: inputPassword,
        }),
      },
    );
    const result = await resp.json();
    console.log(result);
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
              name="inputId"
              value={inputId}
              onChange={handleInputId}
              required
            />
          </label>
          <br />
          <label htmlFor="inputPassword">
            <b>비밀번호 : </b>
            <input
              type="text"
              placeholder="password"
              name="inputPassword"
              value={inputPassword}
              onChange={handleInputPassword}
              required
            />
          </label>
          <br />
          <label htmlFor="confirmPassword">
            <b>비밀번호 확인 : </b>
            <input
              type="text"
              placeholder="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPassword}
              required
            />
          </label>
          <br />
          <label htmlFor="phoneNumber">
            <b>전화번호 : </b>
            <input
              type="text"
              placeholder="010-0000-0000"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneNumber}
              required
            />
          </label>
        </div>
      </form>
      <button type="button" className="register" onClick={onClickRegister}>
        회원가입
      </button>
    </div>
  );
}

export default RegisterContent;

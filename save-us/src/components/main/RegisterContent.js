import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

function RegisterContent() {
  const [inputId, setInputId] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [inputPhoneNumber, setInputPhoneNumber] = useState('');

  // const navigate = useNavigate();

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputName = (e) => {
    setInputName(e.target.value);
  };

  const handleInputPassword = (e) => {
    setInputPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleInputPhoneNumber = (e) => {
    setInputPhoneNumber(e.target.value);
  };

  const onClickRegister = async () => {
    alert('구해줘 댕냥쓰! 회원가입이 완료되었습니다.');
    await window.location.replace('/');

    const resp = await fetch(
      `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/${process.env.REACT_APP_ROUTER_REGISTER}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: inputId,
          fullName: inputName,
          password: inputPassword,
          phoneNumber: inputPhoneNumber,
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
          <label htmlFor="inputName">
            <b> 이름 : </b>
            <input
              type="text"
              placeholder="name"
              name="inputName"
              value={inputName}
              onChange={handleInputName}
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
          <label htmlFor="inputPhoneNumber">
            <b>전화번호 : </b>
            <input
              type="text"
              placeholder="010-0000-0000"
              name="inputPhoneNumber"
              value={inputPhoneNumber}
              onChange={handleInputPhoneNumber}
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

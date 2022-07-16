import { React, useState } from 'react';
import axios from 'axios';

function RegisterContent() {
  const [inputId, setInputId] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [inputPhoneNumber, setInputPhoneNumber] = useState('');

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

  const registerValidator = () => {
    if (inputId.length <= 4 && inputPassword <= 4) {
      alert('아이디, 비밀번호는 4글자 이상 작성해주세요.');
    } else if (!inputName && !confirmPassword && !inputPhoneNumber) {
      alert('빈칸을 작성해주세요.');
    }
  };

  const onClickRegister = async (event) => {
    event.preventDefault();
    try {
      registerValidator();
      await axios({
        url: `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/${process.env.REACT_APP_ROUTER_REGISTER}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        data: {
          id: inputId,
          fullName: inputName,
          password: inputPassword,
          phoneNumber: inputPhoneNumber,
        },
      });
      alert('회원가입이 완료되었습니다.');
      window.location.replace('/');
      return;
    } catch (error) {
      alert(error.response.data.reason);
    }
  };

  return (
    <div>
      <form>
        <div className="container">
          <div className="row">
            <label htmlFor="inputId">
              아이디 :
              <input
                type="text"
                placeholder="4자 이상의 영문 혹은 영문과 숫자를 조합"
                name="inputId"
                value={inputId}
                onChange={handleInputId}
                required
              />
            </label>
          </div>
          <div className="row">
            <label htmlFor="inputName">
              이름 :
              <input
                type="text"
                placeholder="이름을 입력해주세요"
                name="inputName"
                value={inputName}
                onChange={handleInputName}
                required
              />
            </label>
          </div>
          <div className="row">
            <label htmlFor="inputPassword">
              비밀번호 :
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                name="inputPassword"
                value={inputPassword}
                onChange={handleInputPassword}
                required
              />
            </label>
          </div>
          <div className="row">
            <label htmlFor="confirmPassword">
              비밀번호 확인 :
              <input
                type="password"
                placeholder="비밀번호를 한번 더 입력해주세요"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPassword}
                required
              />
            </label>
          </div>
          <div className="row">
            <label htmlFor="inputPhoneNumber">
              전화번호 :
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
        </div>
      </form>
      <div>
        <button type="button" className="register" onClick={onClickRegister}>
          회원가입
        </button>
      </div>
    </div>
  );
}

export default RegisterContent;

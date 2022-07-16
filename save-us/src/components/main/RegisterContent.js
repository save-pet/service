import { React, useState, useEffect } from 'react';
import axios from 'axios';

function RegisterContent() {
  const [values, setValues] = useState({
    inputId: '',
    inputName: '',
    inputPassword: '',
    confirmPassword: '',
    inputPhoneNumber: '',
  });

  const {
    inputId,
    inputName,
    inputPassword,
    confirmPassword,
    inputPhoneNumber,
  } = values;

  const handleNumber = (e) => {
    const { value, name } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    if (inputPhoneNumber === 11) {
      setValues({
        inputPhoneNumber: inputPhoneNumber.replace(
          /(\d{3})(\d{4})(\d{4})/,
          '$1-$2-$3',
        ),
      });
    } else if (inputPhoneNumber === 13) {
      setValues({
        inputPhoneNumber: inputPhoneNumber
          .replace(/-/g, '')
          .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      });
    }
  }, [inputPhoneNumber]);

  const registerValidator = () => {
    if (inputId.length <= 4 && inputPassword <= 4) {
      alert('아이디, 비밀번호는 4글자 이상 작성해주세요.');
    }
    if (!inputName && !confirmPassword && !inputPhoneNumber) {
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
                onChange={handleNumber}
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
                onChange={handleNumber}
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
                onChange={handleNumber}
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
                onChange={handleNumber}
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
                onChange={handleNumber}
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

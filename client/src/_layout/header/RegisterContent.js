import { React, useState } from 'react';
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

  const onClickRegister = async (event) => {
    event.preventDefault();
    if (inputId.length <= 4 && inputPassword <= 4) {
      alert('아이디, 비밀번호는 4글자 이상 작성해주세요.');
      return;
    }
    if (!inputName || !confirmPassword || !inputPhoneNumber) {
      alert('빈칸을 작성해주세요.');
      return;
    }
    if(inputPhoneNumber !== 11){
      alert('번호를 양식에 맞추어 작성해주세요.')
      return;
    }
    if (inputPassword !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
    }
    try {
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
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="py-6 px-6 lg:px-8">
          <form className="space-y-3">
            <label htmlFor="inputId" className="modal-label">
              아이디
              <input
                type="text"
                placeholder="4자 이상의 영문 혹은 영문과 숫자를 조합"
                name="inputId"
                value={inputId}
                onChange={handleNumber}
                required
                className="modal-input"
              />
            </label>
            <div>
              <label htmlFor="inputName" className="modal-label">
                이름
                <input
                  type="text"
                  placeholder="이름을 입력해주세요"
                  name="inputName"
                  value={inputName}
                  onChange={handleNumber}
                  required
                  className="modal-input"
                />
              </label>
            </div>
            <div>
              <label htmlFor="inputPassword" className="modal-label">
                비밀번호
                <input
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  name="inputPassword"
                  value={inputPassword}
                  onChange={handleNumber}
                  required
                  className="modal-input"
                />
              </label>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="modal-label">
                비밀번호 확인
                <input
                  type="password"
                  placeholder="비밀번호를 한번 더 입력해주세요"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleNumber}
                  required
                  className="modal-input"
                />
              </label>
            </div>
            <div>
              <label htmlFor="inputPhoneNumber" className="modal-label">
                전화번호
                <input
                  type="text"
                  placeholder="-없이 번호만 입력해주세요"
                  name="inputPhoneNumber"
                  value={inputPhoneNumber}
                  onChange={handleNumber}
                  required
                  className="modal-input"
                />
              </label>
            </div>
          </form>
          <div className="flex justify-end">
            <button
              type="button"
              className="btn-submit"
              onClick={onClickRegister}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterContent;

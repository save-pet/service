import { React, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function LoginContent({ locationPath }) {
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
        `${process.env.REACT_APP_SERVER_DOMAIN}/${process.env.REACT_APP_ROUTER_LOGIN}`,
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
    window.location.replace(`${locationPath}`);
  };

  return (
    <div>
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="py-4 px-4 lg:px-8">
          <form className="space-y-3">
            <label htmlFor="inputId" className="modal-label">
              아이디
              <input
                type="text"
                placeholder="아이디를 입력하세요."
                name="id"
                value={inputId}
                onChange={handleInputId}
                required
                className="modal-input"
              />
            </label>
            <label htmlFor="inputPassword" className="modal-label">
              비밀번호
              <input
                type="password"
                placeholder="비밀번호를 입력하세요."
                name="inputPassword"
                value={inputPassword}
                onChange={handleInputPassword}
                required
                className="modal-input"
              />
            </label>
          </form>
          <div className="flex justify-end mt-2">
            <button type="button" className="btn-submit" onClick={onClickLogin}>
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

LoginContent.propTypes = {
  locationPath: PropTypes.string.isRequired,
};

export default LoginContent;

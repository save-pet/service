import React from 'react';

function RegisterContent() {
  return (
    <div>
      <form>
        <div className="container">
          <label htmlFor="id">
            <b>아이디 : </b>
            <input type="text" placeholder="id" name="id" required />
          </label>
          <br />
          <label htmlFor="password">
            <b>비밀번호 : </b>
            <input
              type="text"
              placeholder="password"
              name="password"
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
              required
            />
          </label>
          <br />
          <label htmlFor="confirmPassword">
            <b>전화번호 : </b>
            <input
              type="text"
              placeholder="010-0000-0000"
              name="confirmPassword"
              required
            />
          </label>
        </div>
      </form>
    </div>
  );
}

export default RegisterContent;

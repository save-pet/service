import React from 'react';

function LoginContent() {
  return (
    <div>
      <form>
        <div className="container">
          <label htmlFor="id">
            <b>ID : </b>
            <input type="text" placeholder="id" name="id" required />
          </label>
          <br />
          <label htmlFor="password">
            <b>PW : </b>
            <input
              type="text"
              placeholder="password"
              name="password"
              required
            />
          </label>
        </div>
      </form>
    </div>
  );
}

export default LoginContent;

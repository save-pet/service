import { React, useState, useEffect } from 'react';

import MenuBar from './menu/MenuBar';

function EditInfo() {
  // const [alert, dispatch] = useReducer(reducer, initialState);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');
  const [number, setNumber] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleChangeName = ({ target: { value } }) => setName(value);
  const handleChangeId = ({ target: { value } }) => setId(value);
  const handleChangePwd = ({ target: { value } }) => setPwd(value);
  const handleChangeNumber = ({ target: { value } }) => setNumber(value);

  const handleSubmit = async (event) => {
    setDisabled(true);
    event.preventDefault();
    await new Promise((r) => {
      setTimeout(r, 1000);
    });
    alert(`회원정보가 변경되었습니다.`);
    setDisabled(false);
  };

  useEffect(async () => {
    const response = await fetch('/UserInfoMockData.json');
    const userInfo = await response.json();
    const userId = userInfo[0].id;
    console.log(userId);
  }, []);

  return (
    <div>
      <MenuBar />
      <form onSubmit={handleSubmit}>
        <div>
          아이디 :
          <input
            name="id"
            type="text"
            value={id}
            onChange={handleChangeId}
            placeholder="아이디"
          />
          <button type="button">중복확인</button>
        </div>
        <div>
          이름 :
          <input
            name="name"
            type="text"
            value={name}
            onChange={handleChangeName}
            placeholder="이름"
          />
        </div>
        <div>
          현재 비밀번호 :
          <input
            name="password"
            type="password"
            value={pwd}
            onChange={handleChangePwd}
            placeholder="••••••••"
          />
        </div>
        <div>
          새 비밀번호 :
          <input
            name="password"
            type="password"
            value={pwd}
            onChange={handleChangePwd}
            placeholder="••••••••"
          />
        </div>
        <div>
          새 비밀번호 확인 :
          <input
            name="password"
            type="password"
            value={pwd}
            onChange={handleChangePwd}
            placeholder="••••••••"
          />
        </div>
        <div>
          전화번호 :
          <input
            name="phoneNumber"
            type="phoneNumber"
            value={number}
            onChange={handleChangeNumber}
            placeholder="010-1234-5678"
          />
        </div>
        <button type="submit" disabled={disabled}>
          회원정보수정
        </button>
      </form>
    </div>
  );
}

export default EditInfo;

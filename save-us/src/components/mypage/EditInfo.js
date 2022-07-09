import { React, useState } from 'react';

// const initialState = {
//   passwordAlert: { message: '', status: '' },
// };

// const reducer = (alert, action) => {
//   const { PASSWORDCHECK } = actions;
//   switch (action.type) {
//     case PASSWORDCHECK:
//       return {
//         ...alert,
//         passwordAlert: action.passwordAlert,
//       };
//   }
//   return {
//     ...alert,
//   };
// };

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
    alert(`정보가 변경되었습니다.`);
    setDisabled(false);
  };

  // useEffect(() => {
  //   password.length >= 8
  //     ? dispatch({
  //         type: 'PASSWORDCHECK',
  //         passwordAlert: {
  //           message: '유효한 비밀번호입니다.',
  //           status: 'success',
  //         },
  //       })
  //     : dispatch({
  //         type: 'PASSWORDCHECK',
  //         passwordAlert: {
  //           message: '비밀번호는 8자 이상 입력해주세요',
  //           status: 'warning',
  //         },
  //       });
  // }, [password]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
          아이디 :
          <input
            name="id"
            type="text"
            value={id}
            onChange={handleChangeId}
            placeholder="아이디"
          />
        </div>
        <div>
          비밀번호 :
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
          {' '}
          변경하기
        </button>
      </form>
    </div>
  );
}

export default EditInfo;

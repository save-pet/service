import { React, useState, useEffect } from 'react';
// import { LockClosedIcon } from '@heroicons/react/solid'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

  const onClickRegister = async (event) => {
    const navigate = useNavigate();
    event.preventDefault();
    if (inputId.length <= 4 && inputPassword <= 4) {
      alert('아이디, 비밀번호는 4글자 이상 작성해주세요.');
      return;
    }
    if (!inputName || !confirmPassword || !inputPhoneNumber) {
      alert('빈칸을 작성해주세요.');
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
      navigate('/');
      return;
    } catch (error) {
      alert(error.response.data.reason);
    }
  };

  return (
    <div>
      <form>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
// <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//   <div className="max-w-md w-full space-y-8">
//     <div>
//       <img
//         className="mx-auto h-12 w-auto"
//         src="https://i.ibb.co/JHTVpXr/logo.png"
//         alt="Logo"
//       />
//       <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">회원가입</h2>
//       <p className="mt-2 text-center text-sm text-gray-600">
//       </p>
//     </div>

//     <form className="mt-8 space-y-6" action="#" method="POST">
//       <input type="hidden" name="remember" defaultValue="true" />
//       <div className="rounded-md shadow-sm -space-y-px">

//         <div>
//           <label htmlFor="email-address" className="sr-only">
//             아이디 :
//           </label>
//           <input
//             type="text"

//             required
//             name="inputId"
//             value={inputId}
//           onChange={handleNumber}
//             className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//             placeholder="4자 이상의 영문 혹은 영문과 숫자를 조합"
//           />
//         </div>

//         <div>
//           <label htmlFor="email-address" className="sr-only">
//               이름 :
//             </label>
//             <input
//               type="text"
//               required
//               name="inputName"
//               value={inputName}
//               onChange={handleNumber}
//               className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//               placeholder="이름을 입력해주세요"
//             />
//         </div>

//         <div>
//           <label htmlFor="password" className="sr-only">
//             비밀번호 :
//           </label>
//           <input
//             type="password"
//             name="inputPassword"
//           value={inputPassword}
//           onChange={handleNumber}

//             required
//             className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//             placeholder="비밀번호를 입력해주세요"
//           />
//         </div>
//       </div>

//       <div>
//           <label htmlFor="confirmPassword" className="sr-only">
//             비밀번호 확인 :
//           </label>
//           <input
//             type="password"
//             name="confirmPassword"
//           value={confirmPassword}
//           onChange={handleNumber}

//             required
//             className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//             placeholder="비밀번호를 한번 더 입력해주세요"
//           />
//         </div>
//       </div>

//       <div>
//           <label htmlFor="inputPhoneNumber" className="sr-only">
//             전화번호 :
//           </label>
//           <input
//             type="text"
//             name="inputPhoneNumber"
//           value={inputPhoneNumber}
//           onChange={handleNumber}

//             required
//             className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//             placeholder="010-0000-0000"
//           />
//         </div>
//       </div>

//         <div className="text-sm">
//           <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
//             아이디가 있으신가요?
//           </a>
//         </div>
//       </div>

//       <div>
//         <button
//           type="submit"
//           className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         >
//           <span className="absolute left-0 inset-y-0 flex items-center pl-3">
//             <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
//           </span>
//           가입하기
//         </button>
//       </div>
//     </form>
//   </div>
// </div>

export default RegisterContent;

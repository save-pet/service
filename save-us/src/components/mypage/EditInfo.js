import { React, useState, useEffect } from 'react';

import MenuBar from './menu/MenuBar';

function EditInfo() {
  // 현재 비밀번호
  const [currentPassword, setCurrentPassword] = useState('')
  // 새로운 비밀번호
  const [newPassword, setNewPassword] = useState('')
  // 새로운 비밀번호 확인
  const [confirmPassword, setConfirmPassword] = useState('')

  // 유저정보
  const [userInfo, setUserInfo] = useState({})
  // 데이터 로딩여부
  const [isLoading, setIsLoading] = useState(false)

  const handleChangeUserInfo = (e) =>{
    const {name, value} = e.target
    setUserInfo({
      ...userInfo,
      [name]: value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(userInfo.currentPassword !== currentPassword) {
      alert('현재 비밀번호를 다르게 입력했습니다.')
      return
    }
    if(newPassword !== confirmPassword){
      alert('새로운 비밀번호가 서로 일치하지 않습니다.')
      return
    }
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    alert(`회원정보가 변경되었습니다.`);
  };


  const fetchData = () => {
    setIsLoading(true)  // 로딩 중
    return new Promise(() => {
      fetch("/MypageUserInfoMockData.json") // 목업 파일 fetch
        .then((response) => 
           response.json() // 읽어온 데이터를 json으로 변환
        )
        .then((data) => { 
          setUserInfo(data) // userInfo객체에 받아온 데이터 주입
        })
        .finally(() => {
          setIsLoading(false) // 로딩 끝
        })
    })
  }
  

  useEffect(() => {
    fetchData()
  },[])

  if(isLoading) return <div>로딩중...</div>

  return (
    <div>
      <MenuBar />
      {
        userInfo && (
          <form onSubmit={handleSubmit}>
        <div>
          아이디 :
          <input
            name="id"
            type="text"
            value={userInfo?.id}
            onChange={handleChangeUserInfo}
            placeholder="아이디"
          />
          <button type="button">중복확인</button>
        </div>
        <div>
          이름 :
          <input
            name="name"
            type="text"
            value={userInfo.name}
            onChange={handleChangeUserInfo}
            placeholder="이름"
          />
        </div>
        <div>
          현재 비밀번호 :
          <input
            name="password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div>
          새 비밀번호 :
          <input
            name="password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          새 비밀번호 확인 :
          <input
            name="password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          전화번호 :
          <input
            name="phoneNumber"
            type="phoneNumber"
            value={userInfo.phoneNumber}
            onChange={handleChangeUserInfo}
            placeholder="010-1234-5678"
          />
        </div>
        <button type="submit">
          회원정보수정
        </button>
      </form>
        )
      }
    </div>
  );
}

export default EditInfo;
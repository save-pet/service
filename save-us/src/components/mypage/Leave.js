import { React, useState, useEffect } from 'react';

function Leave() {
  // 현재 비밀번호
  const [currentPassword, setCurrentPassword] = useState('');
  // 유저정보
  const [userInfo, setUserInfo] = useState({});
  // 데이터 로딩여부
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userInfo.currentPassword !== currentPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    alert(`회원탈퇴가 완료되었습니다.`);
    window.location.replace('/');
  };

  const fetchData = () => {
    setIsLoading(true); // 로딩 중
    return new Promise(() => {
      fetch('/MypageUserInfoMockData.json')
        .then((response) => response.json())
        .then((data) => {
          setUserInfo(data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) return <div>로딩중...</div>;

  return (
    <div>
      <h2>회원탈퇴안내</h2>
      <hr />
      <p>탈퇴 시 해당 계정으로 작성한 글을 삭제할 수 없습니다.</p>
      <p>삭제를 원하는 글이 있다면 탈퇴 전 삭제 해주세요.</p>
      <form onSubmit={handleSubmit}>
        <div>
          비밀번호 확인 :
          <input
            name="password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <button type="button">취소</button>
        <button type="submit">탈퇴</button>
      </form>
    </div>
  );
}

export default Leave;

/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RescueList() {
  const [rescueList, setRescueList] = useState([]);
  const [target, setTarget] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [toggleList, setToggleList] = useState(true);
  const navigate = useNavigate();
  let totalPage;

  async function getRescue() {
    useEffect(() => {
      const asyncGetRescue = async () => {
        const res = await fetch(
          `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/rescue/rescues/?page=${pageNum}`,
        );
        const data = await res.json();
        console.log(data.posts);
        setRescueList(data.posts);
      };
      asyncGetRescue();
    }, [pageNum]);
  }

  getRescue();
  function pageHandler(e) {
    if (e.target.innerText === '이전 페이지') {
      if (pageNum === 1) {
        return;
      }
      setPageNum((prev) => prev - 1);
    } else {
      if (pageNum === totalPage) {
        return;
      }
      setPageNum((prev) => prev + 1);
    }
  }

  return (
    <>
      <h2>구조 리스트</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: '50px',
        }}
      >
        <button
          type="button"
          style={{ height: '40px' }}
          onClick={() => {
            if (toggleList) {
              navigate('/lostMap');
            } else {
              navigate('/');
            }
            setToggleList((toggle) => !toggle);
          }}
        >
          {toggleList ? '지도 보기' : '리스트 보기'}
        </button>
      </div>

      <main
        style={{
          display: 'inline-flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          gap: '20px',
          padding: '20px',
        }}
      >
        {rescueList.map((rescue) => {
          const {
            happenDate,
            happenPlace,
            kindCode,
            imgUrl,
            sexCd,
            neuterYn,
            desertionNo,
          } = rescue;

          let sex;
          if (sexCd === 'M') {
            sex = '수컷';
          } else if (sexCd === 'F') {
            sex = '암컷';
          } else {
            sex = '미상';
          }
          let neutralization;
          if (neuterYn === 'Y') {
            neutralization = '완료';
          } else if (neuterYn === 'N') {
            neutralization = '미완료';
          } else {
            neutralization = '미상';
          }
          return (
            <article key={desertionNo}>
              <Link
                to={`/rescue/${desertionNo}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '350px',
                  height: '400px',
                }}
              >
                <img
                  src={imgUrl}
                  alt="rescued animal"
                  style={{
                    width: '350px',
                    height: '270px',
                    objectFit: 'cover',
                  }}
                />
                <section
                  style={{
                    backgroundColor: '#ffd149',
                    fontStyle: 'none',
                    height: '130px',
                  }}
                >
                  <div>접수일: {happenDate}</div>
                  <div>발견장소: {happenPlace}</div>
                  <div>품종: {kindCode}</div>
                  <div>성별: {sex}</div>
                  <div>중성화 여부: {neutralization}</div>
                </section>
              </Link>
            </article>
          );
        })}
        <div ref={setTarget} />
      </main>
      <button type="button" onClick={pageHandler}>
        이전 페이지
      </button>
      {pageNum}
      <button type="button" onClick={pageHandler}>
        다음 페이지
      </button>
    </>
  );
}

export default RescueList;

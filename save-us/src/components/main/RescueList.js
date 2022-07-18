/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable no-unused-vars */
import { React, useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import useFetch from './useFetch';

function RescueList() {
  const [rescueList, setRescueList] = useState([]);
  const [showList, setShowList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  // const [target, setTarget] = useState(null);
  const [toggleList, setToggleList] = useState(true);
  const [perPage, setPerPage] = useState(15);
  const navigate = useNavigate();

  const getRescue = useCallback(() => {
    axios(
      `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/rescue/rescues?page=${pageNum}&perPage=${perPage}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setRescueList(data.posts);
        setTotalPage(data.totalPage);
        setShowList(data.posts);
      });
  }, [pageNum, perPage]);
  useEffect(() => getRescue(), [getRescue]);

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
  const [checked, setChecked] = useState([]);
  function checkHandler(e) {
    if (e.target.checked === true) {
      setChecked((prev) => [...prev, e.target.value]);
    } else {
      setChecked((prev) => prev.filter((item) => item !== e.target.value));
    }
  }

  useEffect(() => {
    console.log('checked: ', checked);
    if (checked.length === 0) {
      console.log('checked 빔');
      setShowList([...rescueList]);
      return;
    }
    const newList = [];
    checked.forEach((checkedItem) => {
      setShowList(() => {
        rescueList.forEach((rescue) => {
          if (rescue.kindCode.includes(checkedItem)) {
            newList.push(rescue);
          }
        });
        console.log('newList: ', newList);
        return newList;
      });
    });
  }, [checked, rescueList]);

  function handleDropdown(e) {
    setPerPage(e.target.value);
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
        <div />
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
        <div>
          <label>
            <input
              type="checkbox"
              name="animal"
              value="개"
              onChange={checkHandler}
            />
            개
          </label>
          <label>
            <input
              type="checkbox"
              name="animal"
              value="고양이"
              onChange={checkHandler}
            />
            고양이
          </label>
          <label>
            <input
              type="checkbox"
              name="animal"
              value="기타"
              onChange={checkHandler}
            />
            기타
          </label>
        </div>
        <div>
          <select onChange={handleDropdown}>
            <option value="15">15개</option>
            <option value="30">30개</option>
            <option value="50">50개</option>
          </select>
        </div>
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
        {showList.map((rescue) => {
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
        {/* <div ref={setTarget} /> */}
      </main>
      <div>
        <button type="button" onClick={pageHandler}>
          이전 페이지
        </button>
        {`${pageNum}/${totalPage}`}
        <button type="button" onClick={pageHandler}>
          다음 페이지
        </button>
      </div>
    </>
  );
}

export default RescueList;

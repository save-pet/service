/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function RescueList() {
  const [rescueList, setRescueList] = useState([]);
  const [target, setTarget] = useState(null);

  async function getRescue() {
    useEffect(() => {
      const asyncGetRescue = async () => {
        const res = await fetch(
          `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/rescue/rescues`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
        );
        const data = await res.json();
        setRescueList(data.posts);
      };
      asyncGetRescue();
    }, []);
  }

  // function InfiniteScroll() {
  //   async function intersectionHandler([entry], observer) {
  //     if (entry.isIntersecting) {
  //       observer.unobserve(entry.target);
  //       await getRescue();
  //       observer.observe(entry.target);
  //     }
  //   }

  //   useEffect(() => {
  //     let observer;
  //     if (target) {
  //       observer = new IntersectionObserver(intersectionHandler, {
  //         threshold: 0.9,
  //       });
  //       observer.observe(target);
  //     }
  //     return () => observer && observer.disconnect();
  //   }, [target]);
  // }
  // InfiniteScroll();

  getRescue();

  return (
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
  );
}

export default RescueList;

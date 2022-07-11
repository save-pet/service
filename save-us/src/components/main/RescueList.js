import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function RescueList() {
  const [rescueList, setRescueList] = useState([]);
  const [target, setTarget] = useState(null);

  async function getRescue() {
    const res = await fetch('/RescueMockData.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const data = await res.json();
    setRescueList(data);
  }

  useEffect(() => getRescue(), []);

  function InfiniteScroll() {
    async function intersectionHandler([entry], observer) {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        await getRescue();
        observer.observe(entry.target);
      }
    }

    useEffect(() => {
      let observer;
      if (target) {
        observer = new IntersectionObserver(intersectionHandler, {
          threshold: 0.9,
        });
        observer.observe(target);
      }
      return () => observer && observer.disconnect();
    }, [target]);
  }
  InfiniteScroll();

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
        const { happenDt, happenPlace, kindCd, filename, sexCd, neuterYn } =
          rescue;

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
          <article>
            <Link
              to="/"
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <img src={filename} alt="rescued animal" />
              <section
                style={{ backgroundColor: '#ffd149', fontStyle: 'none' }}
              >
                <div>접수일: {happenDt}</div>
                <div>발견장소: {happenPlace}</div>
                <div>품종: {kindCd}</div>
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

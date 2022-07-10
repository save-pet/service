import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function RescueList() {
  const [rescueList, setRescueList] = useState([]);

  async function getRescue() {
    const res = await fetch('/RescueMockData.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const data = await res.json();
    return data;
  }
  useEffect(() => {
    const getRescueFunc = async () => {
      setRescueList(await getRescue());
    };
    getRescueFunc();
  }, []);

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
    </main>
  );
}

export default RescueList;

/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function LostList() {
  const [lostList, setLostList] = useState([]);
  const location = useLocation();
  const careCode = location.pathname.split('/')[2];

  async function getRescue() {
    useEffect(() => {
      const asyncGetRescue = async () => {
        const res = await fetch(
          `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/lost`,
        );
        const data = await res.json();
        console.log(data);
        setLostList(data);
      };
      asyncGetRescue();
    }, []);
  }

  getRescue();
  return (
    <>
      <h2>분실 목록</h2>
      <main
        style={{
          display: 'inline-flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          gap: '20px',
          padding: '20px',
        }}
      >
        {lostList.map((rescue) => {
          const { _id, image, animalName, detail, lostDate, shortId, address } =
            rescue;

          return (
            <article key={shortId}>
              <Link
                to={`/lost/${_id}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '350px',
                  height: '400px',
                }}
              >
                <img
                  src={image}
                  alt="lost animal"
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
                  <div>이름: {animalName}</div>
                  <div>분실 일시: {lostDate}</div>
                  <div>분실 장소: {address}</div>
                  <div>특징: {detail}</div>
                </section>
              </Link>
            </article>
          );
        })}
      </main>
    </>
  );
}

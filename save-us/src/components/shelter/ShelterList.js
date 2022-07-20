/* eslint-disable no-unused-vars */
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function ShelterList() {
  const [rescueList, setRescueList] = useState([]);
  const location = useLocation();
  const careCode = location.pathname.split('/')[2];

  async function getRescue() {
    useEffect(() => {
      const asyncGetRescue = async () => {
        const { data } = await axios(
          `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/${process.env.REACT_APP_ROUTER_RESCUE}/care-code/${careCode}`,
        );
        console.log(data);
        setRescueList(data);
      };
      asyncGetRescue();
    }, []);
  }

  getRescue();
  return (
    <>
      <h2>보호소 이름: </h2>
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
      </main>
    </>
  );
}

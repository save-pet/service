/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
import { React, useEffect, useState } from 'react';

function RescueList() {
  const [rescueList, setRescueList] = useState([]);

  async function getRescue() {
    const res = await fetch('/MockData.json', {
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
    <div>
      {rescueList.map((rescue) => {
        const { happenDt, happenPlace, kindCd, filename, sexCd, neuterYn } =
          rescue;

        const getPhoto = async () => {
          const res = await fetch(filename, {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          });
          const data = await res.json();
          console.log(data);
          return data;
        };
        console.log(getPhoto());

        return (
          <div>
            <div>사진: {filename}</div>
            <div>접수일: {happenDt}</div>
            <div>발견장소: {happenPlace}</div>
            <div>품종: {kindCd}</div>
            <div>성별: {sexCd}</div>
            <div>중성화 여부: {neuterYn}</div>
            <br />
          </div>
        );
      })}
    </div>
  );
}

export default RescueList;

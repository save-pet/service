import { React } from 'react';
import { Link } from 'react-router-dom';

export default function RenderList({ list }) {
  const lists = list.map((rescue) => {
    const { happenDate, happenPlace, kindCode, imgUrl, sexCd, neuterYn, _id } =
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
    console.log(sex);
    return (
      <article key={_id}>
        <Link
          to={`/rescue/${_id}`}
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
  });
  return lists;
}

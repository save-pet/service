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
    return (
      <article
        key={_id}
        className="content-start overflow-hidden shadow-lg rounded-lg h-90 w-80 md:w-96 cursor-pointer m-auto"
      >
        <Link to={`/rescue/${_id}`} className="w-full block h-full">
          <img
            src={imgUrl}
            className="h-64 w-full object-cover"
            alt="rescued animal"
          />
          <section className="align-middle font-normal p-2">
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

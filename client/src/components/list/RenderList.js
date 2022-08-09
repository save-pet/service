import { React } from 'react';
import { Link } from 'react-router-dom';

export default function RenderList({ list }) {
  const lists = list.map((rescue) => {
    const {
      happenDate,
      happenPlace,
      kindCode,
      imgUrl,
      sexCode,
      neuterYn,
      _id,
    } = rescue;

    let sex;
    if (sexCode === 'M') {
      sex = '수컷';
    } else if (sexCode === 'F') {
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
        className="inline-block shadow-lg rounded-lg overflow-hidden h-90 w-80 md:w-96 cursor-pointer m-3"
      >
        <Link
          to={`/rescue/${_id}`}
          className="w-full overflow-hidden block h-full"
        >
          <img
            src={imgUrl}
            className="h-64 w-full object-cover"
            alt="rescued animal"
          />
          <section className="flex flex-col justify-center font-normal p-2 md:h-40 text-base">
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

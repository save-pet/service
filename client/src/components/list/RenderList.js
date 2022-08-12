import { React } from 'react';
import { Link } from 'react-router-dom';

export default function RenderList({ list }) {
  const lists = list.map((rescue) => {
    const { happenDate, happenPlace, kindCode, imgUrl, sex, neutering, _id } =
      rescue;

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
            <div>중성화 여부: {neutering}</div>
          </section>
        </Link>
      </article>
    );
  });
  lists.push(
    <span
      key="fffffffffffffffffffffffg"
      className="inline-block overflow-hidden h-90 w-80 md:w-96 cursor-pointer m-3"
    />,
  );
  return lists;
}

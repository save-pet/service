import { React } from 'react';
import { Link } from 'react-router-dom';

export default function MapRenderList({ list }) {
  const getLatestDate = (happenDate) => {
    const latestDate = new Date(
      `${happenDate.substring(0, 4)}-${happenDate.substring(
        4,
        6,
      )}-${happenDate.substring(6)}`,
    );
    const today = new Date();
    const diffDate = Math.abs(
      Math.ceil((latestDate.getTime() - today.getTime()) / (1000 * 3600 * 24)),
    );
    return diffDate === 0 ? '오늘' : `${diffDate}일 전`;
  };

  const lists = list.map((rescue) => {
    const { happenDate, happenPlace, imgUrl, _id } = rescue;

    return (
      <article
        key={_id}
        className="inline-block shadow-lg rounded-lg overflow-auto h-52 w-full cursor-pointer"
      >
        <Link
          to={`/rescue/${_id}`}
          className="flex h-full w-full overflow-hidden block"
        >
          <img
            src={imgUrl}
            className="h-full w-1/2 overflow-hidden object-cover"
            alt="rescued animal"
          />
          <section className="h-full w-1/2 flex flex-col justify-center font-normal p-3 text-sm text-gray-400">
            <ul className="text-left space-y-2">
              <li>{happenPlace} 에서</li>
              <li>{getLatestDate(happenDate)} 발견</li>
            </ul>
          </section>
        </Link>
      </article>
    );
  });

  return lists;
}

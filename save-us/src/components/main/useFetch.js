import { useEffect, useState } from 'react';

export default function useFetch(pageNum) {
  const [rescueList, setRescueList] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  useEffect(() => {
    const asyncGetRescue = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/rescue/rescues?page=${pageNum}`,
      );
      const data = await res.json();
      setRescueList(data.posts);
      setTotalPage(data.totalPage);
    };
    asyncGetRescue();
  }, [pageNum]);
  return { rescueList, totalPage };
}

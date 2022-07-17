import { useCallback, useEffect, useState } from 'react';

export default function useFetch(pageNum) {
  const [rescueList, setRescueList] = useState(null);
  const [totalPage, setTotalPage] = useState(1);
  const getRescue = useCallback(async () => {
    const res = await fetch(
      `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/rescue/rescues?page=${pageNum}`,
    );
    const data = await res.json();
    setRescueList(data.posts);
    setTotalPage(data.totalPage);
  }, [pageNum]);
  useEffect(() => {
    getRescue();
  }, [getRescue]);
  return { rescueList, totalPage };
}

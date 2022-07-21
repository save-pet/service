import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

export default function useFetch(pageNum) {
  const [rescueList, setRescueList] = useState(null);
  const [totalPage, setTotalPage] = useState(1);
  const getRescue = useCallback(async () => {
    const { data } = await axios(
      `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/rescue/rescues?page=${pageNum}`,
    );
    setRescueList(data.posts);
    setTotalPage(data.totalPage);
  }, [pageNum]);
  useEffect(() => {
    getRescue();
  }, [getRescue]);
  return { rescueList, totalPage };
}

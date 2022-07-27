import { React } from 'react';
import PropTypes from 'prop-types';

export default function Pagination({ pageNum, totalPage, setPageNum }) {
  function pageHandler(e) {
    if (e.target.innerText === '이전 페이지') {
      if (pageNum === 1) {
        return;
      }
      setPageNum((prev) => prev - 1);
    } else {
      if (pageNum === totalPage) {
        return;
      }
      setPageNum((prev) => prev + 1);
    }
  }
  return (
    <div className="py-7">
      <button
        className="inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        type="button"
        onClick={pageHandler}
      >
        이전 페이지
      </button>
      {/* <input /> */}
      {`${pageNum}/${totalPage}`}
      <button
        className="inline-flex items-center py-2 px-4 ml-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        type="button"
        onClick={pageHandler}
      >
        다음 페이지
      </button>
    </div>
  );
}

Pagination.propTypes = {
  pageNum: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,
  setPageNum: PropTypes.func.isRequired,
};

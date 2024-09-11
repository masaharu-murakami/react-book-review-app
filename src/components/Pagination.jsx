import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { prevPage, nextPage } from '../features/pagination/paginationSlice';

const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.pagination?.currentPage || 1); // デフォルト値として 1 を設定

  return (
    <div className="flex justify-center items-center mt-6">
      <button
        onClick={() => dispatch(prevPage())}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        disabled={currentPage === 1}
      >
        前へ
      </button>
      <span className="px-4 py-2 text-gray-700">{`ページ ${currentPage}`}</span>
      <button
        onClick={() => dispatch(nextPage())}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        次へ
      </button>
    </div>
  );
};

export default Pagination;

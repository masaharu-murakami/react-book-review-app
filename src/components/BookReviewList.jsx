import React, { useState, useEffect } from "react";
import axios from "axios"; // axiosをインポート
import { apiUrl } from "../const";
import { useDispatch, useSelector } from "react-redux";

function BookReviewList() {
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state) => state.pagination);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");


  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${apiUrl}/books?offset=${(currentPage - 1) * 10}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        console.log(response)
        setReviews(response.data.slice(0, 10));
      } catch (error) {
        // エラー処理
        setError("データの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [currentPage]);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">書籍レビュー一覧</h1>
      <ul className="space-y-6">
        {reviews.map((review) => (
          <li key={review.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out p-6 rounded-lg border border-gray-200">
            <h2 className="text-3xl font-bold mb-3 text-gray-900">{review.title}</h2>
            <p className="text-sm text-gray-500">ID: {review.id}</p>
            <p className="text-blue-600 hover:underline">URL: <a href={review.url} target="_blank" rel="noopener noreferrer">{review.url}</a></p>
            <p className="text-gray-700 mt-2">{review.detail}</p>
            <p className="mt-4 text-yellow-500 font-semibold">レビュー: {review.review}</p>
            <p className="text-gray-600 mt-1">レビューした人: {review.reviewer}</p>
            <a
              href={review.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
              詳細をみる
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookReviewList;

import React, { useState, useEffect } from "react";
import axios from "axios"; // axiosをインポート
import { apiUrl } from "../const";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../App.css";

function BookReviewList() {
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state) => state.pagination);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const loggedInUserId = localStorage.getItem("userId");

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/books?offset=${(currentPage - 1) * 10}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log(response);
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
    <div className="p-6 bg-gray-50 min-h-screen">
  <h1 className="text-3xl font-bold mb-6 text-gray-800">
    書籍レビュー一覧
  </h1>
  <ul className="space-y-6">
    {reviews.map((review) => (
      <li
        key={review.id}
        className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          {review.title}
        </h2>
        <p className="text-gray-700 mb-1">ID: {review.id}</p>
        <p className="text-gray-700 mb-3">
          URL:{" "}
          <a
            href={review.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {review.url}
          </a>
        </p>
        <p className="text-gray-700 mb-3">{review.detail}</p>
        <p className="text-gray-700 mb-3">
          レビュー: {review.review}
        </p>
        <p className="text-gray-700 mb-4">
          レビューした人: {review.reviewer}
        </p>
        <div className="flex space-x-2">
          <Link
            to={`/detail/${review.id}`}
            className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
          >
            詳細を見る
          </Link>
          {review.isMine && (
            <Link
              to={`/edit/${review.id}`}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              編集
            </Link>
          )}
        </div>
      </li>
    ))}
  </ul>
</div>
  );
}

export default BookReviewList;

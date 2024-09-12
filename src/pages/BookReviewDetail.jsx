import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiUrl } from "../const";

function BookReviewDetail() {
  const { id } = useParams();
  const [bookReview, setBookReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookReview = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.get(`${apiUrl}/books/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        console.log(`書籍レビュー詳細取得 - ID: ${id}`); // ログをコンソールに出力
        setBookReview(response.data);
      } catch (error) {
        setError("書籍情報の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchBookReview();
  }, [id]);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">本のタイトル：{bookReview.title}</h1>
      <p className="mb-4">
        <strong className="text-gray-700">URL:</strong>{" "}
        <a
          href={bookReview.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {bookReview.url}
        </a>
      </p>
      <p className="mb-4">
        <strong className="text-gray-700">詳細:</strong> {bookReview.detail}
      </p>
      <p className="mb-4">
        <strong className="text-gray-700">レビュー:</strong> {bookReview.review}
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300"
      >
        戻る
      </button>
    </div>
  );
}

export default BookReviewDetail;

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
    <div>
      <h1>本のタイトル：{bookReview.title}</h1>
      <p>
        <strong>URL:</strong>{" "}
        <a href={bookReview.url} target="_blank" rel="noopener noreferrer">
          {bookReview.url}
        </a>
      </p>
      <p>
        <strong>詳細:</strong> {bookReview.detail}
      </p>
      <p>
        <strong>レビュー:</strong> {bookReview.review}
      </p>
      <button onClick={() => navigate("/")}>戻る</button>
    </div>
  );
}

export default BookReviewDetail;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiUrl } from "../const";

function EditBookReview() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.get(`${apiUrl}/book/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const { title, url, detail, review } = response.data;
        setTitle(title);
        setUrl(url);
        setDetail(detail);
        setReview(review);
      } catch (error) {
        setError("書籍の情報の取得に失敗しました");
      }
    };

    fetchReview();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authToken = localStorage.getItem("authToken");

    try {
      await axios.put(
        `${apiUrl}/book/${id}`,
        { title, url, detail, review },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("書籍レビューが更新されました");
      navigate("/");
    } catch (error) {
      setError("書籍レビューの更新に失敗しました");
    }
  };

  const handleDelete = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      await axios.delete(`${apiUrl}/books/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setMessage("書籍レビューが削除されました！");
      navigate("/"); // 削除後にホーム画面にリダイレクト
    } catch (error) {
      setError("書籍レビューの削除に失敗しました");
    }
  };

  return (
    <div>
      <h1>書籍レビュー編集</h1>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">タイトル</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">URL</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="detail">詳細</label>
          <textarea
            id="detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="review">レビュー</label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">更新する</button>
      </form>
      <button onClick={handleDelete}>削除する</button>
    </div>
  );
}

export default EditBookReview;

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../const";

function NewBookReview() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authToken = localStorage.getItem("authToken");

    try {
      await axios.post(
        `${apiUrl}/books`,
        { title, url, detail, review },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("書籍レビューがアップロードされました！");
      navigate("/")
    } catch (error) {
      setError("書籍レビューの登録に失敗しました")
    }
  };

  return (
    <div>
      <h1>本のレビュー登録</h1>
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
            type="text"
            id="detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="review">レビュー</label>
          <textarea
            type="text"
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
        </div>
        <button>登録する</button>
      </form>
    </div>
  );
}

export default NewBookReview;

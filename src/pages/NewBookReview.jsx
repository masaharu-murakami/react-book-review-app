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
      navigate("/");
    } catch (error) {
      setError("書籍レビューの登録に失敗しました");
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">本のレビュー登録</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {message && <p className="text-green-500 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-700 mb-1">タイトル</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="url" className="block text-gray-700 mb-1">URL</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="detail" className="block text-gray-700 mb-1">詳細</label>
          <textarea
            id="detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div>
          <label htmlFor="review" className="block text-gray-700 mb-1">レビュー</label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            登録する
          </button>
          <button
            type="button"
            onClick={handleGoBack}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300"
          >
            ホームに戻る
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewBookReview;

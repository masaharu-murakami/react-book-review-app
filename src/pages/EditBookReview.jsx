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
        const response = await axios.get(`${apiUrl}/books/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        //const { title, url, detail, review } = response.data;
        setTitle(response.data.title);
        setUrl(response.data.url);
        setDetail(response.data.detail);
        setReview(response.data.review);
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
        `${apiUrl}/books/${id}`,
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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">書籍レビュー編集</h1>
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
            更新する
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300"
          >
            削除する
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBookReview;

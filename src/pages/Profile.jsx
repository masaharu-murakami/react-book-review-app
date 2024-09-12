import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../const";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setUserData({ name: response.data.name });
      } catch (error) {
        setError("ユーザー情報の取得に失敗しました");
      }
    };
    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authToken = localStorage.getItem("authToken");

    try {
      await axios.put(
        `${apiUrl}/users`,
        { name: userData.name },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setMessage("ユーザー情報を更新しました！");
      navigate("/");
    } catch (error) {
      setError("ユーザー情報の更新に失敗しました");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        プロフィール編集
      </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {message && <p className="text-green-500 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="user" className="block text-gray-700 mb-1">
            ユーザー名
          </label>
          <input
            type="text"
            id="user"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })} // 後で関数化
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          更新する
        </button>
      </form>
    </div>
  );
}

export default Profile;

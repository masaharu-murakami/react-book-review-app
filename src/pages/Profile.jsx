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
    <div>
      <h1>プロフィール編集</h1>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user">ユーザー名</label>
          <input
            type="text"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })} ///後で関数化
          />
        </div>
        <button type="submit">更新する</button>
      </form>
    </div>
  );
}

export default Profile;

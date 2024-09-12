import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { apiUrl } from "../const";
import Compressor from "compressorjs";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [icon, setIcon] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/");
    }
  }, [navigate]);

  const handleIconChange = (e) => {
    if (e.target.files[0]) {
      setIcon(e.target.files[0]);
    }
  };

  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.6,
        success(result) {
          resolve(result);
        },
        error(err) {
          reject(err);
        },
      });
    });
  };

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    const imageFile = icon ? await compressImage(icon) : null;
    const userData = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${apiUrl}/users`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.token); // トークンをローカルストレージに保存
        alert("登録が成功しました");
        navigate("/");
      } else {
        throw new Error("サーバーエラー: " + response.status);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">新規登録</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 mb-1">名前</label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "名前は必須です" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
          <input
            type="text"
            id="email"
            {...register("email", {
              required: "メールアドレスは必須です",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "有効なメールアドレスを入力してください",
              },
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "パスワードは必須です" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-500 mt-1">{errors.password.message}</p>}
        </div>
        <div>
          <label htmlFor="icon" className="block text-gray-700 mb-1">ユーザー画像</label>
          <input
            type="file"
            id="icon"
            accept="image/*"
            onChange={handleIconChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          登録
        </button>
      </form>
      <Link
        to="/signin"
        className="block text-center mt-4 text-blue-600 hover:underline"
      >
        ログインはこちら
      </Link>
    </div>
  );
}

export default SignUp;

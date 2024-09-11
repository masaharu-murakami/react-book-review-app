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
    <div>
      <h1>新規登録</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="Form">
        <div>
          <label htmlFor="name">名前</label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "名前は必須です" })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
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
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "パスワードは必須です" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <label htmlFor="icon">ユーザー画像</label>
          <input
            type="file"
            id="icon"
            accept="image/*"
            onChange={handleIconChange}
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">登録</button>
      </form>
      <Link to="/signin" className="button">
        ログインはこちら
      </Link>
    </div>
  );
}

export default SignUp;

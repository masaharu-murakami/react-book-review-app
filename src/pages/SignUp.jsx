import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { apiUrl } from "../const";
import Compressor from "compressorjs";
import { useForm } from "react-hook-form";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [name, setName] = useState("");

  const [icon, setIcon] = useState(null);
  const [error, setError] = useState("");

  // const handleNameChange = (e) => setName(e.target.value);
  // const handleEmailChange = (e) => setEmail(e.target.value);
  // const handlePasswordChange = (e) => setPassword(e.target.value);
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

    const imageFile = icon ? await compressImage(icon) : null; //compressImage は画像を圧縮するための関数

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (imageFile) {
      formData.append("Icon", icon);
    }

    try {
      const response = await fetch(`${apiUrl}/signup`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("サーバーエラー");
      }
      alert("登録が成功しました");
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
            {...(errors.name && <p>{errors.name.message}</p>)}
          />
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
        <div>
          <p>予定：ここにユーザアイコン画像を表示</p>
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

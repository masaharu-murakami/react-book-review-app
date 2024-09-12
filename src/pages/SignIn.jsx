import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { apiUrl } from "../const";

function SignIn() {
  // useForm フックを使用してバリデーションを実装
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/");
    }
  });
  [];

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const response = await axios.post(
        `${apiUrl}/signin`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.token);
        alert("ログインしました");
      } else {
        throw new Error("ログインに失敗しました");
      }
    } catch (error) {
      setError(error.message);
    }

    // バリデーションエラーがなければ、ログイン処理を実行します。
    console.log("Submitted data:", { email, password });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">ログイン</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Email
          </label>
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
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "パスワードは必須です" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          ログイン
        </button>
      </form>
      <div className="mt-4 text-center">
        <Link to="/signup" className="text-blue-600 hover:underline">
          アカウントを新規登録する
        </Link>
      </div>
    </div>
  );
}

export default SignIn;

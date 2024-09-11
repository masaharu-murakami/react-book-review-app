import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function SignIn() {
  // useForm フックを使用してバリデーションを実装
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;

    // バリデーションエラーがなければ、ログイン処理を実行します。
    console.log("Submitted data:", { email, password });
  };

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            {...register("email", {
              required: "メールアドレスは必須です",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "有効なメールアドレスを入力してください"
              }
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
        <button type="submit">ログイン</button>
      </form>
      <Link to="/signup">アカウントを新規登録する</Link>
    </div>
  );
}

export default SignIn;

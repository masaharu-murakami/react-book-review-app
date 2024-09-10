import React from "react";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("すべてのフィールドを入力してください。");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("有効なメールアドレスを入力してください");
    } else {
      setError("");
    }
  };

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">ログイン </button>
      </form>
    </div>
  );
}

export default Login;

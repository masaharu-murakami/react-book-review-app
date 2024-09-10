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
          <label htmlFor="">Email</label>
          <input
            type="text"
            value={email}
            name=""
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && { error }}
        <button type="submit">ログイン </button>
      </form>
    </div>
  );
}

export default Login;

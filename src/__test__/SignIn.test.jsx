import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignIn from "../pages/SignIn.jsx"; // Loginコンポーネントへのパスを正しく指定してください

describe("Login Component", () => {
  test("renders the login form", () => {
    render(<SignIn />);

    // "ログイン"という見出しがあるかを確認
    const handlingElement = screen.getByRole("heading", { name: /ログイン/i });
    expect(handlingElement).toBeInTheDocument();

    // メールアドレス入力フィールドがあるかを確認
    const emailLabel = screen.getByLabelText(/Email/i);
    expect(emailLabel).toBeInTheDocument();

    // パスワード入力フィールドがあるかを確認
    const passwordLabel = screen.getByLabelText(/password/i);
    expect(passwordLabel).toBeInTheDocument();

    // ログインボタンがあるかを確認
    expect(
      screen.getByRole("button", { name: "ログイン" })
    ).toBeInTheDocument();
  });
});

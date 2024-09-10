import { test, expect } from "@playwright/test";

test("ログインフォームのエラーメッセージ表示テスト", async ({ page }) => {
  // ログインページに移動
  await page.goto("http://localhost:5173"); // 正しい URL

  // メールアドレスとパスワードを入力せずにログインボタンをクリック
  await page.click('button:has-text("ログイン")');

  // エラーメッセージが表示されることを確認
  await expect(
    page.locator("text=すべてのフィールドを入力してください。")
  ).toBeVisible();

  // 無効なメールアドレスを入力
  await page.fill('input[type="text"]', "invalid-email");
  await page.fill('input[type="password"]', "password");
  await page.click('button:has-text("ログイン")');

  // エラーメッセージが表示されることを確認
  await expect(
    page.locator("text=有効なメールアドレスを入力してください")
  ).toBeVisible();

  // 正しいメールアドレスとパスワードを入力
  await page.fill('input[type="text"]', "test@example.com");
  await page.fill('input[type="password"]', "password123");
  await page.click('button:has-text("ログイン")');

  // エラーメッセージが表示されないことを確認
  await expect(
    page.locator("text=すべてのフィールドを入力してください。")
  ).toBeHidden();
  await expect(
    page.locator("text=有効なメールアドレスを入力してください")
  ).toBeHidden();
});

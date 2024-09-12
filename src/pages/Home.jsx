import React from "react";
import BookReviewList from "../components/BookReviewList";
import Pagination from "../components/Pagination";
import Header from "../components/Header";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Header />
      <h1>ホーム画面</h1>
      <Link to="/new">
        書籍レビューを登録する
      </Link>
      <BookReviewList />
      <Pagination />
    </div>
  );
}

export default Home;

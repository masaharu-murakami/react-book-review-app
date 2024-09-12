import React from "react";
import BookReviewList from "../components/BookReviewList";
import Pagination from "../components/Pagination";
import Header from "../components/Header";

function Home() {
  return (
    <div>
      <Header />
      <h1>ホーム画面</h1>
      <BookReviewList />
      <Pagination />
    </div>
  );
}

export default Home;

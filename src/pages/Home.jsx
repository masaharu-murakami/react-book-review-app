import React from "react";
import BookReviewList from "../components/BookReviewList";
import Pagination from "../components/Pagination";

function Home() {
  return (
    <div>
      <h1>ホーム画面</h1>
      <BookReviewList />
      <Pagination />
    </div>
  );
}

export default Home;

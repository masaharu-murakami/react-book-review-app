import React from "react";
import BookReviewList from "./BookReviewList";
import Pagination from "../components/Pagination";
import Header from "../components/Header";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">ホーム画面</h1>
          <Link
            to="/new"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            書籍レビューを登録する
          </Link>
        </div>
        <div className="mt-6">
          <BookReviewList />
        </div>
        <div className="mt-6">
          <Pagination />
        </div>
      </div>
    </div>
  );
}

export default Home;

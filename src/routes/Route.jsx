import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import NewBookReview from "../pages/NewBookReview";
import BookReviewDetail from "../pages/BookReviewDetail";
import EditBookReview from "../pages/EditBookReview";

function AppRoute() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/new" element={<NewBookReview />} />
        <Route path="/detail/:id" element={<BookReviewDetail />} />
        <Route path="/edit/:id" element={<EditBookReview />} />
      </Routes>
    </Router>
  );
}

export default AppRoute;

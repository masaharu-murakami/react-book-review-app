import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");

    navigate("/signin");
  };

  return (
    <header className="bg-gray-800 p-4 text-white">
      <nav className="mx-auto flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <Link to="/profile" className="hover:underline">
              プロフィール編集
            </Link>
            <button onClick={handleLogout} className="ml-4 hover:underline">
              ログアウト
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

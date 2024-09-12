import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 p-4 text-white">
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/profile" className="hover:underline">
              プロフィール編集
            </Link>
          </li>
          {/* 他のナビゲーションアイテム */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
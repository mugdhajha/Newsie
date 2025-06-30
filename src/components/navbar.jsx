import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [text, setText] = useState(""); // 🔹 for input value
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      nav(`/search?q=${encodeURIComponent(text.trim())}`);
      setText("");
      setShowSearch(false);
      setIsOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <h1 className="logo">Newsie~</h1>

      {/* 🍔 Hamburger + 🔍 Search Button */}
      <div className="mobile-controls">
        <label className="hamburger">
          <input
            type="checkbox"
            checked={isOpen}
            onChange={() => setIsOpen(!isOpen)}
          />
          <svg viewBox="0 0 32 32">
            <path className="line line-top-bottom" d="M4 8h24M4 24h24" />
            <path className="line" d="M4 16h24" />
          </svg>
        </label>

        <button
          className="search-icon"
          onClick={() => setShowSearch((prev) => !prev)}
        >
          🔍
        </button>
      </div>

      {/* 🧭 Nav Links + Search */}
      <div className="control-container">
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/summaries" onClick={() => setIsOpen(false)}>MySummaries</Link>
          </li>
        </ul>

        {/* 🔍 Search Input */}
        <form
          className={`search ${showSearch ? "show" : ""}`}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search news..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">🔍</button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;


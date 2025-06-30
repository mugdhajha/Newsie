import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import ArticleDetail from "./pages/ArticleDetail";
import SearchResults from "./pages/SearchResults";
import MySummaries from "./pages/MySummaries"; 

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article" element={<ArticleDetail />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/summaries" element={<MySummaries />} />
      </Routes>
    </Router>
  );
};

export default App;
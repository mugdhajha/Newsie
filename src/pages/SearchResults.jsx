import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "../styles/home.css";

const SearchResults = () => {
  const [params] = useSearchParams();
  const q = params.get("q");

  const [list, setList] = useState([]);
  const [load, setLoad] = useState(false);

  const getNews = useCallback(async () => {
    if (!q) return;
    setLoad(true);
    try {
      const res = await axios.get(`/.netlify/functions/getNews?q=${q}`);
      setList(res.data.articles);
    } catch (err) {
      console.error("Search fail:", err);
    }
    setLoad(false);
  }, [q]);

  useEffect(() => {
    getNews();
  }, [getNews]);

  return (
    <div className="home">
      <h2 style={{ color: "white", marginTop: "10vh", textAlign: "center", fontSize: "2.5em" }}>
        Results for: <em>{q}</em>
      </h2>

      {load ? (
        <div className="loader"></div>
      ) : list.length === 0 ? (
        <p style={{ color: "white", textAlign: "center", marginTop: "2em", fontSize: "1.9em" }}>
          No articles found for "<strong>{q}</strong>". Try searching for something else!
        </p>
      ) : (
        <div className="articles-list">
          {list.map((a, i) => (
            <a
              key={i}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="article-card"
            >
              {a.urlToImage && <img src={a.urlToImage} alt="news" />}
              <div className="card-content">
                <h3>{a.title}</h3>
                <p>{a.source.name}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
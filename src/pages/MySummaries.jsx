import React, { useEffect, useState } from "react";
import "../styles/home.css"; // Reuse your card styles

const MySummaries = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("summaries")) || [];
    setList(saved);
  }, []);

  return (
    <div className="home">
      <h2 style={{ color: "white", marginTop: "10vh", textAlign: "center", fontSize: "2.5em" }}>
         My Saved Summaries
      </h2>

      {list.length === 0 ? (
        <p style={{ textAlign: "center", color: "white", marginTop: "2em", fontSize: "1.9em" }}>
          No summaries saved yet.
        </p>
      ) : (
        <div className="articles-list">
          {list.map((a, i) => (
            <div key={i} className="article-card">
              {a.image && <img src={a.image} alt="news" />}
              <div className="card-content">
                <h3>{a.title}</h3>
                <p><strong>From:</strong> {a.source}</p>
                <p><strong>On:</strong> {a.date}</p>
                <p style={{ marginTop: "0.5em" }}>{a.summary}</p>
                <a
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="full-btn"
                >
                  Read Full Article
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySummaries;

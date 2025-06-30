import React, { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/ArticleDetail.css";

const ArticleDetail = () => {
  const { state } = useLocation();
  const data = state?.article; // was 'article'

  const [sum, setSum] = useState("");        // summary
  const [load, setLoad] = useState(false);   // loading
  const [err, setErr] = useState("");// error


  const getSum = async () => {
  setLoad(true);
  setErr("");

  try {
    const res = await axios.post(
      "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent",
      {
        contents: [
          {
            parts: [
              {
                text: `Summarize this article:\n${data.title}\n${data.description || ""}`
              }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
           "x-goog-api-key": process.env.REACT_APP_GEMINI_API_KEY
        }
      }
    );
    console.log("🔑 Gemini Key:", process.env.REACT_APP_GEMINI_API_KEY);

    const txt = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    setSum(txt || "No summary available.");
  } catch (e) {
    console.error("Gemini error:", e.response?.data || e.message || e);
    setErr("❌ Could not summarize.");
  }

  setLoad(false);
};



  if (!data) return <p style={{ color: "white" }}>No article found.</p>;

  return (
    <div className="article-detail">
      <h1>{data.title}</h1>
      {data.urlToImage && <img src={data.urlToImage} alt="news" />}
      <p><strong>Source:</strong> {data.source?.name}</p>
      <p><strong>Author:</strong> {data.author || "Unknown"}</p>
      <p><strong>Published:</strong> {new Date(data.publishedAt).toLocaleString()}</p>

      <a href={data.url} target="_blank" rel="noopener noreferrer">
        <button className="full-btn">Read Full Article</button>
      </a>

      <button className="summarise-btn" onClick={getSum}>Summarise</button>

      {load && <p className="info">Summarizing...</p>}
      {err && <p className="error">{err}</p>}
      {sum && (
        <div className="summary">
          <h3>Summary:</h3>
          <p>{sum}</p>
        </div>
      )}
    </div>
  );
};

export default ArticleDetail;
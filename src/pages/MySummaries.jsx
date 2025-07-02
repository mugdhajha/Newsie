import React, { useEffect, useState } from "react";
import "../styles/summary.css";

const MySummaries = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("savedSummaries")) || [];
        setList(saved);
    }, []);

    return (
        <div className="home">
            <h2 style={{ color: "white", marginTop: "10vh", textAlign: "center", fontSize: "3em", marginBottom: "1em" }}>
                My Summaries
            </h2>

            {list.length === 0 ? (
                <p style={{ textAlign: "center", color: "white", marginTop: "2em", fontSize: "1.9em" }}>
                    No summaries saved yet.
                </p>
            ) : (
                <div className="summary-list">
                    {list.map((a, i) => (
                        <div key={i} className="summary-card">
                            {a.image && <img src={a.image} alt="news" />}
                            <div className="card-content-my-sum">
                                <div className="card-text">
                                <h3>{a.title}</h3>
                                <p><strong>From:</strong> {a.source}</p>
                                <p><strong>On:</strong> {a.time}</p>
                                <p style={{ marginTop: "0.5em" }}>{a.summary}</p>
                                </div>
                                <a 
                                    href={a.url}
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

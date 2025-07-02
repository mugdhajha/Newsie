import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Category from "../components/Category";
import axios from "axios";
import "../styles/home.css";

const Home = () => {
    const [cat, setCat] = useState("Business");
    const [items, setItems] = useState([]);
    const [spin, setSpin] = useState(false);

    const nav = useNavigate();

    const go = (item) => {
        console.log("going to detail", item.title);
        nav("/article", { state: { article: item } });
    };

    const fetchNews = async () => {
        setSpin(true);
        try {
            const res = await axios.get(
                `https://newsapi.org/v2/top-headlines?category=${cat.toLowerCase()}&country=us&pageSize=10&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
            );
            setItems(res.data.articles || []);
        } catch (err) {
            console.log("error getting news lol", err);
        } finally {
            setSpin(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, [cat]);

    return (
        <div className="home">
            <Category topic={cat} setTopic={setCat} />

            {spin ? (
                <div className="loader"></div>
            ) : (
                <div className="articles-list">
                    {items.map((art, i) => (
                        <div
                            key={i}
                            className="article-card"
                            onClick={() => go(art)}
                            style={{ cursor: "pointer" }}
                        >
                            {art.urlToImage && <img src={art.urlToImage} alt="img" />}
                            <div className="card-content">
                                <h3>{art.title}</h3>
                                <p>{art.source?.name || "Unknown source"}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;


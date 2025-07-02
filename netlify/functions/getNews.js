const axios = require("axios");

exports.handler = async function (event) {
  const { category = "business" } = event.queryStringParameters;

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error("Netlify function error:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch news" })
    };
  }
};

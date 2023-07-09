import { useEffect, useState } from "react";

export default function QuoteGenerator() {
  const [quote, setQuote] = useState({ text: "", author: "" });
  const baseUrl = "https://inspo-quotes-api.herokuapp.com/quotes/random";
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("");

  const generateRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setColor(randomColor);
  };

  async function fetchQuote() {
    setLoading(true); // Set loading state to true before fetching the quote
    const quoteCall = await fetch(baseUrl);
    const randomQuoteResponse = await quoteCall.json();
    const randomQuote = randomQuoteResponse.quote;
    setQuote(randomQuote);
    generateRandomColor();
    setLoading(false);
  }

  useEffect(() => {
    fetchQuote();
    console.log("called");
  }, []);

  function shareOnTwitter() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.text}-${quote.author}`;
    window.open(twitterUrl, "_blank");
  }

  return (
    <>
      <div className="card" style={{ backgroundColor: "#ffffef" }}>
        <div className="card-header" style={{ color: "black" }}>
          MisterQuote Generator
        </div>
        <div className="card-body" style={{ color: color }}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <blockquote className="blockquote mb-0">
              <p style={{ color: color, fontSize: "2rem" }}>
                &ldquo; {quote.text} &rdquo;
              </p>
              <footer className="blockquote-footer">
                <cite style={{ color: color }}>{quote.author}</cite>
              </footer>
            </blockquote>
          )}
        </div>
        <button onClick={fetchQuote} className="btn btn-primary">
          <i className="fa-solid fa-forward"></i> Next Quote
        </button>
        <button
          onClick={shareOnTwitter}
          className="btn"
          style={{ marginTop: "4px" }}
        >
          <i className="fa-brands fa-twitter" style={{ color: "#08a0e9" }}>
            {" "}
            Tweet
          </i>
        </button>
      </div>
    </>
  );
}

import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // We'll define styles in this CSS file

function App() {
  const [quote, setQuote] = useState('');
  const [quotes, setQuotes] = useState([]);

  const fetchQuotes = async () => {
    const res = await axios.get('http://localhost:5000/quotes');
    console.log('result is ',res);
    
    setQuotes(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/quotes', { text: quote });
    setQuote('');
    fetchQuotes();
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div className="wrapper">
    <div className="container">
      <h1 className="title">📜 Quote Saver</h1>
      
      
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="Enter a quote"
        />
        <button className="button" type="submit">Save Quote</button>
      </form>
      
      <ul className="quote-list">
        {quotes.map((q, i) => (
          <li key={i} className="quote-item">📝 {q.text}</li>
        ))}
      </ul>
    </div>
  </div>
  );
}

export default App;

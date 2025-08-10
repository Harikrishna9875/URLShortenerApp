import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/urls');
      setUrls(response.data);
    } catch (error) {
      console.error('Error fetching URLs:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originalUrl) return;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5001/api/shorten', {
        original_url: originalUrl
      });
      
      setShortUrl(response.data.short_url);
      setOriginalUrl('');
      fetchUrls();
    } catch (error) {
      console.error('Error shortening URL:', error);
      alert('Error shortening URL');
    }
    setLoading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🔗 URL Shortener</h1>
        
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <input
            type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="Enter your long URL here..."
            style={{
              padding: '10px',
              width: '400px',
              marginRight: '10px',
              border: '2px solid #ccc',
              borderRadius: '5px'
            }}
            required
          />
          <button 
            type="submit" 
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </form>

        {shortUrl && (
          <div style={{ 
            backgroundColor: '#d4edda', 
            padding: '15px', 
            borderRadius: '5px',
            marginBottom: '20px',
            border: '1px solid #c3e6cb'
          }}>
            <h3>✅ URL Shortened Successfully!</h3>
            <p><strong>Short URL:</strong> 
              <a href={shortUrl} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '10px' }}>
                {shortUrl}
              </a>
              <button 
                onClick={() => copyToClipboard(shortUrl)}
                style={{ 
                  marginLeft: '10px', 
                  padding: '5px 10px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
              >
                Copy
              </button>
            </p>
          </div>
        )}

        <div style={{ width: '100%', maxWidth: '800px' }}>
          <h2>📊 All Shortened URLs</h2>
          {urls.length === 0 ? (
            <p>No URLs shortened yet.</p>
          ) : (
            <div>
              {urls.map((url) => (
                <div key={url._id} style={{
                  backgroundColor: '#f8f9fa',
                  padding: '15px',
                  marginBottom: '10px',
                  borderRadius: '5px',
                  border: '1px solid #dee2e6'
                }}>
                  <p><strong>Original:</strong> 
                    <a href={url.original_url} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '10px' }}>
                      {url.original_url}
                    </a>
                  </p>
                  <p><strong>Short:</strong> 
                    <a href={`http://localhost:5001/${url.short_code}`} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '10px' }}>
                      http://localhost:5001/{url.short_code}
                    </a>
                  </p>
                  <p><strong>Clicks:</strong> {url.visit_count}</p>
                  <p><strong>Created:</strong> {new Date(url.created_at).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;

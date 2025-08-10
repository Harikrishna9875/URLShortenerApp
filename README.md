# URL Shortener App - MERN Stack

A full-featured URL shortener web application built with the MERN stack (MongoDB, Express.js, React, Node.js) that allows users to convert long URLs into short, shareable links with click tracking and analytics.

## 🚀 Features

- **URL Shortening**: Convert long URLs into short, manageable links
- **Click Tracking**: Monitor how many times each shortened URL has been visited
- **Admin Dashboard**: View all shortened URLs with detailed analytics
- **Copy to Clipboard**: One-click copying of shortened URLs
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Live statistics and URL management
- **URL Validation**: Comprehensive input validation and error handling

## 🛠 Tech Stack

**Frontend:**
- React 18+ with Hooks
- Axios for API communication
- CSS3 with responsive design
- Modern JavaScript (ES6+)

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- CORS enabled
- Environment variables with dotenv

## 📁 Project Structure

```
url-shortener-app/
├── backend/
│   ├── node_modules/
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── node_modules/
    ├── public/
    ├── src/
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    └── package.json
```

## ⚡ Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (Community Server)
- Git

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/url-shortener-app.git
cd url-shortener-app
```

2. **Set up the Backend:**
```bash
cd backend
npm install express mongoose dotenv cors nodemon
```

3. **Create environment file (.env):**
```bash
MONGODB_URI=mongodb://localhost:27017/urlshortener
PORT=5001
```

4. **Set up the Frontend:**
```bash
cd ../frontend
npm install
npm install axios
```

### Running the Application

**You need to run both servers simultaneously:**

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
```
Server will run on `http://localhost:5001`

**Terminal 2 - Frontend Server:**
```bash
cd frontend
npm start
```
App will open in browser at `http://localhost:3000`

## 🎯 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/shorten` | Create a shortened URL |
| GET | `/:shortcode` | Redirect to original URL |
| GET | `/api/urls` | Get all URLs (admin) |

### API Examples

**Shorten URL:**
```bash
POST http://localhost:5001/api/shorten
Content-Type: application/json

{
  "original_url": "https://www.example.com/very/long/url/path"
}
```

**Response:**
```json
{
  "original_url": "https://www.example.com/very/long/url/path",
  "short_url": "http://localhost:5001/abc123",
  "short_code": "abc123"
}
```

## 💾 Database Schema

**URLs Collection:**
```javascript
{
  original_url: String (required),
  short_code: String (required, unique),
  visit_count: Number (default: 0),
  created_at: Date (default: Date.now)
}
```

## 🎨 Screenshots

### Main Interface
- Clean, professional design with URL input form
- Real-time shortened URL display with copy functionality

### Admin Dashboard
- Complete list of all shortened URLs
- Click tracking and analytics
- Creation timestamps and visit counts

## 🧪 Testing the Application

1. **Start both servers** (backend and frontend)
2. **Open browser** to `http://localhost:3000`
3. **Enter a long URL** (e.g., `https://www.google.com/search?q=very+long+url+example`)
4. **Click "Shorten URL"**
5. **Copy and test** the generated short URL
6. **Verify redirect** and check that visit count increases

## 🚀 Deployment

### Backend (Heroku)
1. Create Heroku app
2. Set environment variables
3. Deploy backend code
4. Use MongoDB Atlas for cloud database

### Frontend (Netlify)
1. Build the React app: `npm run build`
2. Deploy the `build` folder to Netlify
3. Update API endpoints to use production backend URL

## 🔧 Configuration

**Environment Variables (.env):**
```
MONGODB_URI=mongodb://localhost:27017/urlshortener
PORT=5001
NODE_ENV=development
```

**For Production:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/urlshortener
PORT=5001
NODE_ENV=production
```

## 📝 Features Breakdown

- **URL Shortening Algorithm**: 6-character random string generation
- **Database Integration**: MongoDB with Mongoose ODM
- **Click Tracking**: Automatic visit count increment on redirect
- **Error Handling**: Comprehensive error management and validation
- **Responsive Design**: Mobile-first CSS design approach
- **Modern React**: Functional components with hooks (useState, useEffect)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👨💻 Author

**Your Name**
- GitHub: [@Harikrishna9875](https://github.com/Harikrishna9875)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/harikrishna9875)

## 🙏 Acknowledgments

- Built as part of learning full-stack web development
- Inspired by popular URL shortening services like bit.ly and tinyurl.com
- Thanks to the MERN stack community for excellent documentation and resources

## 📞 Support

If you have any questions or run into issues:
1. Check the [Issues](https://github.com/Harikrishna9875/url-shortener-app/issues) tab
2. Create a new issue with detailed description
3. Contact me directly through GitHub

***

**⭐ If you found this project helpful, please give it a star!**

import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import ArticleList from './components/Articles/ArticleList';
import Navbar from './components/Header/Navbar';
import SingleArticle from './components/Articles/SingleArticle';
import ErrorPage from './components/Misc/ErrorPage';

export default function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/topic/:topic_slug" element={<ArticleList />} />
          <Route path="/article/:article_id" element={<SingleArticle />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </div>
  );
}

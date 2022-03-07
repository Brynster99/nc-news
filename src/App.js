import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import ArticleList from './components/Articles/ArticleList';

export default function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/article/:article_id" />
        </Routes>
      </main>
    </div>
  );
}

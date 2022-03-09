import './App.css';

import { Route, Routes } from 'react-router-dom';

import ArticleList from './components/Articles/ArticleList';
import ErrorPage from './components/Misc/ErrorPage';
import Header from './components/Header/Header';
import Navbar from './components/Header/Navbar';
import SingleArticle from './components/Articles/SingleArticle';
import UserContext from './Contexts/User';
import { useState } from 'react';

export default function App() {
  const [user, setUser] = useState('jessjelly');

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
    </UserContext.Provider>
  );
}

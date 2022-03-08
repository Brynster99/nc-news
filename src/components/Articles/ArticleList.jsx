import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../api';
import ErrorPage from '../Misc/ErrorPage';
import ArticleCard from './ArticleCard';

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { topic_slug } = useParams();

  useEffect(() => {
    setError('');
    setIsLoading(true);
    api
      .get(`/articles/?topic=${topic_slug || ''}`)
      .then(({ data: { articles } }) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [topic_slug]);

  if (isLoading) return <p>{`Loading ${topic_slug || 'All'} Articles...`}</p>;
  if (error) return <ErrorPage error={error} />;

  return (
    <section className="article-list">
      <h2>{`${topic_slug || 'All'} Articles`}</h2>
      {articles.map((article) => (
        <ArticleCard article={article} />
      ))}
    </section>
  );
}

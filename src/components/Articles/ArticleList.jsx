import { useEffect, useState } from 'react';

import ArticleCard from './ArticleCard';
import ErrorPage from '../Misc/ErrorPage';
import SortArticles from './SortArticles';
import api from '../../api';
import { useParams } from 'react-router-dom';

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { topic } = useParams();
  const [sortOrderBy, setSortOrderBy] = useState('created_at,DESC');

  useEffect(() => {
    setError('');
    setIsLoading(true);

    const [sort_by, order] = sortOrderBy.split(',');

    api
      .get(`/articles`, {
        params: {
          topic,
          sort_by,
          order,
        },
      })
      .then(({ data: { articles } }) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [topic, sortOrderBy]);

  if (isLoading) return <p>{`Loading ${topic || 'All'} Articles...`}</p>;
  if (error) return <ErrorPage error={error} />;

  return (
    <section className="article-list">
      <h2>{`${topic || 'All'} Articles`}</h2>

      <SortArticles sortOrderBy={sortOrderBy} setSortOrderBy={setSortOrderBy} />

      {articles.map((article, index) => (
        <ArticleCard
          key={`article-${article.article_id}`}
          article={article}
          setArticles={setArticles}
          articleIndex={index}
        />
      ))}
    </section>
  );
}

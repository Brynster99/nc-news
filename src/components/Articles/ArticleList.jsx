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
  const { topic_slug } = useParams();
  const [sortOrderBy, setSortOrderBy] = useState('created_at,DESC');

  useEffect(() => {
    setError('');
    setIsLoading(true);
    api
      .get(
        `/articles/?topic=${topic_slug || ''}&sort_by=${
          sortOrderBy.split(',')[0]
        }&order=${sortOrderBy.split(',')[1]}`
      )
      .then(({ data: { articles } }) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [topic_slug, sortOrderBy]);

  if (isLoading) return <p>{`Loading ${topic_slug || 'All'} Articles...`}</p>;
  if (error) return <ErrorPage error={error} />;

  return (
    <section className="article-list">
      <h2>{`${topic_slug || 'All'} Articles`}</h2>
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

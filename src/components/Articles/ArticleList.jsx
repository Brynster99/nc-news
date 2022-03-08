import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../api';
import ErrorPage from '../Misc/ErrorPage';

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
      {articles.map((article) => {
        const date = new Date(article.created_at);

        return (
          <article
            className="article-card"
            key={`article-${article.article_id}`}
          >
            <Link to={`/article/${article.article_id}`}>
              <h3>{article.title}</h3>
            </Link>
            <h4>
              Posted in{' '}
              <Link to={`/topic/${article.topic}`}>{article.topic}</Link> at{' '}
              {`${date.toLocaleTimeString()}, ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} by ${
                article.author
              }`}
            </h4>
            <p>
              <b>{article.votes}</b> votes
            </p>
            <p>
              {article.body.length > 75
                ? `${article.body.slice(0, 72)}...`
                : article.body}
            </p>
            <p>
              {/* Could make this link to an anchor on SingleArticle page */}
              <b>{article.comment_count}</b> comments
            </p>
          </article>
        );
      })}
    </section>
  );
}

import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ArticleVotes from './ArticleVotes';
import CommentList from './Comments/CommentList';
import ErrorPage from '../Misc/ErrorPage';
import api from '../../api';

export default function SingleArticle() {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { article_id } = useParams();

  useEffect(() => {
    setError('');
    setIsLoading(true);
    api
      .get(`/articles/${article_id}`)
      .then(({ data: { article } }) => {
        setArticle(article);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <p>{`Loading Article...`}</p>;
  if (error) return <ErrorPage error={error} />;

  const date = new Date(article.created_at);

  return (
    <section className="single-article">
      <h2>{article.title}</h2>
      <h3>
        Posted in <Link to={`/topic/${article.topic}`}>{article.topic}</Link> at{' '}
        {`${date.toLocaleTimeString()}, ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} by ${
          article.author
        }`}
      </h3>
      <p>{article.body}</p>
      <ArticleVotes article={article} />
      <CommentList article_id={article_id} />
    </section>
  );
}

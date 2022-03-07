import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.get('/articles').then(({ data: { articles } }) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>Loading Articles...</p>;

  return articles.map((article) => {
    console.log(article);

    const date = new Date(article.created_at);

    return (
      <article className="article-card" key={`article-${article.article_id}`}>
        <Link to={`/article/${article.article_id}`}>
          <h2>{article.title}</h2>
        </Link>
        <Link to={`/topic/${article.topic}`}>
          <h4>
            {`Posted in ${
              article.topic
            } at ${date.toLocaleTimeString()}, ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} by ${
              article.author
            }`}
          </h4>
        </Link>
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
  });
}

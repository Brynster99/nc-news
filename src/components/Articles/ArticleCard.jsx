import ArticleVotes from './ArticleVotes';
import { Link } from 'react-router-dom';

export default function ArticleCard({ article }) {
  const date = new Date(article.created_at);

  return (
    <article className="article-card" key={`article-${article.article_id}`}>
      <Link to={`/article/${article.article_id}`}>
        <h3>{article.title}</h3>
      </Link>

      <h4>
        Posted in <Link to={`/topic/${article.topic}`}>{article.topic}</Link> at{' '}
        {`${date.toLocaleTimeString()}, ${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()} by ${article.author}`}
      </h4>

      <ArticleVotes article={article} />

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
}

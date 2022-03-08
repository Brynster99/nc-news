import { useEffect, useState } from 'react';
import api from '../../api';

export default function CommentList({ article_id }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`/articles/${article_id}/comments`)
      .then(({ data: { comments } }) => {
        setComments(comments);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <p>{`Loading Comments...`}</p>;

  return (
    <section className="comment-list">
      <h3>Comments:</h3>
      <ul>
        {comments.map((comment) => {
          const date = new Date(comment.created_at);

          return (
            <li className="comment-card" key={`comment-${comment.comment_id}`}>
              <h5>{`${
                comment.author
              } at ${date.toLocaleTimeString()}, ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</h5>
              <p>{comment.body}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

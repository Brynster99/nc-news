import { useEffect, useState } from 'react';

import CommentCard from './CommentCard';
import PostComment from './PostComment';
import api from '../../../api';

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
      <h3>Comments</h3>
      <PostComment article_id={article_id} setComments={setComments} />
      <ul>
        {comments.map((comment) => (
          <CommentCard
            key={`comment-${comment.comment_id}`}
            comment={comment}
            setComments={setComments}
          />
        ))}
      </ul>
    </section>
  );
}

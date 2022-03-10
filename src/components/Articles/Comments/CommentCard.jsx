import { useContext, useState } from 'react';

import UserContext from '../../../Contexts/User';
import api from '../../../api';

export default function CommentCard({ comment, setComments }) {
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const { user } = useContext(UserContext);
  const date = new Date(comment.created_at);

  const deleteComment = () => {
    setIsLoading(true);
    setStatusMsg('Deleting Comment...');

    api.delete(`/comments/${comment.comment_id}`).then(() => {
      setComments((comments) => {
        const cloneComments = comments.map((comment) => {
          return { ...comment };
        });

        return cloneComments.filter(
          (cloneComment) => cloneComment.comment_id !== comment.comment_id
        );
      });

      setStatusMsg('');
      setIsLoading(false);
    });
  };

  return (
    <li className="comment-card" key={`comment-${comment.comment_id}`}>
      <h5>{`${
        comment.author
      } at ${date.toLocaleTimeString()}, ${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`}</h5>

      <p>{comment.body}</p>
      {comment.author === user ? (
        <section className="comment-controls">
          <button
            className="comment-button-delete"
            disabled={isLoading}
            onClick={deleteComment}
          >
            Delete
          </button>
          <p>{statusMsg}</p>
        </section>
      ) : (
        <></>
      )}
    </li>
  );
}

import { useContext, useState } from 'react';
import api from '../../../api';
import UserContext from '../../../Contexts/User';

export default function CommentCard({ comment, setComments }) {
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const { user } = useContext(UserContext);
  const date = new Date(comment.created_at);

  return (
    <li className="comment-card" key={`comment-${comment.comment_id}`}>
      <h5>{`${
        comment.author
      } at ${date.toLocaleTimeString()}, ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</h5>
      {comment.author === user ? (
        <section className="comment-controls">
          <button
            className="comment-button-delete"
            disabled={isLoading}
            onClick={() => {
              setIsLoading(true);
              setStatusMsg('Deleting Comment...');

              api.delete(`/comments/${comment.comment_id}`).then(() => {
                setComments((comments) => {
                  const cloneComments = comments.map((comment) => {
                    return { ...comment };
                  });

                  return cloneComments.filter(
                    (cloneComment) =>
                      cloneComment.comment_id !== comment.comment_id
                  );
                });
                setStatusMsg('');
                setIsLoading(false);
              });
            }}
          >
            Delete
          </button>
          <p>{statusMsg}</p>
        </section>
      ) : (
        <></>
      )}

      <p>{comment.body}</p>
    </li>
  );
}

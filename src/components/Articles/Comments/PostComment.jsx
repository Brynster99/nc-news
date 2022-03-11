import { useContext, useState } from 'react';

import UserContext from '../../../Contexts/User';
import api from '../../../api';

export default function PostComment({ article_id, setComments }) {
  const [inputBody, setInputBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const { user } = useContext(UserContext);

  return (
    <form
      className="postcomment-form"
      onSubmit={(e) => {
        e.preventDefault();

        if (!inputBody) {
          setStatusMsg('Please enter a valid comment...');
          return;
        }

        setIsLoading(true);
        setStatusMsg('Posting Comment...');

        api
          .post(`/articles/${article_id}/comments`, {
            username: user,
            body: inputBody,
          })
          .then(({ data: { comment } }) => {
            setComments((comments) => {
              const cloneComments = comments.map((comment) => {
                return { ...comment };
              });
              cloneComments.unshift(comment);
              return cloneComments;
            });

            setStatusMsg('');
            setIsLoading(false);
          });

        setInputBody('');
      }}
    >
      <label className="commentform-label" htmlFor="comment-body">
        Post a Comment:
      </label>
      <textarea
        className={`${isLoading ? 'hide' : 'show'}`}
        type="text"
        id="comment-body"
        value={inputBody}
        onChange={(e) => setInputBody(e.target.value)}
      />
      <button
        className={`postcomment-button-submit ${isLoading ? 'hide' : 'show'}`}
      >
        Post
      </button>

      <p>{statusMsg}</p>
    </form>
  );
}

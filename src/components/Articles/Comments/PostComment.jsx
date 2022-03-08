import { useContext, useState } from 'react';
import api from '../../../api';
import UserContext from '../../../Contexts/User';

export default function PostComment({ article_id, setComments }) {
  const [inputBody, setInputBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        setIsLoading(true);

        api
          .post(`/articles/${article_id}/comments`, {
            username: user,
            body: inputBody,
          })
          .then(({ data: { comment } }) => {
            setComments((comments) => {
              const cloneComments = [...comments];
              cloneComments.unshift(comment);
              return cloneComments;
            });
            setIsLoading(false);
          });

        setInputBody('');
      }}
    >
      <fieldset>
        <legend>Post a Comment</legend>
        <input
          className={isLoading ? 'hide' : 'show'}
          type="text"
          id="comment-body"
          value={inputBody}
          onChange={(e) => setInputBody(e.target.value)}
        />
        <button className={isLoading ? 'hide' : 'show'}>Post</button>
      </fieldset>
      <p>{isLoading ? 'Posting Comment...' : ''}</p>
    </form>
  );
}

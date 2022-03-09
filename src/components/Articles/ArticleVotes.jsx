import { useContext, useState } from 'react';

import UserContext from '../../Contexts/User';
import api from '../../api';

export default function ArticleVotes({ article }) {
  const [currentVotes, setCurrentVotes] = useState(article.votes);
  const [increment, setIncrement] = useState(0);
  const { user } = useContext(UserContext);

  const incVotes = (incrementBy) => {
    api.patch(`/articles/${article.article_id}`, { inc_votes: incrementBy });
  };

  return (
    <form className="votes-form" onSubmit={(e) => e.preventDefault()}>
      <button
        className="vote-button-increase"
        disabled={increment > 0 || !user ? true : false}
        onClick={() => {
          setIncrement((increment) => increment + 1);
          setCurrentVotes((currentVotes) => currentVotes + 1);
          incVotes(+1);
        }}
      >
        +1
      </button>
      <p>
        <b>{currentVotes}</b> votes
      </p>

      <button
        className="vote-button-decrease"
        disabled={increment < 0 || !user ? true : false}
        onClick={() => {
          setIncrement((increment) => increment - 1);
          setCurrentVotes((currentVotes) => currentVotes - 1);
          incVotes(-1);
        }}
      >
        -1
      </button>
    </form>
  );
}

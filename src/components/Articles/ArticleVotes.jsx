import { useState } from 'react';
import api from '../../api';

export default function ArticleVotes({ article }) {
  const [currentVotes, setCurrentVotes] = useState(article.votes);
  const [clicked, setClicked] = useState(false);

  const incVotes = (incrementBy) => {
    api.patch(`/articles/${article.article_id}`, { inc_votes: incrementBy });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <button
        disabled={clicked}
        onClick={() => {
          setClicked(true);
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
        disabled={clicked}
        onClick={() => {
          setClicked(true);
          setCurrentVotes((currentVotes) => currentVotes - 1);
          incVotes(-1);
        }}
      >
        -1
      </button>
    </form>
  );
}

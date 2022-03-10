import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import api from '../../api';

export default function Navbar() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    api.get('/topics').then(({ data: { topics } }) => {
      setTopics(topics);
    });
  }, []);

  return (
    <ul className="navigation-list-topics">
      <Link key="link-to-all" to="/nc-news/">
        <li key="topic-all">All</li>
      </Link>
      {topics.map((topic) => {
        return (
          <Link
            key={`link-to-${topic.slug}`}
            to={`/nc-news/topic/${topic.slug}`}
          >
            <li key={`topic-${topic.slug}`}>{topic.slug}</li>
          </Link>
        );
      })}
    </ul>
  );
}

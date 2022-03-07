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
    <ul>
      {topics.map((topic) => {
        return (
          <Link key={`link-to-${topic.slug}`} to={`/topic/${topic.slug}`}>
            <li key={`topic-${topic.slug}`}>{topic.slug}</li>
          </Link>
        );
      })}
    </ul>
  );
}

import { useParams } from 'react-router-dom';

export default function SingleArticle() {
  const { article_id } = useParams();

  return <h2>{`SingleArticle Page for article: ${article_id}`}</h2>;
}

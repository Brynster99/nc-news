import { Link } from 'react-router-dom';

export default function ErrorPage({ error }) {
  console.dir(error);

  return (
    <>
      <h2>
        {error
          ? `${error.response.status} - ${error.response.data.msg}`
          : '404 - Path not found'}
      </h2>
      <Link to="/nc-news/">
        <button>Back To Safety!</button>
      </Link>
    </>
  );
}

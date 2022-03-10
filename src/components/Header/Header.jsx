import { Link } from 'react-router-dom';
import UserContext from '../../Contexts/User';
import cuteFerret from '../../images/cuteFerret.png';
import { useContext } from 'react';

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <header>
      <Link to="/">
        <img src={cuteFerret} alt="cute ferret" width="125px" loading="lazy" />
      </Link>{' '}
      <Link to={'/'}>
        <h1>NC News</h1>
      </Link>
      <h3>Logged in as {user}</h3>
    </header>
  );
}

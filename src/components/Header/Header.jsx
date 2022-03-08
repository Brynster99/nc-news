import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../Contexts/User';

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <Link to="/">
      <header>
        <img src={'/cuteFerret.png'} alt="cute ferret" width="125px" />
        <h1>NC News</h1>
        <h3>{`Logged in as ${user}`}</h3>
      </header>
    </Link>
  );
}

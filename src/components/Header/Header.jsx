import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <Link to="/">
      <header>
        <img src={'/cuteFerret.png'} alt="cute ferret" width="125px" />
        <h1>NC News</h1>
      </header>
    </Link>
  );
}

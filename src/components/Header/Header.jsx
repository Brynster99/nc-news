import { Link } from 'react-router-dom';
import UserContext from '../../Contexts/User';
import loudSpeaker from '../../images/loudspeaker.png';
import profilePicture from '../../images/profilepicture.jpeg';
import { useContext } from 'react';

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <header>
      <Link to="/">
        <img src={loudSpeaker} alt="site logo" width="125px" loading="lazy" />
      </Link>{' '}
      <h1>The Loudest</h1>
      <section className="header-section-loggeduser">
        <img
          src={profilePicture}
          alt="logged in user's avatar"
          width="80px"
          height="80px"
          loading="lazy"
          className="header-image-avatar"
        />
        <h3>{user}</h3>
      </section>
    </header>
  );
}

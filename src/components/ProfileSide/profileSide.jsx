import './profileSide.css'
import NavMenu from '../NavMenu/NavMenu'
import profileImage from '../../assets/pfp.png'

const ProfileSide = () => {
  return (
    <div className="profile-side">
      <div className="greeting">
        <span className="wave">👋</span>
        <span>Hey</span>
      </div>
      <div 
        className="profile-image" 
        style={{ backgroundImage: `url(${profileImage})` }}
      />
      <p className="name-container">
        <span className="name-label">my name is</span>
        <span className="name">Mason Yarbrough</span>
      </p>
      <p className="bio">
        Founder of Kallro
        <br />
        I also do AI consulting on the side
      </p>
      <NavMenu />
    </div>
  );
};


export default ProfileSide;

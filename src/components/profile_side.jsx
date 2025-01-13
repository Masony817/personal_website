import profileImage from '../assets/pfp.png'

const ProfileSide = () => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      padding: '64px 32px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      position: 'relative',
      backgroundColor: '#F0F0EB',
    }}>
      <div style={{
        position: 'absolute',
        left: '180px',
        top: '64px',
        //transform: 'translateX(-50%)',
        transform: 'translateY(-50%)',
        padding: '5px 10px',
        backgroundColor: '#F2F2F2BF',
        borderRadius: '15px',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        fontSize: '24px',
        fontFamily: 'Circular',
      }}>
        👋 Hey
      </div>
      <div style={{
        width: '180px',
        height: '180px',
        backgroundColor: 'white',
        borderRadius: '15%',
        backgroundImage: `url(${profileImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: '0px 6px 6px rgba(0, 0, 0, 0.25)',
      }} />
      <p style={{
        padding: '16px 0px',
        fontFamily: 'Circular',
      }}>
        <span style={{
          fontSize: '24px',
          display: 'block'
        }}>my name is</span>
        <span style={{
          fontSize: '36px',
          display: 'block'
        }}>Mason Yarbrough</span>
      </p>
    </div>
  );
};

export default ProfileSide;

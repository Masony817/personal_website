import './index.css'
import ProfileSide from './components/profile_side'

function App() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      height: '100vh',
      width: '100vw',
    }}>
      {/* Left Section */}
      <div style={{
        backgroundColor: '#F0F0EB',
      }} />

      {/* Middle Left Section */}
      <ProfileSide />

      {/* Middle Right Section */}
      <div style={{
        backgroundColor: '#F0F0EB',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
      }}>
        
      </div>

      {/* Right Section */}
      <div style={{
        backgroundColor: '#F0F0EB',
      }} />
    </div>
  );
}

export default App;


import kallroIcon from '../../assets/kallro.svg'
import arrowIcon from '../../assets/external.svg'
import TypewriterText from '../TypewriterText/typewriterText'
import './navMenu.css'
import { useState } from 'react'

const NavigationMenu = () => {
  const menuItems = [
    { title: 'About me', path: '/about' },
    { title: 'Consulting', path: '/consulting' },
    { title: 'Experience', path: '/experience' },
    { title: 'Contact', path: '/contact' },
  ];

  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <nav className="nav-menu">
      <div
        onClick={() => window.open('https://kallro.com', '_blank')}
        className="kallro-link"
        onMouseEnter={() => setHoveredItem('kallro')}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <img src={kallroIcon} alt="Kallro" className="kallro-icon" />
        <span className="text-container">
          {hoveredItem === 'kallro' ? (
            <TypewriterText text="Kallro" speed={100} />
          ) : (
            'Kallro'
          )}
        </span>
        <img src={arrowIcon} alt="External Link" className="external-icon" />
      </div>

      {menuItems.map((item, index) => (
        <div
          key={index}
          onClick={() => window.location.href = item.path}
          className={`menu-item ${index !== menuItems.length - 1 ? 'with-border' : ''}`}
          onMouseEnter={() => setHoveredItem(item.title)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <span className="text-container">
            {hoveredItem === item.title ? (
              <TypewriterText text={item.title} speed={100} />
            ) : (
              item.title
            )}
          </span>
        </div>
      ))}
    </nav>
  );
};

export default NavigationMenu;

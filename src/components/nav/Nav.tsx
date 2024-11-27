import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Nav.css'

const Nav: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/home'); 
  };
  const handleModelsClick = () => {
    navigate('/models'); 
  };
  const handleVipClick = () => {
    navigate('/vip');
  };
  const handleServersClick = () => {
    navigate('/servers');
    window.scrollTo(0, 0);
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="nav">
        <button onClick={toggleSidebar} className="checkbtn">
          <FontAwesomeIcon icon={faBars} className="fas fa-bars" />
        </button>
        <label className="logo">Avalon</label>
        <ul className={isSidebarOpen ? 'open' : ''}>
          <li onClick={handleHomeClick}>Home</li>
          <li onClick={handleVipClick}>VIP</li>
          <li onClick={handleServersClick}>Servers</li>
          <li onClick={handleModelsClick}>Player Models</li>
          <li>
            <a href="https://avalonservers.rf.gd/backend/index.php">
              Weapon Skins
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
import { useNavigate } from 'react-router-dom';
import listIcon from '../assets/list.png';
import addIcon from '../assets/nav-add.png';
import logoutIcon from '../assets/logout.png';
import auth from '../utils/auth';

const AppNavbar = () => {

  const navigate = useNavigate();

  const handleListClick = () => {
    navigate('/notes');
  };

  const handleLogoutClick = () => {
    auth.logout();
    navigate('/');
  };

  const handleAddClick = () => {
    navigate('/home');
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-inner-container">
        <h2 className="navbar-title">My Feeling Pal</h2>
        <div className="flex gap-4">
          <button onClick={handleAddClick} className="navbar-button">
            <img src={addIcon} alt="add" className="w-6 h-6" />
          </button>
          <button onClick={handleListClick} className="navbar-button">
            <img src={listIcon} alt="list" className="w-6 h-6" />
          </button>
          <button onClick={handleLogoutClick} className="navbar-button">
            <img src={logoutIcon} alt="logout" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;

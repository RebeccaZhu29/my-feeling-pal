import listIcon from '../assets/list.png';
import logoutIcon from '../assets/logout.png';

const AppNavbar = () => {
  return (
    <nav className="navbar-container">
      <div className="navbar-inner-container">
        <h2 className="navbar-title">My Feeling Pal</h2>
        <div className="flex gap-4">
          <button className="navbar-button">
            <img src={listIcon} alt="list" className="w-6 h-6" />
          </button>
          <button className="navbar-button">
            <img src={logoutIcon} alt="logout" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;

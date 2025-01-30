import { useState } from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import Auth from '../utils/auth';

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  return (
    <>
      <nav className="bg-gray-800 py-3">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-white text-xl font-bold">
              My Feeling Pal
            </Link>

            <button className="lg:hidden text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>

            <div className="hidden lg:flex items-center space-x-4">
              <Link to="/" className="text-gray-300 hover:text-white">
                Home
              </Link>
              {Auth.loggedIn() ? (
                <>
                  <Link to="/feelings" className="text-gray-300 hover:text-white">
                    My Feelings
                  </Link>
                  <button
                    onClick={Auth.logout}
                    className="text-gray-300 hover:text-white"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowModal(true)}
                  className="text-gray-300 hover:text-white"
                >
                  Login/Sign Up
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button
                    className={`px-4 py-2 rounded ${activeTab === 'login' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('login')}
                  >
                    Login
                  </button>
                  <button
                    className={`px-4 py-2 rounded ${activeTab === 'signup' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('signup')}
                  >
                    Sign Up
                  </button>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-4">
              {activeTab === 'login' ? (
                <LoginForm handleModalClose={() => setShowModal(false)} />
              ) : (
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppNavbar;

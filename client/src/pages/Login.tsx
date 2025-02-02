import { useState } from 'react';
import { Link } from 'react-router-dom';
import happyIcon from '../assets/happy.png';
import sadIcon from '../assets/sad.png';
import tiredIcon from '../assets/tired.png';
import calmIcon from '../assets/calm.png';
import worriedIcon from '../assets/worried.png';
import angryIcon from '../assets/angry.png';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen bg-[#FAF3E1] flex flex-col items-center pt-8">
      <h1
        style={{ fontFamily: 'Playfair Display, serif' }}
        className="text-[#0F4C44] text-4xl font-bold mb-24"
      >
        My Feeling Pal
      </h1>

      {/* Emoji Row */}
      <div className="flex gap-4 mb-12">
        <img src={happyIcon} alt="Happy" className="w-24 h-24" />
        <img src={sadIcon} alt="Sad" className="w-24 h-24" />
        <img src={tiredIcon} alt="Tired" className="w-24 h-24" />
        <img src={calmIcon} alt="Calm" className="w-24 h-24" />
        <img src={worriedIcon} alt="Worried" className="w-24 h-24" />
        <img src={angryIcon} alt="Angry" className="w-24 h-24" />
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 w-full max-w-xs">
        <div className="w-full">
          <label className="text-[#7B2869] text-xl mb-2 block">Username</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full px-4 py-2 border-2 border-[#7B2869] rounded-lg"
          />
        </div>

        <div className="w-full">
          <label className="text-[#7B2869] text-xl mb-2 block">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-2 border-2 border-[#7B2869] rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="bg-[#7B2869] text-white text-xl py-2 px-12 rounded-full 
            shadow-md hover:bg-[#6a225c] transition-colors duration-300 w-[160px] text-center"
        >
          Log In
        </button>

        <Link
          to="/signup"
          className="bg-[#7B2869] text-white text-xl py-2 px-12 rounded-full 
            shadow-md hover:bg-[#6a225c] transition-colors duration-300 w-[160px] text-center"
        >
          Sign Up
        </Link>
      </form>
    </div>
  );
};

export default Login;
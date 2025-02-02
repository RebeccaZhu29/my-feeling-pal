import { useState } from 'react';
import happyIcon from '../assets/happy.png';
import sadIcon from '../assets/sad.png';
import tiredIcon from '../assets/tired.png';
import calmIcon from '../assets/calm.png';
import worriedIcon from '../assets/worried.png';
import angryIcon from '../assets/angry.png';
import Auth from '../utils/auth';
import { LOGIN_USER } from '../utils/mutations';
import { useMutation } from '@apollo/client';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [login, { error }] = useMutation(LOGIN_USER);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here

    try {
      const { data } = await login({
        variables: {
          email: formData.username,
          password: formData.password,
        },
      });
  
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
    }    
  };

  return (
    <div className="login-container">
      <h1>My Feeling Pal</h1>

      {/* Emoji Row */}
      <div className="flex gap-4 mb-12">
        <img src={happyIcon} alt="Happy" className="emoji" />
        <img src={sadIcon} alt="Sad" className="emoji" />
        <img src={tiredIcon} alt="Tired" className="emoji" />
        <img src={calmIcon} alt="Calm" className="emoji" />
        <img src={worriedIcon} alt="Worried" className="emoji" />
        <img src={angryIcon} alt="Angry" className="emoji" />
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 w-full max-w-xs">
        <div className="w-full">
          <input
            type="text"
            placeholder='Username'
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="input"
          />
        </div>

        <div className="w-full">
          <input
            type="password"
            placeholder='Password'
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="input"
          />
        </div>
        <p className='text-red-500'>{error ? 'Invalid username or password' : ''}</p>
        <button className='login-button' type="submit">Log In</button>

        <button
          className='login-button'
          onClick={() => window.location.href = '/signup'}
          type="button"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Login;  
import { useState } from 'react';
import happyIcon from '../assets/happy.png';
import sadIcon from '../assets/sad.png';
import tiredIcon from '../assets/tired.png';
import calmIcon from '../assets/calm.png';
import worriedIcon from '../assets/worried.png';
import angryIcon from '../assets/angry.png';
import Auth from '../utils/auth';
import { LOGIN_USER, ADD_USER } from '../utils/mutations';
import { useMutation } from '@apollo/client';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLogin, setIsLogin] = useState(true);

  const [login, { error }] = useMutation(LOGIN_USER);
  const [addUser] = useMutation(ADD_USER);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const { data } = await login({ variables: formData });
        Auth.login(data.login.token);
      } else {
        const { data } = await addUser({ variables: formData });
        Auth.login(data.addUser.token);
      }
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
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="input"
          />
        </div>

        <div className="w-full">
          <input
            type="password"
            placeholder='Password'
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="input"
          />
        </div>

        <p className='text-red-500'>{error ? 'Invalid username or password' : ''}</p>

        <button className='login-button' type="submit">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>

        <button
          className='signup-login-switch-button'
          onClick={() => setIsLogin(!isLogin)}
          type="button"
        >
          {isLogin ? 'Need to Sign Up?' : 'Already have an account?'}
        </button>
      </form>
    </div>
  );
}  
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import happyIcon from '../assets/happy.png';
import sadIcon from '../assets/sad.png';
import tiredIcon from '../assets/tired.png';
import calmIcon from '../assets/calm.png';
import worriedIcon from '../assets/worried.png';
import angryIcon from '../assets/angry.png';
import { useMutation } from '@apollo/client';
import { ADD_FEELING, GENERATE_TIP } from '../utils/mutations';
import auth from '../utils/auth';
import { FeelingType } from '../models/Feeling';
import AppNavbar from '../components/Navbar';

const feelings: { type: FeelingType; label: string; icon: string; color: string }[] = [
  { type: 'happy', label: 'Happy', icon: happyIcon, color: 'text-emerald-800' },
  { type: 'sad', label: 'Sad', icon: sadIcon, color: 'text-emerald-800' },
  { type: 'tired', label: 'Tired', icon: tiredIcon, color: 'text-emerald-800' },
  { type: 'calm', label: 'Calm', icon: calmIcon, color: 'text-emerald-800' },
  { type: 'worried', label: 'Worried', icon: worriedIcon, color: 'text-emerald-800' },
  { type: 'angry', label: 'Angry', icon: angryIcon, color: 'text-emerald-800' },
];

const Home = () => {
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  const navigate = useNavigate();
  const [addFeeling, { error }] = useMutation(ADD_FEELING);
  const [generateTip, { error: tipError }] = useMutation(GENERATE_TIP);
  const [loading, setLoading] = useState(false);

  const handleFeelingClick = async (feeling: FeelingType) => {
    // Add logic to save the feeling
    // get token
    const token = auth.loggedIn() ? auth.getToken() : null;

    if (!token) {
      return false;
    }

    // add loading here
    setLoading(true);
    const [feelingResult, tipResult] = await Promise.all([
      addFeeling({
        variables: {
          feelingType: feeling,
        },
      }),
      generateTip({
        variables: {
          feelingType: feeling,
        },
      }),
    ]);

    setLoading(false);
    navigate('/notes');
  };

  const renderEmoji = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 justify-items-center">
      {feelings.map((feeling) => (
        selectedFeeling === null || selectedFeeling === feeling.type ? (
          <div
            key={feeling.type}
            className="flex flex-col items-center space-y-4 cursor-pointer"
            onClick={() => handleFeelingClick(feeling.type)}
          >
            <div className="transform transition-transform duration-300 hover:scale-110">
              <img
                src={feeling.icon}
                alt={feeling.label}
                className="w-36 h-36 drop-shadow-lg"
              />
            </div>
            <div
              className="w-24 h-10 bg-[#FEFCEA] rounded-[8px] drop-shadow-lg 
              flex items-center justify-center"
            >
              <span className={`${feeling.color} font-bold text-lg font-Source Serif Pro`}>
                {feeling.label}
              </span>
            </div>
          </div>
        ) : null
      ))}
    </div>
  )

  return (
    <div className="home-container">
      <AppNavbar />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pt-12">
        <h1
          style={{ color: '#FEFAE0', marginBottom: '128px' }}
          className="text-[36px] font-bold font-serif text-center"
        >
          How am I feeling now?
        </h1>

        {loading ?
          (
            <div className="flex justify-center items-center h-50">
              <div className="animate-spin rounded-full h-32 w-32 border-t-5 border-b-5 border-cream text-white"></div>
            </div>
          ) :
          renderEmoji()}
      </div>
    </div>
  );
};

export default Home;
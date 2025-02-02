import { useState } from 'react';
import happyIcon from '../assets/happy.png';
import sadIcon from '../assets/sad.png';
import tiredIcon from '../assets/tired.png';
import calmIcon from '../assets/calm.png';
import worriedIcon from '../assets/worried.png';
import angryIcon from '../assets/angry.png';

const feelings = [
  { type: 'happy', label: 'Happy', icon: happyIcon, color: 'text-emerald-800' },
  { type: 'sad', label: 'Sad', icon: sadIcon, color: 'text-emerald-800' },
  { type: 'tired', label: 'Tired', icon: tiredIcon, color: 'text-emerald-800' },
  { type: 'calm', label: 'Calm', icon: calmIcon, color: 'text-emerald-800' },
  { type: 'worried', label: 'Worried', icon: worriedIcon, color: 'text-emerald-800' },
  { type: 'angry', label: 'Angry', icon: angryIcon, color: 'text-emerald-800' },
];

const Home = () => {
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);

  const handleFeelingClick = (type: string) => {
    setSelectedFeeling(type);
  };

  return (
    <div className="home-container">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pt-12">
        <h1
          style={{ color: '#FEFAE0', marginBottom: '128px' }}
          className="text-[36px] font-bold font-serif text-center"
        >
          How am I feeling now?
        </h1>

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

        {selectedFeeling && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setSelectedFeeling(null)}
              style={{ color: '#FEFAE0' }}
              className="px-6 py-2 bg-cream hover:bg-cream-700 rounded-full 
                transition-colors duration-300"
            >
              Choose Another Feeling
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
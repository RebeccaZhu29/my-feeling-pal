import { useState } from 'react';
import happyIcon from '../assets/happy.png';
import sadIcon from '../assets/sad.png';
import tiredIcon from '../assets/tired.png';
import calmIcon from '../assets/calm.png';
import worriedIcon from '../assets/worried.png';
import angryIcon from '../assets/angry.png';

const feelings = [
  { type: 'happy', label: 'Happy', icon: happyIcon, color: 'text-purple-700' },
  { type: 'sad', label: 'Sad', icon: sadIcon, color: 'text-purple-700' },
  { type: 'tired', label: 'Tired', icon: tiredIcon, color: 'text-purple-700' },
  { type: 'calm', label: 'Calm', icon: calmIcon, color: 'text-purple-700' },
  { type: 'worried', label: 'Worried', icon: worriedIcon, color: 'text-purple-700' },
  { type: 'angry', label: 'Angry', icon: angryIcon, color: 'text-purple-700' },
];

const Home = () => {
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);

  const handleFeelingClick = (type: string) => {
    setSelectedFeeling(type);
  };

  return (
    <div className="min-h-screen bg-emerald-800">
      {/* Header */}
      <div className="bg-cream rounded-lg mx-4 mt-4 p-4 flex justify-between items-center">
        <h2 className="text-purple-700 text-2xl font-bold">My Feeling Pal</h2>
        <div className="flex gap-4">
          <button className="text-purple-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button className="text-purple-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>

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
                    className="w-24 h-24 drop-shadow-lg"
                  />
                </div>
                <div
                  className="w-24 h-10 bg-[#FEFCEA] rounded-[8px] drop-shadow-lg 
                    flex items-center justify-center"
                >
                  <span className={`${feeling.color} font-bold text-lg`}>
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
              className="px-6 py-2 bg-cream hover:bg-purple-700 rounded-full 
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
import { useState, useEffect } from 'react';
import AppNavbar from '../components/Navbar';
import trashIcon from '../assets/Trash.png';
import editIcon from '../assets/Edit.png';
import addIcon from '../assets/Add.png';

interface Note {
  id: number;
  date: string;
  feeling: string;
  aiTip?: string;
}

const NoteList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const generateAITip = async (feeling: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/generate-tip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feeling,
          prompt: `Generate a 50-word wellbeing tip for someone who is feeling ${feeling}. The tip should be supportive and actionable.`
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate AI tip');
      }

      const data = await response.json();
      return data.tip;
    } catch (error) {
      console.error('Error generating AI tip:', error);
      return 'AI tip unavailable at the moment.';
    }
  };

  useEffect(() => {
    const initializeNotes = async () => {
      const currentFeeling = localStorage.getItem('currentFeeling') || 'Happy';
      const aiTip = await generateAITip(currentFeeling);

      const newNotes = [
        {
          id: 1,
          date: new Date().toLocaleString(),
          feeling: `I am feeling ${currentFeeling.toLowerCase()}`,
          aiTip
        },
        {
          id: 2,
          date: '12/15/2023, 2:30 PM',
          feeling: 'Tired'
        },
        {
          id: 3,
          date: '12/14/2023, 11:20 AM',
          feeling: 'Worried'
        },
        {
          id: 4,
          date: '12/13/2023, 4:15 PM',
          feeling: 'Calm'
        },
        {
          id: 5,
          date: '12/12/2023, 9:45 AM',
          feeling: 'Sad'
        }
      ];

      setNotes(newNotes);
      setIsLoading(false);
    };

    initializeNotes();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-emerald-800">
      <AppNavbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[#FEFAE0] text-2xl font-['Source_Serif_Pro']">
            Note List
          </h2>
          <button className="bg-[#FEFAE0] p-2 rounded-lg hover:bg-opacity-90 transition-all">
            <img src={addIcon} alt="Add new note" className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-[#FEFAE0] rounded-lg p-6 shadow-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-[#7B2869] font-['Source_Serif_Pro']">
                  {note.date}
                </span>
                <div className="flex gap-2">
                  <button className="hover:opacity-70 transition-opacity">
                    <img src={editIcon} alt="Edit" className="w-5 h-5" />
                  </button>
                  <button className="hover:opacity-70 transition-opacity">
                    <img src={trashIcon} alt="Delete" className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-lg font-['Source_Serif_Pro'] text-[#7B2869]">
                  Feeling: {note.feeling}
                </span>
              </div>

              {note.aiTip && (
                <div className="mt-4 p-4 bg-[#7B2869] bg-opacity-10 rounded-lg">
                  <p className="text-[#7B2869] font-['Source_Serif_Pro']">
                    AI Tip: {note.aiTip}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteList;
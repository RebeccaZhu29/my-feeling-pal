import { useState, useEffect } from 'react';
import AppNavbar from '../components/Navbar';
import addIcon from '../assets/Add.png';
import { useQuery } from '@apollo/client';
import { QUERY_FEELINGS } from '../utils/queries';
import auth from '../utils/auth';
import { Feeling } from '../models/Feeling';
import NoteItem from '../components/NoteItem';


const NoteList = () => {
  const [notes, setNotes] = useState<Feeling[]>([]);

  const { loading, error, data } = useQuery(QUERY_FEELINGS);

  useEffect(() => {
    const initializeNotes = async () => {
      // get token
      const token = auth.loggedIn() ? auth.getToken() : null;

      if (!token) {
        return false;
      }
    };

    initializeNotes();
  }, []);

  useEffect(() => {
    if (data) {
      setNotes(data.feelings);
    }
  }, [data]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-emerald-800">
      <AppNavbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {notes.map((note) => (
            <NoteItem key={note.feelingId} note={note} />
          ))}
        </div>
      </div>
    </div>
  );
};



export default NoteList;
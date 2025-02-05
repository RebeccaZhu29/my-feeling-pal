import { useState, useEffect } from 'react';
import AppNavbar from '../components/Navbar';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_FEELINGS_AND_WELLBEING } from '../utils/queries';
import auth from '../utils/auth';
import { Feeling } from '../models/Feeling';
import NoteItem from '../components/NoteItem';
import { REMOVE_FEELING, UPDATE_FEELING } from '../utils/mutations';

const NoteList = () => {
  const [notes, setNotes] = useState<Feeling[]>([]);

  const [wellbeingTip, setWellbeingTip] = useState<string>('');

  const { loading, error, data, refetch } = useQuery(QUERY_FEELINGS_AND_WELLBEING);

  const [deleteFeeling, { error: deleteError }] = useMutation(REMOVE_FEELING, {
    refetchQueries: [{ query: QUERY_FEELINGS_AND_WELLBEING }],
  });

  const [updateFeeling, { error: updateError }] = useMutation(UPDATE_FEELING, {
    refetchQueries: [{ query: QUERY_FEELINGS_AND_WELLBEING }],
  });

  const initializeNotes = async () => {
    // get token
    const token = auth.loggedIn() ? auth.getToken() : null;

    if (!token) {
      return false;
    }
    refetch();
  };

  useEffect(() => {
    initializeNotes();
  }, []);

  useEffect(() => {
    console.log('data is updated', data);
    if (data?.feelingsAndWellbeing) {
      const feelings = [...data.feelingsAndWellbeing.feelings].sort((a: Feeling, b: Feeling) => new Date(Number(b.date)).getTime() - new Date(Number(a.date)).getTime());
      setNotes(feelings);
      setWellbeingTip(data.feelingsAndWellbeing.wellbeingTip);
    }
  }, [data]);

  const handleDelete = async (noteId: string) => {
    console.log('Deleting note with ID:', noteId);
    await deleteFeeling({
      variables: {
        feelingId: noteId,
      },
    })
  };

  const handleUpdate = async (updatedNote: Feeling) => {
    console.log('Updating note:', updatedNote);
    await updateFeeling({
      variables: {
        feelingData: {
          feelingId: updatedNote.feelingId,
          description: updatedNote.description,
        },
      },
    });
  };

  return (
    <div className="note-list-container">
      <AppNavbar />
      <div className="main-container">
        <div className="feelings-container">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cream"></div>
            </div>
          ) : notes && notes.length > 0 ? (
            notes.map((note) => (
              <NoteItem
                key={note.feelingId}
                note={note}
                onDelete={() => handleDelete(note.feelingId)}
                onUpdate={(newNote) => handleUpdate(newNote)}
              />
            ))
          ) : (
            <div className="text-center text-cream py-8">
              No feelings recorded yet. Start by adding one!
            </div>
          )}
        </div>

        <div className="wellbeing-tip-container">
          <h2>Wellbeing Tip</h2>
          <div>
            {wellbeingTip || 'Record your feelings to get personalized wellbeing tips!'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteList;
import { Feeling } from "../models/Feeling";
import trashIcon from '../assets/Trash.png';
import editIcon from '../assets/Edit.png';
import saveIcon from '../assets/save.png';
import cancelIcon from '../assets/cancel.png';
import { useState } from "react";

const NoteItem = ({ note }: { note: Feeling }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(note);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };



  return (
    <div
      key={note.feelingId}
      className="bg-[#FEFAE0] rounded-lg p-6 shadow-lg"
    >

      <div className="flex justify-between items-start mb-4">
        <span className="text-[#7B2869] font-['Source_Serif_Pro']">
          {new Date(note.date).toDateString()}
        </span>
        <div className="flex gap-2">
          {!isEditing ?
            <button onClick={handleEdit} className="hover:opacity-70 transition-opacity">
              <img src={editIcon} alt="Edit" className="w-5 h-5" />
            </button> :
            <button onClick={handleSave} className="hover:opacity-70 transition-opacity">
              <img src={saveIcon} alt="Save" className="w-5 h-5" />
            </button>
          }
          {!isEditing ?
            <button onClick={handleDelete} className="hover:opacity-70 transition-opacity">
              <img src={trashIcon} alt="Delete" className="w-5 h-5" />
            </button>
            :
            <button onClick={handleCancel} className="hover:opacity-70 transition-opacity">
              <img src={cancelIcon} alt="Cancel" className="w-5 h-5" />
            </button>
          }
        </div>
      </div>

      {!isEditing ?
        <div className="flex items-center gap-4">
          <span className="text-lg font-['Source_Serif_Pro'] text-[#7B2869]">
            Feeling: {note.description}
          </span>
        </div> : <input type="text" value={editedNote.description} onChange={(e) => setEditedNote({ ...editedNote, description: e.target.value })} />}
    </div>
  );
};

export default NoteItem;
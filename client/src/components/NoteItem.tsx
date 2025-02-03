import { Feeling } from "../models/Feeling";
import trashIcon from '../assets/Trash.png';
import editIcon from '../assets/Edit.png';
import saveIcon from '../assets/save.png';
import cancelIcon from '../assets/cancel.png';
import { useState } from "react";

const NoteItem = ({ note, onDelete, onUpdate, isFirst = false }: { note: Feeling, onDelete: () => void, onUpdate: (note: Feeling) => void, isFirst: boolean }) => {

  const [isEditing, setEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(note);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    onUpdate(editedNote);
    setEditing(false);
  };

  const handleDelete = () => {
    onDelete();
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const formatDate = (date: string) => {
    return new Date(Number(date)).toLocaleDateString('en-AU', { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short' });
  };

  const formatTime = (date: string) => {
    return new Date(Number(date)).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      key={note.feelingId}
      className={`note-item ${isFirst ? 'first-note-item' : ''}`}
    >

      <div className="note-item-header">
        <span className="note-item-date">
          {formatTime(note.date)} {formatDate(note.date)}
        </span>
        <div className="flex gap-2">
          {!isEditing ?
            <button onClick={handleEdit} className="note-item-button">
              <img src={editIcon} alt="Edit" className="button-icon" />
            </button> :
            <button onClick={handleSave} className="note-item-button">
              <img src={saveIcon} alt="Save" className="button-icon" />
            </button>
          }
          {!isEditing ?
            <button onClick={handleDelete} className="note-item-button">
              <img src={trashIcon} alt="Delete" className="button-icon" />
            </button>
            :
            <button onClick={handleCancel} className="note-item-button">
              <img src={cancelIcon} alt="Cancel" className="button-icon" />
            </button>
          }
        </div>
      </div>

      {!isEditing ?
        <div className="flex items-center gap-4">
          <span className="note-item-content">
            {note.description}
          </span>
        </div> :
        <input className="note-item-content-input flex-1" autoFocus type="text" value={editedNote.description} onChange={(e) => setEditedNote({ ...editedNote, description: e.target.value })} />}
    </div>
  );
};

export default NoteItem;
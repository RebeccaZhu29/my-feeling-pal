import { Feeling } from "../models/Feeling";
import trashIcon from '../assets/Trash.png';
import editIcon from '../assets/Edit.png';
import saveIcon from '../assets/save.png';
import cancelIcon from '../assets/cancel.png';
import { useState } from "react";

const NoteItem = ({ note, onDelete, onUpdate }: { note: Feeling, onDelete: () => void, onUpdate: (note: Feeling) => void }) => {

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
      className="note-item"
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

      <div className="note-item-body">
        {!isEditing ? (
          <span className="note-item-content">
            {note.description}
          </span>
        ) : (
          <input
            className="note-item-content-input"
            autoFocus
            type="text"
            value={editedNote.description}
            onChange={(e) => setEditedNote({ ...editedNote, description: e.target.value })}
          />
        )}
      </div>
    </div>
  );
};

export default NoteItem;
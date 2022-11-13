import React from "react";
import parser from "html-react-parser";
import PropTypes from "prop-types";

const NoteCard = ({ note, showSelectedNote }) => {
  const { id, title, body, createdAt, archived, color } = note;

  return (
    <div className={`note-card ${color} ${archived ? "dark" : ""}`} onClick={() => showSelectedNote(id, color)}>
      <p className="card-title">{title}</p>
      <p className="card-date">{createdAt}</p>
      <p className="card-body">{parser(body)}</p>
    </div>
  );
};

NoteCard.propTypes = {
  note: PropTypes.object.isRequired,
  showSelectedNote: PropTypes.func.isRequired,
};

export default NoteCard;

import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineMoreVert, MdClose, MdOutlineDelete, MdOutlinePalette, MdOutlineArchive, MdOutlineUnarchive } from "react-icons/md";
import PropTypes from "prop-types";

import { deleteNote, archiveNote, unarchiveNote } from "../utils/local-data";

const ActionButtons = ({ note, showButtons, toggleActionButtons, colorPalette, toggleColorPalette, changeNoteColor }) => {
  const navigate = useNavigate();
  const colors = ["orange", "peachOrange", "greyGreen", "blue", "purple", "pink", "green"];
  const { id, archived, color } = note;

  return (
    <div className="note-actions">
      {showButtons ? (
        <>
          <button onClick={() => toggleActionButtons(false)} className="close-button">
            <MdClose className="close-icon" alt="close-icon" />
          </button>

          {archived ? (
            <button
              onClick={() => {
                unarchiveNote(id);
                navigate("/");
              }}
              className="unarchive-button"
            >
              <MdOutlineUnarchive className="unarchive-icon" alt="unarchive-icon" />
            </button>
          ) : (
            <button
              onClick={() => {
                archiveNote(id);
                navigate("/archives");
              }}
              className="archive-button"
            >
              <MdOutlineArchive className="archive-icon" alt="archive-icon" />
            </button>
          )}

          <button onClick={toggleColorPalette} className="palette-button">
            <MdOutlinePalette className="palette-icon" alt="palette-icon" />
          </button>

          <div className={`color-picker ${colorPalette ? "" : "hide"}`}>
            {colors.map((colorName, index) => (
              <div key={index} className={`color-option ${colorName} ${archived ? "dark" : ""} ${colorName === color ? "selected" : ""}`} onClick={() => changeNoteColor(colorName)}></div>
            ))}
          </div>

          <button
            onClick={() => {
              deleteNote(id);
              navigate("/");
            }}
            className="delete-button"
          >
            <MdOutlineDelete className="delete-icon" alt="delete-icon" />
          </button>
        </>
      ) : (
        <button onClick={() => toggleActionButtons(true)} className="more-button">
          <MdOutlineMoreVert className="more-icon" alt="more-icon" />
        </button>
      )}
    </div>
  );
};

ActionButtons.propTypes = {
  note: PropTypes.object.isRequired,
  showButtons: PropTypes.bool.isRequired,
  toggleActionButtons: PropTypes.func.isRequired,
  colorPalette: PropTypes.bool.isRequired,
  toggleColorPalette: PropTypes.func.isRequired,
  changeNoteColor: PropTypes.func.isRequired,
};

export default ActionButtons;

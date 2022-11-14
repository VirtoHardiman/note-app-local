import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineNoteAdd, MdOutlineSearch } from "react-icons/md";
import PropTypes from "prop-types";

const DashboardActions = ({ showSearchbar, toggleSearchBar }) => {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => navigate("/note-app-local/new")}
        className="add-button"
      >
        <MdOutlineNoteAdd className="add-icon" alt="add-icon" />
      </button>
      {!showSearchbar && (
        <button
          onClick={(event) => {
            event.stopPropagation();
            toggleSearchBar(true);
          }}
          className="search-button"
        >
          <MdOutlineSearch className="search-bar-icon" alt="search-bar-icon" />
        </button>
      )}
    </>
  );
};

DashboardActions.propTypes = {
  showSearchbar: PropTypes.bool.isRequired,
  toggleSearchBar: PropTypes.func.isRequired,
};

export default DashboardActions;

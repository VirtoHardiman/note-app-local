import React from "react";
import { Link, useLocation } from "react-router-dom";

import { getNote } from "../utils/local-data";

const Navbar = () => {
  const currentURL = useLocation().pathname;
  const noteListURL = "/";
  const archiveListURL = "/archives";
  const noteDetailURL = currentURL.includes("note-");
  let noteDetailType = "";

  if (noteDetailURL) {
    const noteId = currentURL.slice(6);
    if (getNote(noteId)) {
      getNote(noteId).archived
        ? (noteDetailType = "archive")
        : (noteDetailType = "note");
    }
  }

  return (
    <nav>
      <Link to="/">NoteApp</Link>
      {(currentURL === noteListURL || noteDetailType === "archive") && (
        <Link to="/archives">Archives</Link>
      )}
      {(currentURL === archiveListURL || noteDetailType === "note") && (
        <Link to="/">Notes</Link>
      )}
    </nav>
  );
};

export default Navbar;

import React, { Component } from "react";
import autoBind from "auto-bind";
import { useParams } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import ContentEditable from "react-contenteditable";
import PropTypes from "prop-types";

import { getNote, editNoteColor, editNote } from "../utils/local-data";
import ActionButtons from "../components/ActionButtons";
import ErrorToast from "../components/ErrorToast";

const NoteDetailWrapper = () => {
  const { id } = useParams();
  let noteData = {};
  if (getNote(id)) {
    noteData = getNote(id);
  }
  return <NoteDetail noteData={noteData} />;
};

class NoteDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: this.props.noteData,
      title: this.props.noteData.title,
      body: this.props.noteData.body,
      showUpdate: false,
      showButtons: false,
      colorPalette: false,
      error: false,
      errorMessage: "",
    };
    autoBind(this);
  }

  showUpdateButton = (inputCategory, value) => {
    if (inputCategory === "title") {
      if (value !== this.state.note.title) {
        return this.setState({
          showUpdate: true,
        });
      }
    }
    if (inputCategory === "body") {
      if (value !== this.state.note.body) {
        return this.setState({
          showUpdate: true,
        });
      }
    }
    return this.setState({
      showUpdate: false,
    });
  };

  titleInputHandler = (event) => {
    this.setState({
      title: event.target.value,
    });
    this.showUpdateButton("title", event.target.value);
  };

  bodyInputHandler = (event) => {
    this.setState({
      body: event.target.value,
    });
    this.showUpdateButton("body", event.target.innerHTML);
  };

  triggerErrorToast = (errorMessage) => {
    this.setState({
      error: true,
      errorMessage,
    });
    setTimeout(() => {
      this.setState({
        error: false,
      });
    }, 2000);
  };

  updateNote = () => {
    if (!this.state.title) {
      return this.triggerErrorToast("Note title is required!");
    }
    if (!this.state.body) {
      return this.triggerErrorToast("Note content is required!");
    }
    editNote(this.state.note.id, this.state.title, this.state.body);
    this.setState({
      showUpdate: false,
    });
  };

  toggleActionButtons = (condition) => {
    this.setState({
      showButtons: condition,
    });
  };

  toggleColorPalette = () => {
    this.setState({
      colorPalette: !this.state.colorPalette,
    });
  };

  changeNoteColor = (color) => {
    this.setState((prevState) => ({
      note: {
        ...prevState.note,
        color,
      },
    }));
    editNoteColor(this.state.note.id, color);
  };

  render() {
    if (JSON.stringify(this.state.note) === JSON.stringify({})) {
      return (
        <div className="page-wrapper">
          <h1>204</h1>
          <p>
            <span>Note's</span> <span>not found.</span>
          </p>
        </div>
      );
    }

    const { createdAt, archived, color } = this.state.note;
    return (
      <>
        <ErrorToast error={this.state.error} errorMessage={this.state.errorMessage} />
        <button className={`update-button ${this.state.showUpdate ? "show" : ""}`} onClick={this.updateNote}>
          Update Note
        </button>
        <div className={`note-detail ${color} ${archived ? "dark" : ""}`}>
          <div className="note-container">
            <form>
              <TextareaAutosize value={this.state.title} placeholder="e.g Today's Agenda" className="title-input" onInput={this.titleInputHandler} />
              <p className="note-date">{createdAt}</p>
              <ContentEditable innerRef={this.contentEditable} html={this.state.body} onChange={this.bodyInputHandler} data-placeholder="e.g 1. Jogging at 8 AM" className="body-input" />
            </form>

            <ActionButtons
              note={this.state.note}
              showButtons={this.state.showButtons}
              toggleActionButtons={this.toggleActionButtons}
              colorPalette={this.state.colorPalette}
              toggleColorPalette={this.toggleColorPalette}
              changeNoteColor={this.changeNoteColor}
            />
          </div>
        </div>
      </>
    );
  }
}

NoteDetail.propTypes = {
  noteData: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    createdAt: PropTypes.string,
    archived: PropTypes.bool,
    color: PropTypes.string,
  }),
};

export default NoteDetailWrapper;

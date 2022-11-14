import React, { Component } from "react";
import autoBind from "auto-bind";
import { useNavigate } from "react-router-dom";
import { MdOutlineCheck, MdOutlinePalette } from "react-icons/md";
import TextareaAutosize from "react-textarea-autosize";
import ContentEditable from "react-contenteditable";
import PropTypes from "prop-types";

import { addNote } from "../utils/local-data";
import ErrorToast from "../components/ErrorToast";

const AddNoteWrapper = () => {
  const navigate = useNavigate();

  return <AddNote navigate={navigate} />;
};

class AddNote extends Component {
  constructor(props) {
    super(props);
    this.contentEditable = React.createRef();
    this.state = {
      title: "",
      body: "",
      color: "orange",
      showColors: false,
      colors: [
        "orange",
        "peachOrange",
        "greyGreen",
        "blue",
        "purple",
        "pink",
        "green",
      ],
      error: false,
      errorMessage: "",
    };
    autoBind(this);
  }

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

  titleInputHandler = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  bodyInputHandler = (event) => {
    this.setState({
      body: event.target.value,
    });
  };

  submitNote = () => {
    if (!this.state.title) {
      return this.triggerErrorToast("Note title is required!");
    }
    if (!this.state.body) {
      return this.triggerErrorToast("Note content is required!");
    }
    addNote(this.state.title, this.state.body, this.state.color);
    this.props.navigate("/note-app-local");
  };

  toggleColorPalette = () => {
    this.setState({
      showColors: !this.state.showColors,
    });
  };

  changeColor = (color) => {
    this.setState({
      color,
    });
  };

  render() {
    return (
      <>
        <ErrorToast
          error={this.state.error}
          errorMessage={this.state.errorMessage}
        />

        <div className={`add-note ${this.state.color}`}>
          <form className="add-container">
            <TextareaAutosize
              value={this.state.title}
              placeholder="e.g Today's Agenda"
              className="title-input"
              onInput={this.titleInputHandler}
            />

            <ContentEditable
              innerRef={this.contentEditable}
              html={this.state.body}
              onChange={this.bodyInputHandler}
              data-placeholder="e.g 1. Jogging at 8 AM"
              className="body-input"
            />

            <button
              onClick={(event) => {
                event.preventDefault();
                this.submitNote();
              }}
              className="check-button"
            >
              <MdOutlineCheck className="check-icon" />
            </button>

            <button
              type="button"
              onClick={this.toggleColorPalette}
              className="palette-button add"
            >
              <MdOutlinePalette className="palette-icon" />
            </button>

            <div
              className={`color-picker add ${
                this.state.showColors ? "" : "hide"
              }`}
            >
              {this.state.colors.map((colorName, index) => (
                <div
                  key={index}
                  className={`color-option ${colorName} ${
                    colorName === this.state.color ? "selected" : ""
                  }`}
                  onClick={() => this.changeColor(colorName)}
                ></div>
              ))}
            </div>
          </form>
        </div>
      </>
    );
  }
}

AddNote.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default AddNoteWrapper;

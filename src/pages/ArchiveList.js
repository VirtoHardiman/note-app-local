import React, { Component } from "react";
import autoBind from "auto-bind";
import { useNavigate, useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

import { getArchivedNotes, searchNotes } from "../utils/local-data";
import NoteCard from "../components/NoteCard";
import EmptyState from "../components/EmptyState";
import DashboardActions from "../components/DashboardActions";
import SearchBar from "../components/SearchBar";

const ArchiveListWrapper = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const noteTitle = searchParams.get("title");

  const changeSearchParams = (keyword) => {
    setSearchParams({ title: keyword });
  };

  return (
    <ArchiveList
      navigate={navigate}
      noteTitle={noteTitle}
      changeSearchParams={changeSearchParams}
    />
  );
};

class ArchiveList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes:
        (props.noteTitle && searchNotes(props.noteTitle, false)) ||
        getArchivedNotes(),
      transition: false,
      color: "",
      showSearchbar: false,
      keyword: "",
    };

    autoBind(this);
  }

  showSelectedNote = (id, color) => {
    this.setState({
      transition: true,
      color,
    });
    setTimeout(() => {
      this.props.navigate(`/note-app-local/note/${id}`);
    }, 800);
  };

  toggleSearchBar = (condition) => {
    this.setState({
      showSearchbar: condition,
    });
  };

  keywordHandler = (event) => {
    this.setState({
      keyword: event.target.value,
    });
  };

  onSearch = () => {
    this.props.changeSearchParams(this.state.keyword);
    this.setState({
      notes: searchNotes(this.state.keyword, false),
    });
  };

  render() {
    return (
      <>
        <div
          className={`page-overlay ${
            this.state.transition ? this.state.color : ""
          } dark`}
          onClick={() => this.toggleSearchBar(false)}
        >
          <div
            className={`notes-wrapper ${this.state.transition ? "hide" : ""}`}
          >
            {this.state.notes.length !== 0 ? (
              this.state.notes.map((note) => (
                <NoteCard
                  note={note}
                  showSelectedNote={this.showSelectedNote}
                  key={note.id}
                />
              ))
            ) : (
              <EmptyState message="Archive's not found" />
            )}

            <DashboardActions
              showSearchbar={this.state.showSearchbar}
              toggleSearchBar={this.toggleSearchBar}
            />

            <SearchBar
              showSearchbar={this.state.showSearchbar}
              toggleSearchBar={this.toggleSearchBar}
              keyword={this.state.keyword}
              keywordHandler={this.keywordHandler}
              onSearch={this.onSearch}
            />
          </div>
        </div>
      </>
    );
  }
}

ArchiveList.propTypes = {
  navigate: PropTypes.func.isRequired,
  noteTitle: PropTypes.string,
  changeSearchParams: PropTypes.func.isRequired,
};

export default ArchiveListWrapper;

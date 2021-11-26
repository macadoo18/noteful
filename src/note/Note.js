import React from "react";
import { Link } from "react-router-dom";
//import { notStrictEqual } from 'assert'
import "./Note.css";
import NoteContext from "../NoteContext";
import PropTypes from "prop-types";
import Basket from "../images/basket.png";

class Note extends React.Component {
  render() {
    return (
      <NoteContext.Consumer>
        {(context) => (
          <>
            <button
              className="deleteNote"
              onClick={() => context.deleteNote(this.props.id)}
            >
              <img alt="delete" src={Basket} width="24"></img>
            </button>
            <Link to={`/note/${this.props.id}`}>
              <div className="noteList-note">
                <h2>{this.props.name}</h2>
                <p>Date Modified: {this.props.modified}</p>
              </div>
            </Link>
          </>
        )}
      </NoteContext.Consumer>
    );
  }
}

Note.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  modified: PropTypes.string.isRequired,
};

Note.defaultProps = {
  id: 0,
  name: "",
  modified: "",
};

export default Note;

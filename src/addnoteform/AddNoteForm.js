import React from "react";
import NoteContext from "../NoteContext";
import ValidationError from "../ValidationError";

class AddNoteForm extends React.Component {
  static contextType = NoteContext;

  state = {
    noteName: {
      value: "",
      touched: false,
    },
    noteDescription: {
      value: "",
    },
    folderDropdown: {
      value: null,
    },
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: {
        value: e.target.value,
        touched: true,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.folderDropdown.value) {
      let today = new Date();
      const note = {
        folder_id: this.state.folderDropdown.value,
        note_name: this.state.noteName.value,
        content: this.state.noteDescription.value,
        modified: today.toISOString(),
      };
      this.context.addNote(note);
    } else {
      alert("Please select a folder");
    }
  };

  validateNoteName = () => {
    const noteName = this.state.noteName.value.trim();
    if (noteName.length === 0) {
      return "A name is required";
    }
  };

  render() {
    return (
      <NoteContext.Consumer>
        {(context) => (
          <form className="addNoteForm" onSubmit={(e) => this.handleSubmit(e)}>
            <div className="formGroup">
              <label htmlFor="folderDropdown">Select a folder:</label>

              <select
                name="folderDropdown"
                onChange={(e) => this.handleInputChange(e)}
                id="folderDropdown"
              >
                <option value={null}>Select Folder...</option>
                {context.folders.map((folder) => (
                  <option value={folder.id} key={folder.id}>
                    {folder.folder_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="formGroup">
              <label htmlFor="noteName">Name your note: </label>
              <input
                type="text"
                className="noteName"
                name="noteName"
                id="noteName"
                value={this.state.noteName.value}
                onChange={(e) => this.handleInputChange(e)}
                required
              />
              {this.state.noteName.touched && (
                <ValidationError message={this.validateNoteName()} />
              )}
            </div>

            <div className="formGroup">
              <label htmlFor="noteDescription">Description: </label>
              <input
                type="text"
                className="noteDescription"
                name="noteDescription"
                id="noteDescription"
                value={this.state.noteDescription.value}
                onChange={(e) => this.handleInputChange(e)}
                required
              />
            </div>
            <button type="submit" className="submitButton">
              Add Note
            </button>
          </form>
        )}
      </NoteContext.Consumer>
    );
  }
}

export default AddNoteForm;

import React from "react";
import NoteContext from "../NoteContext";
import "./AddFolderForm.css";
//import { Link } from 'react-router-dom'

class AddFolderForm extends React.Component {
  static contextType = NoteContext;

  state = {
    folderName: "",
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const folder = {
      folder_name: this.state.folderName,
    };
    if (folder.folder_name) {
      this.context.addFolder(folder);
    } else {
      alert("folder name is empty");
    }
  };

  render() {
    return (
      <NoteContext.Consumer>
        {(context) => (
          <form
            className="addFolderForm"
            onSubmit={(e) => this.handleSubmit(e)}
          >
            <div className="folderFormBorder1">
              <div className="folderFormBorder2">
                <div className="folderFormBorder3">
                  <h2>Add a Folder</h2>
                  <div className="formGroup">
                    <label htmlFor="folderName">Name your folder:</label>
                    <input
                      type="text"
                      className="folderName"
                      name="folderName"
                      id="folderName"
                      value={this.state.folderName}
                      onChange={(e) => this.handleInputChange(e)}
                      required
                    />
                  </div>
                  {/* Link to '/' when button is clicked */}
                  <button type="submit" className="submitButton">
                    Add Folder
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </NoteContext.Consumer>
    );
  }
}

export default AddFolderForm;

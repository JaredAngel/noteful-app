import React, { Component } from 'react';
import config from '../config';
import ApiContext from '../ApiContext';
import ValidationError from '../ValidationError/ValidationError';
import PropTypes from 'prop-types';
import './AddFolder.css';

class AddFolder extends Component {
  static defaultProp = {
    id: '',
    deleteFolder: []
  }

  state = {
    folder: {
      value: '',
      touched: false
    },
    fetchError: ''
  }

  folderUpdate = (folder) => {
    this.setState({ folder: { value: folder, touched: true } });
  }

  folderValidation = () => {
    const folder = this.state.folder.value.trim();
    if (!folder)
      return 'Name cannot be empty.'
    return;
  }

  placeFolder = (folderName) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "name": folderName })
    }
    return fetch(`${config.API_ENDPOINT}/folders`, options)
      .then(res => {
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json();
      })
      // if there is an issue with the API call an error message is set in the state
      .catch(err => this.setState({ error: err.message }));
  }

  handleSubmit = (event, callback) => {
    event.preventDefault();
    this.setState({ fetchError: '' })
    this.placeFolder(this.state.folder.value)
      .then((resJson) => {
        this.props.deleteFolder(this.props.id);
        callback(resJson);
      })
      .catch(e => this.setState({ fetchError: e.message }));
  }

  render() {
    return (
      <ApiContext.Consumer>
        {(context) => (
          <li className="add-folder">
            <form id='add-folder-form'>
              <p className='form-status'>{this.state.fetchError}</p>
              <p className='form-title'>Add Folder</p>
              <label htmlFor='folder'>Enter a folder name:</label>
              <p className='hint'>* required</p>
              <input
                type='text'
                id='folder'
                name='folder'
                onChange={(e) => this.folderUpdate(e.target.value)}
              />
              {this.state.folder.touched && <ValidationError message={this.folderValidation()} />}
              <button
                type='submit'
                form='add-folder-form'
                onClick={(e) => {
                  this.handleSubmit(e, context.addFolder)
                }}
                disabled={this.folderValidation()}
              > Submit
            </button>
              <button
                type='reset'
                onClick={(e) => this.props.deleteFolder(this.props.id, e)}
              > Cancel
              </button>
            </form>
          </li>
        )}
      </ApiContext.Consumer>
    );
  }
}

AddFolder.propTypes = {
  deleteFolder: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
}

export default AddFolder;
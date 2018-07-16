import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { browserHistory } from 'react-router';
import Button from '@material-ui/core/Button';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => this.setState({ editorState });
  }

  _onBoldClick(e) {
    e.preventDefault()
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  _onItalicClick(e) {
    e.preventDefault()
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }

  _onUnderlineClick(e) {
    e.preventDefault()
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE"));
	}

  _onLeftCenter(e) {
    e.preventDefault()
    this.onChange()
  }

  _toggleBulletPoints(e) {
    e.preventDefault()
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'unordered-list-item'));
  }

  _toggleNumberedList(e) {
    e.preventDefault()
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'ordered-list-item'));
  }

  render() {
    return (

      <div>
      <div style={{ border: '1px solid #ccc' }}>
      <Button variant="contained" color="primary" onMouseDown={(e) => this._onBoldClick(e)}>BOLD</Button>
      <Button variant="contained" color="primary" onMouseDown={(e) => this._onItalicClick(e)}>Italic</Button>
      <Button variant="contained" color="primary" onMouseDown={(e) => this._onUnderlineClick(e)}>Underline</Button>
      <Button variant="contained" color="primary" onMouseDown={(e) => this._toggleBulletPoints(e)}>Bullet List</Button>
      <Button variant="contained" color="primary" onMouseDown={(e) => this._toggleNumberedList(e)}>Numbered List</Button>
      <Editor
        editorState={this.state.editorState}
        onChange={this.onChange}
        spellCheck={true}
      />
    </div>

    <div style={{ border: '1px solid #ccc' }}>
    <Button> Save </Button>
    </div>
    </div>

  );
  }
}

export default App;

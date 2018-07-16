import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { browserHistory } from 'react-router';

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
    return (<div style={{ border: '1px solid #ccc' }}>
      <button onMouseDown={(e) => this._onBoldClick(e)}>BOLD</button>
      <button onMouseDown={(e) => this._onItalicClick(e)}>Italic</button>
      <button onMouseDown={(e) => this._onUnderlineClick(e)}>Underline</button>
      <button onMouseDown={(e) => this._toggleBulletPoints(e)}>Bullet List</button>
      <button onMouseDown={(e) => this._toggleNumberedList(e)}>Numbered List</button>
      <Editor
        editorState={this.state.editorState}
        onChange={this.onChange}
      />
    </div>);
  }
}

export default App;

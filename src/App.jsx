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

  render() {
    return (<div>
      <button onMouseDown={(e) => this._onBoldClick(e)}>BOLD</button>
      <button onMouseDown={(e) => this._onItalicClick(e)}>Italic</button>
      <button onMouseDown={(e) => this._onUnderlineClick(e)}>Underline</button>
      <Editor
        editorState={this.state.editorState}
        onChange={this.onChange}
      />
    </div>);
  }
}

export default App;

import React, {Component} from 'react';
import {EditorState, RichUtils} from 'draft-js';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {browserHistory} from 'react-router';

// Button Library
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormatBold from '@material-ui/icons/FormatBold';
import FormatItalic from '@material-ui/icons/FormatItalic';
import FormatUnderlined from '@material-ui/icons/FormatUnderlined';
import FormatListBulleted from '@material-ui/icons/FormatListBulleted';
import FormatListNumbered from '@material-ui/icons/FormatListNumbered';
import BorderColor from '@material-ui/icons/BorderColor';

import Editor from "draft-js-plugins-editor"
import createHighlightPlugin from './plugins/highlightPlugin'

const highlightPlugin = createHighlightPlugin();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.onChange = (editorState) => this.setState({editorState});

    this.plugins = [highlightPlugin];
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

  _onHighlight(e) {
    e.preventDefault()
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'HIGHLIGHT'))
  }

  render() {
    return (<div style={{
        border: '1px solid #ccc'
      }}>
      <IconButton variant="contained" onMouseDown={(e) => this._onBoldClick(e)}>
        <FormatBold/>
      </IconButton>
      <IconButton variant="contained" onMouseDown={(e) => this._onItalicClick(e)}>
        <FormatItalic/>
      </IconButton>
      <IconButton variant="contained" onMouseDown={(e) => this._onUnderlineClick(e)}>
        <FormatUnderlined/>
      </ IconButton>
      <IconButton variant="contained" onMouseDown={(e) => this._toggleBulletPoints(e)}>
        <FormatListBulleted/>
      </ IconButton>
      <IconButton variant="contained" onMouseDown={(e) => this._toggleNumberedList(e)}>
        <FormatListNumbered/>
      </ IconButton>
      <IconButton className="highlight" variant="contained" color="yellow" onMouseDown={(e) => this._onHighlight(e)}>
        <BorderColor/>
      </ IconButton>

      <Editor editorState={this.state.editorState} onChange={this.onChange} plugins={this.plugins}/>
    </div>);
  }
}

export default App;

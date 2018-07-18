import React, {Component} from 'react';
import {EditorState, convertToRaw, RichUtils} from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {browserHistory} from 'react-router';
import Raw from 'draft-js-raw-content-state';

// Button Library
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormatBold from '@material-ui/icons/FormatBold';
import FormatItalic from '@material-ui/icons/FormatItalic';
import FormatUnderlined from '@material-ui/icons/FormatUnderlined';
import FormatListBulleted from '@material-ui/icons/FormatListBulleted';
import FormatListNumbered from '@material-ui/icons/FormatListNumbered';
import BorderColor from '@material-ui/icons/BorderColor';
import FormatAlignLeft from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenter from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRight from '@material-ui/icons/FormatAlignRight';

import Editor from "draft-js-plugins-editor"
import createHighlightPlugin from '../plugins/highlightPlugin'
import createAlignmentPlugin from 'draft-js-alignment-plugin';
const alignmentPlugin = createAlignmentPlugin();
import createStyles from 'draft-js-custom-styles'
const highlightPlugin = createHighlightPlugin();

const customStyleMap = {
  remoteCursor: {
    borderLeft: 'solid 3px red'
  }
}

const { styles, customStyleFn, exporter } = createStyles(['font-size', 'color', 'text-transform'], 'CUSTOM_', customStyleMap);
const toggleFontSize = styles.fontSize.toggle;

function isBlockStyle(style) {
  if(style.indexOf('text-align-') === 0) return true
  return false
}

function getBlockStyle(block) {
  const type = block.getType()
  return isBlockStyle(type) ? type : null
}

const FORMAT_BAR = [
  {style:'text-align-left', label:'left'},
  {style:'text-align-center', label:'center'},
  {style:'text-align-right', label:'right'},
]

class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.onChange = (editorState) => this.setState({editorState});
    this.plugins = [highlightPlugin];
  }

  toggleColor = (color) => {
    const newEditorState = styles.color.toggle(this.state.editorState, color);
    return this.onChange(newEditorState);
  };

  toggleFontSize = (fontSize) => {
    const newEditorState = styles.fontSize.toggle(this.state.editorState, fontSize);
    return this.onChange(newEditorState);
  };

  onToggleStyle = (style) => (e) => {
    const toggleFn = isBlockStyle(style) ? RichUtils.toggleBlockType : RichUtils.toggleInlineStyle
    this.onChange(toggleFn(this.state.editorState, style))
    e.preventDefault()
  }

  onSetStyle = (name, val) => (e) => {
    this.onChange(styles[name].toggle(this.state.editorState, val))
    e.preventDefault()
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

  toggleBlockType(e, blockType) {
    e.preventDefault()
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType))
  }

  render() {
    const options = x => x.map(fontSize => {
      return <option key={fontSize} value={fontSize}>{fontSize}</option>;
    });

    return (<div style={{
        border: '1px solid #ccc'
      }}>
      <IconButton variant="contained"
        onMouseDown={(e) => this._onBoldClick(e)}
      >
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


      {FORMAT_BAR.map(({style, label}) => <button onClick={this.onToggleStyle(style)}>{label}</button>)}

      <select onChange={e => this.toggleFontSize(e.target.value)}>
        {options(['12px', '24px', '36px', '50px', '72px'])}
      </select>
      <select onChange={e => this.toggleColor(e.target.value)}>
        {options(['green', 'blue', 'red', 'purple', 'orange'])}
      </select>
      <Editor editorState={this.state.editorState} customStyleMap={customStyleMap} customStyleFn={customStyleFn} blockStyleFn={getBlockStyle} onChange={this.onChange} plugins={this.plugins}/>
    </div>);
  }
}

export default TextEditor;

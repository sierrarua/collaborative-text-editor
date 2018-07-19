import React, { Component } from 'react';
import createStyles from 'draft-js-custom-styles'
import {DocumentList} from './index'
import Search from 'react-search-box';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from 'draft-js'

/* Define custom styles */
const customStyleMap = {
  remoteCursor: {
    borderLeft: 'solid 3px red'
  }
}

/* Have draft-js-custom-styles build help functions for toggling font-size, color */
const {
  styles,
  customStyleFn,
} = createStyles(['font-size', 'color'], customStyleMap)

/* Let draft-js know what styles should be block vs inline
 * NOTE: This is needed, but RichUtils.toggleBlockType,
 *       RichUtils.toggleInlineStyle need to get called
 */
function isBlockStyle(style) {
  if(style.indexOf('text-align-') === 0) return true
  return false
}

function getBlockStyle(block) {
  const type = block.getType()
  return isBlockStyle(type) ? type : null
}

/* list of button we need to render */
const FORMAT_BAR = [
  {style:'BOLD', label:'B'},
  {style:'ITALIC', label:'I'},
  {style:'UNDERLINE', label:'U'},
  {style:'text-align-left', label:'left'},
  {style:'text-align-center', label:'center'},
  {style:'text-align-right', label:'right'},
]

export default class Document extends Component {
  state = {
    // We need to create am empty editor state
    // because draftJS state is complex!
    editorState: EditorState.createEmpty(),
    loading: true
  }

  componentDidMount() {
    const {socket, options} = this.props

    // open the document and start listening for changes to the document
    socket.emit('openDocument', {docId: options.docId}, (res) => {
      if(res.err) return alert('Opps Error')
      this.setState({
        doc: res.doc,
        loading: false,
      })

      res.doc.rawState && this.setState({editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(res.doc.rawState)))})

      // start watching the document to sync live edits
      socket.on('syncDocument', this.remoteStateChange)
    })
  }

  componentWillUnmount() {
    const {socket, options} = this.props

    // clean up our listeners
    socket.off('syncDocument', this.remoteStateChange)
    socket.emit('closeDocument', {docId: options.docId}, (res) => {
      if(res.err) return alert('Opps Error')
      this.setState({ docs: res.docs })
    })
  }

  // sync remote document edits to our editor
  remoteStateChange = (res) => {
    this.setState({editorState: EditorState.createWithContent(convertFromRaw(res.rawState))});
  }

  // track what the user is changing
  onChange = (editorState) => {
    /*
          let currentContent = editorState.getCurrentContent()
      const currentSelection = editorState.getSelection()
      const firstBlock = currentContent.getFirstBlock()
      const lastBlock = currentContent.getLastBlock()
      const allSelection = SelectionState.createEmpty(firstBlock.getKey()).merge({
        focusKey: lastBlock.getKey(),
        focusOffset: lastBlock.getLength(),
      })

      currentContent = Modifier.removeInlineStyle(currentContent, allSelection, this.props.app.state.user)
      currentContent = Modifier.applyInlineStyle(currentContent, currentSelection, this.props.app.state.user)
      editorState = EditorState.createWithContent(currentContent)
      editorState = EditorState.forceSelection(editorState, currentSelection)

  mark = () => this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'remoteCursor'))

     */

    this.setState({editorState}, () => {
      this.props.socket.emit('syncDocument', {
        docId: this.state.doc._id,
        rawState: convertToRaw(editorState.getCurrentContent()),
      });
    })
  }

  // helper function to toggle draftJS style changes
  onToggleStyle = (style) => () => {
    const toggleFn = isBlockStyle(style) ? RichUtils.toggleBlockType : RichUtils.toggleInlineStyle
    this.onChange(toggleFn(this.state.editorState, style))
  }

  // helper function to set draftJS complex types that need a value like (color, font-size)
  onSetStyle = (name, val) => () => this.onChange(styles[name].toggle(this.state.editorState, val))

  // close the editor can go back to document list
  onExit = () => this.props.navigate(DocumentList)

  // save the document
  onSave = () => {
    const {socket, options} = this.props

    socket.emit('saveDocument', {
      docId: options.docId,
      rawState: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
    }, (res) => {
      if(res.err) return alert('Opps Error')
    })
  }

  render() {
    // wait until we have loaded the document to show the editor
    if(this.state.loading) return <h1>loading...</h1>;

    return (<div>
      <h2>Editor</h2>

      {FORMAT_BAR.map(({style, label}) => <button onClick={this.onToggleStyle(style)}>{label}</button>)}
      {[8,12,24].map(size => <button onClick={this.onSetStyle('fontSize', size)}>{size}px</button>)}
      {['red','blue'].map(color => <button onClick={this.onSetStyle('color', color)}>{color}</button>)}

      <button onClick={this.onSave}>save</button>
      <button onClick={this.onExit}>exit</button>
      <button>view history</button>
      <div>
        <Search htmlFor="Find in Document"></Search>
        <button>Search</button>
      </div>
      <div className="draft-editor-container">
        <Editor
          editorState={this.state.editorState}
          customStyleMap={customStyleMap}
          customStyleFn={customStyleFn}
          blockStyleFn={getBlockStyle}
          onChange={this.onChange}
        />
      </div>
    </div>);
  }
}

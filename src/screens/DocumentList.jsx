import React, { Component } from 'react'
import {Document} from './index'

export default class DocumentList extends Component {
  constructor(props){
    super(props);
      this.state = {docs:[]}
      this.loadDocuments = () => {
        this.props.socket.emit('getDocuments', {}, (res) => {
          if(res.err) return alert('Opps Error')
          this.setState({ docs: res.docs })
        })
      }

      this.refresh = (res) => {
        if(res.err) return alert('Opps Error')
        this.loadDocuments() //TODO: just update the state not a full reload
      }

      this.onChange = (field) => (e) => this.setState({[field]: e.target.value})
      this.onCreate = () => this.props.socket.emit('createDocument', {name: this.state.docName}, this.refresh)
      this.onJoin = () => this.props.socket.emit('addDocumentCollaborator', {docId: this.state.docId}, this.refresh)
      this.deleteDoc = (docId) => () => this.props.socket.emit('deleteDocument', {docId}, this.refresh)
      this.editDoc = (docId) => () => this.props.navigate(Document, {docId})

  }





  componentDidMount() {
    this.intervalHandle = setInterval(this.loadDocuments, 2000)
    this.loadDocuments()
  }

  componentWillUnmount() {
    clearInterval(this.intervalHandle)
  }


  render() {
    return (<div>
      <h1>List All Documents</h1>
      <label htmlFor="docName">New Doc Name</label><input id="docName" onChange={this.onChange('docName')} value={this.state.docName}/>
      <button onClick={this.onCreate}>Create</button><br/>
      <label htmlFor="docId">Join Doc</label><input id="docId" onChange={this.onChange('docId')} value={this.state.docId}/>
      <button onClick={this.onJoin}>Join</button><br/>

      <ul>
        {this.state.docs.map(doc => (
          <li>
            <p>{doc.name} - {doc._id}</p>
            <button onClick={this.editDoc(doc._id)}>Edit</button>
            <button onClick={this.deleteDoc(doc._id)}>Delete</button>
          </li>
        ))}

      </ul>
    </div>)
  }
}

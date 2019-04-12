/*
富文本编辑器
 */

import React, {Component} from 'react'
import {Editor} from 'react-draft-wysiwyg'
import {EditorState, convertToRaw, ContentState} from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default class RichTextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty()
  }

  onEditorStateChange = (editorState)=>{
    this.setState({
      editorState
    })
  }

  render() {
    const {editorState} = this.state

    return (
      <Editor
        editorState={editorState}
        editorStyle = {{height:200,border:'1px solid black',padding:10}}
        onEditorStateChange={this.onEditorStateChange}
      />
    )
  }
}
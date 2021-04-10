import React, { Component } from 'react';
import TextEditor from '../../EmailList/TextEditor';
export default function AddArticleForm(props) {
  return (
    <form>
      <div>
        Article Title
      </div>
      <input/>
      <TextEditor />
    </form>
  );
  
}
import React, { Component } from 'react';
import TextEditor from '../../EmailList/TextEditor';
export default function AddBlogForm(props) {
  return (
    <form>
      <div>
        Blog Title
      </div>
      <input/>
      <TextEditor />
    </form>
  );
  
}
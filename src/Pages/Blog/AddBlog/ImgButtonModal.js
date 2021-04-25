import React, { useState } from 'react';
import './add-blog.css';
import {Label, FormText, Input} from 'reactstrap';
import ConfirmationModal from
  '../../../Components/DecisionModal/ConfirmationModal';

export default function ImgButtonModal(props) {
  const [toggle, setToggle] = useState(false);
  const confirmationModalProps = {
    headerText: 'Add an Image',
    bodyText:
      <React.Fragment>
        <Label>
          <FormText color='muted'>
            Enter an image address to load image.
          </FormText>
        </Label>
        <Input
          placeholder=""
          value={props.blogImgInput}
          onChange={(e)=>props.updateBlogImgInput(e.target.value)}
        />
        <img
          className="img-preview" 
          src={props.blogImgInput}
        />
      </React.Fragment>,
    confirmText: 'Submit',
    confirmColor: 'primary',
    cancelText: 'Cancel',
    toggle: () => {
      setToggle(!toggle);
    },
    handleConfirmation: () => {
      console.log("Submit Img!");
      props.handleImgUpload();
      setToggle(!toggle);
    },
    open: toggle
  };

  return (
    <div>
      <button onClick = {()=>{setToggle(!toggle)}}>
        <img 
          src={props.blogImg}
          alt='placeholder'
          onError={props.handleImgOnError}
        />
      </button>
      <ConfirmationModal {...confirmationModalProps}/>
    </div>
  );
}

 

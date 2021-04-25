import React, { useState } from 'react';
import './add-blog-navbar.css';
import ConfirmationModal from
  '../../../Components/DecisionModal/ConfirmationModal';

export default function AddBlogNavbar(props) {
  const [toggle, setToggle] = useState(false);
  const confirmationModalProps = {
    headerText: 'Add Blog?',
    bodyText:
      <React.Fragment>
        Feel free to check your inputs once more.
      </React.Fragment>,
    confirmText: 'Submit',
    confirmColor: 'primary',
    cancelText: 'Cancel',
    toggle: () => {
      setToggle(!toggle);
    },
    handleConfirmation: () => {
      console.log("Submit!");
      if(props.blogInputsValid()){
        props.handleSubmit();
        setToggle(!toggle);
      }
      else{
        setToggle(!toggle);
        const alertText = "Check your inputs again!";
        const alertColor = "danger";
        props.renderAlert(alertText, alertColor);
      }
      
    },
    open: toggle
  };

  return (
    <div className = 'add-navbar-container'>
      <div className = 'add-navbar-components'>
        <span>
          Add Blog
        </span>
        <button onClick = {() => {setToggle(!toggle)}}>
          Submit
        </button>
        <button onClick = {props.handleClear}>
          Clear
        </button>
        <ConfirmationModal {...confirmationModalProps}/>
      </div>
    </div>
  );
}

 

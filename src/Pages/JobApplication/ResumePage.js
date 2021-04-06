import React, { Component } from 'react';
import './resumePage.css';
import { Row, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Document, Page, pdfjs } from "react-pdf";
import annabel from './annabel.pdf';
import nanar from './nanar.pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class ResumePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      PDFFile: "",
      openModal: false,
      pdfs: [
          {
            fileName: "Annabel.pdf",
            file: annabel,  
          },
          {
            fileName: "Nanar.pdf",
            file: nanar,
          }
      ]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleChange(event) {
    this.setState({jobDescription: event.target.value});
  }

  handleToggle(name, file){
    this.setState({fileName: name});
    this.setState({PDFFile: file});
    this.setState({openModal: true});
  }

  handleClose(){
    this.setState({openModal: false});
  }

  fileUploadButton = () => {
    document.getElementById('fileButton').click();
    document.getElementById('fileButton').onchange = () => {
      this.setState({
        fileUploadState: document.getElementById('fileButton').files[0].name
      });
    };
  }

  render() {
    return (
      <div>
        <div className = 'header'>Resume Page</div>
        <Modal size='lg' contentClassName='custom-modal' isOpen={this.state.openModal}>
            <ModalHeader className='modal-header'>
                {this.state.fileName}
                <button className='close' onClick={this.handleClose}>Close</button> 
            </ModalHeader>
            <ModalBody>
                <Document
                    className='pdf' 
                    file={this.state.PDFFile}
                    onLoadError={console.error}
                    onLoadSuccess={this.onDocumentLoadSuccess}
                >   
                    <Page pageNumber={1} />
                </Document>
            </ModalBody>
        </Modal>
        <div className= 'input-container'>
            <hr />
          {this.state.pdfs.map((type, ind) => (
              <div>
              <Row key={ind} className='row'>
                  <div 
                    onClick={() => this.handleToggle(type.fileName, type.file)}>
                        {type.fileName}
                  </div>
                  <button className='delete-btn'>Delete Resume</button>
              </Row>
              <hr />
              </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ResumePage;

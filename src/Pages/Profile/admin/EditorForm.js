import React, { useState } from 'react';
import './editor-form.css';
import {
  Button,
  Row,
  Col,
  FormGroup,
  Form,
  Input,
  Modal,
  Label,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import {addTag, deleteTag} from '../../../APIFunctions/User.js';
const enums = require('../../../Enums.js');

export default function EditForm(props) {
  const [resetPages, setResetPages] = useState(false);
  // tag
  const [tag, setTag] = useState();

  function submitClicked() {
    if (resetPages) {
      props.setPagesPrinted(0);
    }
    props.handleSubmissionToggle();
  }

  // tag
  function handleTagChange(e){
    setTag(e.target.value)
  }

  async function handleTagOperation(add){
    let apiResponse = null;
    alert("Before sending "+ props.email + " " + tag)
    if(add)
      apiResponse = await addTag(props.email, tag)
    else 
      apiResponse = await deleteTag(props.email, tag)
    if(apiResponse.error){
      console.log(" Editor Form" ,apiResponse.responseData)
      alert("Error adding/removing tag")
    } 
    else {
      alert("Added tag")
    }
  }

  return (
    <Row>
      <Col>
        <div>
          <Button
            color='primary'
            style={{
              position: 'relative',
              left: '80%'
            }}
            onClick={() => {
              props.handleToggle();
            }}
          >
            Edit
          </Button>
        </div>

        <Modal isOpen={props.toggle} toggle={() => props.handleToggle()}>
          <ModalBody>
            <Form>
              {props.formGroups.map((group, index) => (
                <FormGroup key={index}>
                  <Label>{group.label}</Label>
                  <Input
                    type={group.type || 'email'}
                    name={group.type}
                    placeholder={group.placeholder}
                    onChange={group.handleChange}
                  />
                </FormGroup>
              ))}
              <div>
                <Label>Tags</Label>
                {/* display tags */}
                {
                  props.tags.map(tag => <p>{tag.role}</p>)
                }
                <h3>Add tags</h3>
                <input type = "text" value={tag} onChange={handleTagChange}></input>
                <Button onClick={() => {handleTagOperation(true)}}>Add tag</Button>
                <Button onClick={() => {handleTagOperation(false)}}>Delete tag</Button>
                <Button onClick={() => {addTag("testwhat@gmail.com","Admin")}}>Check</Button>
              </div>
              Change expiration date to
              <select
                onChange={event => {
                  props.setNumberOfSemestersToSignUpFor(event.target.value);
                }}
              >
                {props.membership.map((x, ind) => (
                  <option key={ind} value={x.value}>
                    {x.name}
                  </option>
                ))}
              </select>
              <FormGroup className='reset-pages-group' check inline>
                <Label check id='reset-pages-label'>
                  Reset Pages!
                </Label>
                <Input
                  type='checkbox'
                  id='reset-pages'
                  onClick={event => setResetPages(event.target.checked)}
                />
              </FormGroup>
              <FormGroup tag='fieldset'>
                <legend>Membership Status</legend>
                {Object.values(enums.membershipState).map(
                  (membership, index) => (
                    <FormGroup check key={index}>
                      <Label check>
                        <Input
                          type='radio'
                          name='radio1'
                          value={membership}
                          onChange={() => {
                            props.setuserMembership(membership);
                          }}
                        />
                        {enums.membershipStateToString(membership)}
                      </Label>
                    </FormGroup>
                  )
                )}
              </FormGroup>
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button color='primary' onClick={event => submitClicked()}>
              Submit
            </Button>
            <Button
              color='secondary'
              onClick={() => {
                props.handleToggle();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Col>
    </Row>
  );
}

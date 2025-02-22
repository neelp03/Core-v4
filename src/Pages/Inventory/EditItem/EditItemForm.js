import React from 'react';
import { Form, FormFeedback, FormGroup, FormText, Label, Input } from
  'reactstrap';

export default function EditItemForm(props) {
  return (
    <Form>
      <FormGroup>
        <Label>Item Name
          <p style={{color: 'red', display: 'inline'}}> *</p>
          <FormText color="muted">
            Unique Identifier
          </FormText>
        </Label>
        <Input
          placeholder=""
          value={props.name}
          onChange={(e) => props.updateItemName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Price
          <p style={{color: 'red', display: 'inline'}}> *</p>
          <FormText color="muted">
            Cost Per Unit
          </FormText>
        </Label>
        <Input
          invalid={isNaN(props.price) || props.price < 0}
          placeholder=""
          value={props.price}
          onChange={(e) => props.updateItemPrice(e.target.value)}
        />
        <FormFeedback invalid="true">
          Please enter a non-negative number!
        </FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label>Stock
          <p style={{color: 'red', display: 'inline'}}> *</p>
          <FormText color="muted">
            Number of Items Available
          </FormText>
        </Label>
        <Input
          invalid={isNaN(props.stock) || props.stock < 0}
          placeholder=""
          value={props.stock}
          onChange={(e) => props.updateItemStock(e.target.value)}
        />
        <FormFeedback invalid="true">
          Please enter a non-negative number!
        </FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label>Category
          <p style={{color: 'red', display: 'inline'}}> *</p>
          <FormText color="muted">
            Item Type
          </FormText>
        </Label>
        <Input
          type="select"
          value={props.category}
          onChange={(e) => props.updateItemCategory(e.target.value)}
        >
          <option value="">Choose...</option>
          <option value="Electronics">Electronics</option>
          <option value="Snacks">Snacks</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label>
          Description
          <FormText>
            Item Explanation
          </FormText>
        </Label>
        <Input
          type="textarea"
          invalid={props.description.length > 100}
          value={props.description}
          onChange={(e) => props.updateItemDescription(e.target.value)}
          style={{minHeight:'calc(1.5em + .75rem + 2px)'}}
        />
        <FormText style={{ textAlign: 'right' }}
        >
          <div style={{color: props.description.length > 100 ?
            '#dc3545' : '#6c757d'}}
          >
            {props.description.length + '/100'}
          </div>
        </FormText>
        <FormFeedback invalid="true"/>
      </FormGroup>
      <FormGroup>
        <Label>Picture
          <FormText color="muted">
            Enter valid picture URL or leave blank for default
          </FormText>
        </Label>
        <Input
          placeholder=""
          value={props.picture}
          onChange={(e) => props.updateItemPicture(e.target.value)}
        />
      </FormGroup>
    </Form>
  );
}

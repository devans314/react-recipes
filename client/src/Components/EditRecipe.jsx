import React, {Component} from 'react'

import { Modal, Form, Button, Label, Header } from 'semantic-ui-react';

// Pure function that takes in props and returns forms to edit recipe ingredients and instructions
class EditRecipe extends Component {
  constructor(){
      super();
          this.state = {
            
              title: '',
              ingredients: '',
              instructions: '',
              _id: ''
      
          }
      }
      // handleEditChange - takes in e, sets state
    handleEditChange = async (e) => {
      // console.log("heyyyyy")
      this.setState({
          
              ...this.state,
              [e.currentTarget.name]: e.currentTarget.value,
              _id: this.props.recipe._id
          
          // ...this.state.recipeToEdit,
          
          // recipe: "nice",
          // recipeToEdit
      })
      console.log(this.state.recipeToEdit);
      console.log("heyyyyy")
  }

    render(){
      console.log()
        return (
          <Modal open={this.props.open}>
          <Header>Edit Recipe</Header>
          <Modal.Content>
            <Form onSubmit={this.props.closeAndEdit.bind(null, this.state)}>
              <Label>
                Edit Recipe Title:
              </Label>
              <Form.Input type='text' name='title' placeholder={this.state.title} onChange={this.handleEditChange}/>
              <Label>
                Edit Ingredients:
              </Label>
              <Form.Input type='text' name='ingredients' placeholder={this.state.ingredients} onChange={this.handleEditChange}/>
              <Label>
                Edit Instructions:
              </Label>
              <Form.Input type='text' name='instructions' placeholder={this.state.instructions} onChange={this.handleEditChange}/>
              <Modal.Actions>
                <Button color='blue' type='submit' >Edit Recipe</Button>
              </Modal.Actions>
            </Form>
          </Modal.Content>
        </Modal>
          )
      }
    }
    

 export default EditRecipe;
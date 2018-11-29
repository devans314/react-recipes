import React, { Component } from 'react';
import { Form, Button, Label, Segment } from 'semantic-ui-react';

// Component that sets state as an empty recipe, then resets it to the created recipe using
// // an updateRecipe function that takes in e, renders a form for creating recipe title, 
// // instructions, and ingredients

class CreateRecipe extends Component {
    constructor(){
        super();
            this.state = {
                title: '',
                ingredients: '',
                instructions: ''
            }
        }
    updateRecipe = (e) =>{
        this.setState({[e.currentTarget.name]: e.currentTarget.value});
        }
    render(){
        return(
            <Segment>
                <h4>Create A New Recipe</h4>
                <Form onSubmit={this.props.addRecipe.bind(null, this.state)} className = 'sudoku'>
                <Label htmlFor="name=title">Recipe:</Label>
                <Form.Input type='text' name='title' value={this.state.title} onChange={this.updateRecipe}/>
                <Label>Ingredients:</Label>
                <Form.Input type='text' name='ingredients' value={this.state.ingredients} onChange={this.updateRecipe}/>
                <Label>Instructions:</Label>
                <Form.Input type='text' name='instructions' value={this.state.instructions} onChange={this.updateRecipe}/>
                <Button color="blue" type='Submit'>Create Recipe</Button>
                </Form>
            </Segment>
      )
  }
}

export default CreateRecipe;
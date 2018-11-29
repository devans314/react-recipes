import React from 'react';
import { Card, Form, Button, Label, Segment } from 'semantic-ui-react';
// Pure function that takes in props and maps over the recipes array and returns a list of 
// // recipes, includes edit and delete buttons



const UserRecipeList = (props) =>{
    console.log(props);
    const recipes = props.recipes.map((recipe, i) =>{
        return (
            <Card key={recipe._id}>
        <Card.Content>
          <Card.Header>{recipe.title}</Card.Header>
          <Card.Description>{recipe.ingredients}</Card.Description>
          <Card.Description>{recipe.instructions}</Card.Description>
          </Card.Content>
        <Card.Content extra>
          <Button color="blue" onClick={props.openAndEdit.bind(null, recipe)}>Edit Recipe</Button>
          <Button color="red" onClick={props.deleteRecipe.bind(null, recipe._id)}>Delete Recipe</Button>
        </Card.Content>
      </Card>
        )
    })
    
        return (
            <div>
              <h3>Recipes</h3>
              <Card.Group className="centered">
                {recipes}
              </Card.Group>
            </div>
            )
        }

export default UserRecipeList;
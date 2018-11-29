import React, { Component } from 'react';
import CreateRecipe from '../Components/CreateRecipe';
import EditRecipe from '../Components/EditRecipe';
import UserRecipeList from '../Components/UserRecipeList';
import ResultsContainer from './ResultsContainer';
import { Grid } from 'semantic-ui-react';
// https://api.edamam.com/search?q=${term.replace(/\s/g, '+')}app_id=${5e4b0c5c}&app_key=${459a130d904b5a0e60b7682878b95ffa}


class RecipeContainer extends Component {
    constructor(){
        super();

        this.state = {
            recipes: [],
            recipeToEdit: {
                title: '',
                ingredients: '',
                instructions: '',
                _id: '',
            },
            showEditModal: false
        }
    }
// getRecipes function - makes a GET request to the server to get the recipes
    getRecipes = async () => {
        const recipes = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/recipe`);
        const recipesParsedJSON = await recipes.json();

        // console.log(recipesParsedJSON);

        return recipesParsedJSON;
    }
// componentDidMount - calls the getRecipes function
    componentDidMount = () => {
        this.getRecipes().then((recipes) =>{
            this.setState({recipes: recipes.data});
        }).catch((err) => {
            console.log(err)
        })
    }
// // addRecipe function - makes a POST request to the server to add the created recipe; takes in 
// // recipe & e, prevents default, // headers: {'Content-Type': 'application/json'}, parses response,
// // sets state
    addRecipe = async (recipe, e) => {
        e.preventDefault();
        console.log(recipe);
        try {
            const createdRecipe = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/recipe`,
            {method: 'POST',
            body: JSON.stringify(recipe),
            headers: {'Content-Type': 'application/json'}
        })
            const parsedResponse = await createdRecipe.json();
            console.log(parsedResponse);
            this.setState({recipes: [...this.state.recipes, parsedResponse.data]});
    }catch(err){
        console.log(err);
    }
}
// deleteRecipe function - makes a DELETE request to the server to delete a recipe; takes in
// // id, parses response, sets state
    deleteRecipe = async (id) => {

        const deletedRecipe = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/recipe/${id}`,


        {method: 'DELETE'});
        const deletedRecipeParsed = await deletedRecipe.json();
        this.setState({recipes: this.state.recipes.filter((recipe) => recipe._id !== id)});
        console.log(deletedRecipeParsed, ' this recipe was deleted');
    }


    // closeAndEdit - makes a PUT request to the server to update the edited recipe; takes in e, 
    // // fetches recipe by _id, // headers: {'Content-Type': 'application/json'},
    closeAndEdit = async (recipeToEdit) => {
        // e.preventDefault();
        console.log(this.state.recipeToEdit._id)
        console.log(recipeToEdit)
        try {
            const editResponse = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/recipe/${recipeToEdit._id}`,{
                method: 'PUT',
                body: JSON.stringify(recipeToEdit),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const editResponseParsed = await editResponse.json()
            const updatedRecipesArray = this.state.recipes.map((recipe)=>{
                if (recipe._id === editResponseParsed.data._id){
                    recipe = editResponseParsed.data;
                }
                return recipe;
            });
            this.setState({
                showEditModal: false,
                recipes: updatedRecipesArray
            });
            console.log(editResponseParsed, ' parsed response');
   
    }   catch(err){
        console.log(err);
        }
    } 
    // opens Modal for editting movies

    openAndEdit = (recipeFromTheList) => {
        
        this.setState({
          showEditModal: true,
          recipeToEdit: {
            ...recipeFromTheList
          }
          
        })
        console.log(recipeFromTheList, ' recipeToEdit  ');
      }
    render(){
        // console.log(this.state);
        return(
            <Grid columns={2} divided textAlign='center' style={{ height: '100%' }} verticalAlign='top' stackable>
                    <Grid.Row>
                        <Grid.Column>
                        <h1>Cook Book</h1>
                            <CreateRecipe addRecipe={this.addRecipe}/>
                        </Grid.Column>
                        <Grid.Column>
                            <UserRecipeList openAndEdit={this.openAndEdit} deleteRecipe={this.deleteRecipe} recipes={this.state.recipes}/>
                        </Grid.Column>
                        <EditRecipe  recipe={this.state.recipeToEdit} open={this.state.showEditModal} handleEditChange={this.handleEditChange} closeAndEdit={this.closeAndEdit}/>
                    </Grid.Row>
            </Grid>
        )
    }
}

export default RecipeContainer;
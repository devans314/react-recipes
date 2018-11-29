import React from 'react';
import SearchRecipeItem from './SearchRecipeItem'


const SearchRecipeList = (props) => {
    console.log(props);
    const recipeItems = props.recipes.map((label) =>{
        return <SearchRecipeItem key={label.id} recipe={label} />
    });
    return (
        <div>
            <h3>Search Results:</h3>
                <ul class='grid'>{recipeItems}</ul>
        </div>
    )
}

export default SearchRecipeList;
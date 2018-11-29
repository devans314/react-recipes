import React from 'react';
import '../App.css';

const SearchRecipeItem = (props) => {
console.log(props);
    return(
        <li>
            <img src={props.recipe.recipe.image} />
            <br />
            <p><a href={props.recipe.recipe.url}>{props.recipe.recipe.label}</a></p>
            <p>{props.recipe.recipe.healthLabels}</p>
            <br />
        </li>
    )
}

export default SearchRecipeItem;
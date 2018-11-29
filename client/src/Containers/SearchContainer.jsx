import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react'


class SearchContainer extends Component {
    constructor(){
        super();
        this.state = { searchTerm: ''}
    }
    handleChange = (e) => {
        this.setState({searchTerm: e.target.value});
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.handleSubmit(this.state.searchTerm);
        
        console.log(this.state);
        console.log(this.props);
    }
    render(){
        return(
            <div className="search-container">
               <div className="search-bar">
                    <form onSubmit={this.onSubmit}>   
                        {/* <input type="text" name="text" placeholder="Search Edamam recipe database..." onChange={this.handleChange} ></input>
                         <button type="submit">Submit</button> */}o
                            <Button animated>
                            <input type="text" name="text" placeholder="Search Edamam recipe database..." onChange={this.handleChange} ></input>
                                <Button.Content visible>Next</Button.Content>
                                <Button.Content hidden>
                                <Icon name='arrow right'/>
                                </Button.Content>
                            </Button>
                        
                    </form>
                </div>
             </div>
        )
    }
}


export default SearchContainer;
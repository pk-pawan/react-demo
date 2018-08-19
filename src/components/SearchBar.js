import React, { Component } from 'react';

class SearchBar extends Component {
    constructor() {
        super();
        this.state = {
            searchTerm: ''
        }
    }
    
    render() {
        return (
            <div className="floatRight">
                <input type="text" value={this.state.searchTerm} name="searchTerm"
                 onChange={(e) => this.searchContent(e)} placeholder="Search..." />
            </div>
        )
    }
    searchContent(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value },
            this.props.handleSearch(value)
        )
    }
}

export default SearchBar;
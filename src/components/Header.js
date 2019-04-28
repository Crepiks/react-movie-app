import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

class Header extends Component {

    state = {
        searchQuery: ''
    }

    _onUserInput = (e) => {
        this.setState({
            ...this.state,
            searchQuery: e.target.value
        });
    }

    _onUserSubmit = (e) => {
        e.preventDefault();
        this.props._onSearchQueryChange(e.target.search.value);
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            searchQuery: this.props.searchQuery
        });
    }

    render() {
        return(
            <header className="header">
                <h1 className="header__logo">Movie App</h1>
                {this.props.rootPage ? <form onSubmit={this._onUserSubmit}>
                    <input type="text" name="search" value={this.state.searchQuery} onChange={this._onUserInput} autoComplete="off" />
                </form> : null}
                {this.props.rootPage ? null : <Link to="/" className="header__link">Home</Link>}
            </header>
        );
    }
}

export default Header;
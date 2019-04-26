import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

class Header extends Component {

    render() {
        return(
            <header className="header">
                <h1 className="header__logo">Movie App</h1>
                {this.props.rootPage ? <form>
                    <input type="text" />
                </form> : null}
                {this.props.rootPage ? null : <Link to="/">Home</Link>}
            </header>
        );
    }
}

export default Header;
import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import './Pagination.css';

class Pagination extends Component {

    getPreviousPagePath = () => {
        return '/' + (this.props.currentPage - 1);
    }

    getNextPagePath = () => {
        return '/' + (this.props.currentPage + 1);
    }

    isItLastPage = () => {
        if (this.props.currentPage === this.props.lastPage) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        return(
            <div className="pagination">
                { this.props.currentPage !== 1 ? <Link to={this.getPreviousPagePath()} className="fas fa-arrow-left pagination__icon"></Link> : null }
                { this.isItLastPage() ? null : <Link to={this.getNextPagePath()} className="fas fa-arrow-right pagination__icon"></Link> }
            </div>
        );
    }
}

export default Pagination;
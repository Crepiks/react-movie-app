import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import './Pagination.css';
import { isUndefined } from 'util';

class Pagination extends Component {

    getPreviousPagePath = () => {
        let result = '/' + (+this.props.currentPage - 1);
        if (!isUndefined(this.props.query)) {
            result = result + '/' + this.props.query;
        }
        return result;
    }

    getNextPagePath = () => {
        let result;
        if (!isUndefined(this.props.currentPage)) {
            result = '/' + (+this.props.currentPage + 1);
        } else {
            result = '/2';
        }

        if (!isUndefined(this.props.query)) {
            result = result + '/' + this.props.query;
        } 

        return result;
    }

    render() {
        return(
            <div className="pagination">
                { !isUndefined(this.props.currentPage) && +this.props.currentPage !== 1 ? <Link to={this.getPreviousPagePath()} className="fas fa-arrow-left pagination__icon"></Link> : null}
                <Link to={this.getNextPagePath()} className="fas fa-arrow-right pagination__icon"></Link>
            </div>
        );
    }
}

export default Pagination;
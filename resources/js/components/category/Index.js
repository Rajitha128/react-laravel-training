import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';
import Add from './Add';
import Edit from './Edit';
import Listing from './Listing';

export default class Index extends Component {
    render() {
        return (
            <div>
                <hr/>
                    <Link to="/category" className="btn btn-primary">Listing</Link> &nbsp;
                    <Link to="/category/Add" className="btn btn-info">Add</Link>

                    <Route exact path="/category" component={Listing}/>
                    <Route exact path="/category/add" component={Add} />
                    <Route exact path="/category/edit/:id" component={Edit} />
                <hr/>
            </div>
        );
    }
}

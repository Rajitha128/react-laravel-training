import React, { Component } from 'react';
import Axios from 'axios';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';
import {addCategory} from "../../actions/CategoryActions";
// import {Link, Route} from 'react-router-dom';

export default class Add extends Component {

    constructor()
    {
        super();
        this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
            category_name:'',
            alert_message:''
        }
    }

    onChangeCategoryName(e)
    {
        this.setState({
            category_name:e.target.value
        });
    }

    onSubmit(e)
    {
        e.preventDefault();
        const category ={
            category_name: this.state.category_name
        }

        var call = addCategory(category);
        console.log(call);
        // axios.post('http://127.0.0.1:8001/api/category/store',category)
        call.then(
            
            res=>{
                this.setState({alert_message:"success"})
            }
        ).catch(error=>{
            this.setState({alert_message:"error"});
        })
    }

    render() {
        return (
            <div>
                <hr />
                {this.state.alert_message=="success"?<SuccessAlert message={"Category has been added!"}/>:null}
                {this.state.alert_message=="error"?<ErrorAlert message={"Something went wrong. Please try again."}/>:null}

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="category_name">Category Name</label>
                        <input type="text" className="form-control" 
                                id="category_name" 
                                value={this.state.category_name} 
                                onChange={this.onChangeCategoryName}
                                placeholder="Category Name" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>&nbsp;
                </form>
                {/* <Link to="/category" className="btn btn-primary">Listing</Link>  */}
                {/* <Route exact path="/category" component={Listing}/> */}
            </div>
        );
    }
}

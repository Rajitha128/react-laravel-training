import React, { Component } from 'react';
import Axios from 'axios';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';
import {updateCategory, editCategory} from "../../actions/CategoryActions";

export default class Edit extends Component {

    constructor(props)
    {
        super(props);
        this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
            category_name:'',
            alert_message:''
        }
    }

    componentDidMount()
    {
        var x = editCategory(this.props.match.params.id);
        // axios.get('http://127.0.0.1:8001/api/category/edit/'+this.props.match.params.id)
        x.then(response=>{
            this.setState({category_name:response.data.name});
        });
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

        var result = updateCategory(this.props.match.params.id,category);

        // axios.put('http://127.0.0.1:8001/api/category/update/'+this.props.match.params.id,category)
        result.then(
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
                {this.state.alert_message=="success"?<SuccessAlert message={"Category has been updated!"}/>:null}
                {this.state.alert_message=="error"?<ErrorAlert message={"Something went wrong. Please try again."}/>:null}

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label for="category_name">Category Name</label>
                        <input type="text" className="form-control" 
                                id="category_name" 
                                value={this.state.category_name} 
                                onChange={this.onChangeCategoryName}
                                placeholder="Category Name" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

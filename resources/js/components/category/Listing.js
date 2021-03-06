import React, { Component } from 'react';
import axios from 'axios';
import Pagination from "react-js-pagination";
import {Link} from 'react-router-dom';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';
import {listCategory, listCategoryPaginated, deleteCategory} from "../../actions/CategoryActions";

export default class Listing extends Component {

    constructor()
    {
        super();
        this.state={
            categories:[],
            activePage:1,
            itemsCountPerPage:1,
            totalItemsCount:1,
            pageRangeDisplayed:4,
            alert_message:''
        }
        this.handlePageChange=this.handlePageChange.bind(this);
    }

    componentDidMount()
    {
        var data = listCategory();
        // axios.get('http://127.0.0.1:8001/api/category')
        data.then(response=>{
            this.setState({
                categories:response.data.data,
                itemsCountPerPage:response.data.per_page,
                totalItemsCount:response.data.total,
                activePage:response.data.current_page
            });
        });
    }

    onDelete(category_id)
    {
        var result = deleteCategory(category_id);

        result.then(response=>{

            var categories = this.state.categories;
            for(var i=0; i< categories.length; i++)
            {
                if(categories[i].id == category_id)
                {
                    categories.splice(i,1);
                    this.setState({categories:categories});
                }
            }
            this.setState({alert_message:"success"})

        }).catch(error=>{
            this.setState({alert_message:"error"});
        })
    }

    handlePageChange(pageNumber) {
        // console.log(`active page is ${pageNumber}`);
        var data = listCategoryPaginated(pageNumber);
        // axios.get('http://127.0.0.1:8001/api/category?page='+pageNumber)
        data.then(response=>{
            this.setState({
                categories:response.data.data,
                itemsCountPerPage:response.data.per_page,
                totalItemsCount:response.data.total,
                activePage:response.data.current_page
            });
        });
    }

    render() {
        return (
            <div>
                <hr />
                {this.state.alert_message=="success"?<SuccessAlert message={"Category has been deleted!"}/>:null}
                {this.state.alert_message=="error"?<ErrorAlert message={"Something went wrong. Please try again."}/>:null}

                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Category Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Updated At</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.categories.map(category=>{
                            return(
                                <tr>
                                    <th scope="row">#</th>
                                    <td>{category.name}</td>
                                    <td>{category.active==1?("Active"):("Inactive")}</td>
                                    <td>{category.created_at}</td>
                                    <td>{category.updated_at}</td>
                                    <td>
                                        <Link to={`/category/edit/${category.id}`}> Edit </Link> |
                                        <a href="#" onClick={this.onDelete.bind(this,category.id)}> Delete </a>
                                    </td>
                                </tr>
                            )
                        })
                    }    
                </tbody>
                </table>

                <div className="d-flex justify-content-center">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalItemsCount}
                        pageRangeDisplayed={this.state.pageRangeDisplayed}
                        onChange={this.handlePageChange}
                        itemClass='page-item'
                        linkClass='page-link'
                    />
                </div>
    
            </div>
        );
    }
}

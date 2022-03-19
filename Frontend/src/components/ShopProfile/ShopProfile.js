import React, {Component} from 'react';
import '../../App.css';
import { Link } from "react-router-dom";

class ShopProfile extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const sample = "/ItemsPage/hello"
        return(
            <div>
            <div class="container">
                
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Shop Detaile</h2>
                            <p>Please enter your shop details</p>
                        </div>
                            <div class="form-group">
                                <text>Shop Name</text>
                                <input type="text" class="form-control" name="name" placeholder="shop name"/>
                            </div>
                            <div class="form-group">
                                <text>Shop Owner Details</text>
                                <input type="text" class="form-control" name="city" placeholder="shop Owner"/>
                            </div>
                            <div class="form-group">
                                <text>Item List</text>
                                <input type="text" class="form-control" name="city" placeholder="shop Owner"/>
                            </div>
                            <Link to={sample}>Items Page</Link>
                                          
                    </div>
                </div>
            </div>
            </div>
        )
    }

}

export default ShopProfile
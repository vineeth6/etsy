import React, {Component} from 'react';
import '../../App.css';
import {CountryDropdown} from 'react-country-region-selector'
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


class Profile extends Component{

    constructor(props){
        super(props);
        this.state ={
            country:""
        }
        this.selectCountry = this.selectCountry.bind(this)

    }

    selectCountry = (event) => {
        console.log(event)
        this.setState({ country: event});
      }

    render(){

        const {country} = this.state
        return(
            <div>
            <div class="container">
                
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Your Public Profile</h2>
                        </div>
                            <div class="form-group">
                                <text>Name</text>
                                <input type="text" class="form-control" name="name" placeholder="name"/>
                            </div>
                            <div class="form-group">
                                <text>City</text>
                                <input type="text" class="form-control" name="city" placeholder="city"/>
                            </div>
                            <div class="form-group">
                                <text>Gender </text>
                                <input type="radio" value="Male" name="gender" /> Male
                                <input type="radio" value="Female" name="gender" /> Female
                                <input type="radio" value="Other" name="gender" /> Other
                            </div>
                            <div class="form-group">
                                <text>Address</text>
                                <input onChange = {this.usernameChangeHandler} type="text" class="form-control" name="address" placeholder="address"/>
                            </div>
                            <div class="form-group">
                                <text>Country</text>
                                <CountryDropdown value={country} onChange={this.selectCountry} />
                            </div>
                            <div class="form-group">
                                <text>email</text>
                                <input onChange = {this.passwordChangeHandler} type="text" class="form-control" name="email" placeholder="email"/>
                            </div>
                            <button onClick = {this.submitLogin} class="btn btn-primary">Login</button>
                                          
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Profile;
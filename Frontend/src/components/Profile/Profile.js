import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


class Profile extends Component{

    render(){
        return(
            <div>
            <div class="container">
                
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Admin Login</h2>
                            <p>Please enter your username and password</p>
                        </div>
                            <div class="form-group">
                                <text>Name</text>
                                <input type="text" class="form-control" name="name" placeholder="name"/>
                            </div>
                            <div class="form-group">
                                <text>City</text>
                                <input type="text" class="form-control" name="city" placeholder="city"/>
                            </div>
                            <div>
                                <text>Gender </text>
                                <input type="radio" value="Male" name="gender" /> Male
                                <input type="radio" value="Female" name="gender" /> Female
                                <input type="radio" value="Other" name="gender" /> Other
                            </div>
                            <div class="form-group">
                                <text>City</text>
                                <input onChange = {this.usernameChangeHandler} type="text" class="form-control" name="username" placeholder="Username"/>
                            </div>
                            <div class="form-group">
                                <text></text>
                                <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>

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
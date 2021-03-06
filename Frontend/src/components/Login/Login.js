import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {login} from '../../redux/actions/'


//Define a Login Component
class Login extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username : "",
            password : "",
            authFlag : true,
            error:""
        }
        //Bind the handlers to this class
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username : this.state.username,
            password : this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        // axios.post(process.env.REACT_APP_BASE_URL+'/insertIntoLogin',data)
        // axios.post(process.env.REACT_APP_BASE_URL+'/mongologin',data)
        //     .then(response => {
        //         console.log(response)
        //         console.log("Status Code : ",response.status);
        //         if(response.data.message === "Successful"){
        //             this.setState({
        //                 authFlag : true,
        //                 error:""
        //             })
        //             const username = this.state.username
        //             const auth = this.state.auth
        //             console.log(username)
        //             localStorage.setItem('token', response.data.token)
        //             localStorage.setItem("email",username)
        //             this.props.login({username,auth})
        //             cookie.load('cookie')
        //         }else{
        //             this.setState({
        //                 authFlag : false,
        //                 error:"Invalid Username and Password"
        //             })
        //             cookie.load('cookie')
        //         }
        //     });

            axios.post(process.env.REACT_APP_BASE_URL+'/insertIntoLogin',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                console.log(response)
                if(response.data.message === "Successful"){
                    this.setState({
                        authFlag : true,
                        error:""
                    })
                    const {username} = this.state
                    console.log(username)
                    localStorage.setItem("email",username)
                    console.log(cookie.load('cookie'))
                }else{
                    this.setState({
                        authFlag : false,
                        error:"Invalid Username and Password"
                    })
                    console.log(cookie.load('cookie'))
                }
            });
    }

    render(){
        //redirect based on successful login
        let redirectVar = null;
        const {error} = this.state
        if(cookie.load('cookie')){
            redirectVar = <Redirect to= "/home"/>
        }
        console.log(error)
        return(
            <div>
                {redirectVar}
            <div class="container">
                
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Admin Login</h2>
                            <p>Please enter your username and password</p>
                            <div style={{ color: "red" }}>{error}</div>
                        </div>
                        
                            <div class="form-group">
                                <input onChange = {this.usernameChangeHandler} type="text" class="form-control" name="username" placeholder="Username"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                            </div>
                            <button onClick = {this.submitLogin} class="btn btn-primary">Login</button>
                            <Link to="/Register">Register</Link>              
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
//export Login Component


function mapDispatchToProps(dispatch){
    console.log(dispatch)
    return{
        login: Login => dispatch(login(Login))
    }
    
}

export default connect(null, mapDispatchToProps)(Login);
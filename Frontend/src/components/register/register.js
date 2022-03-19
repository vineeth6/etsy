import React, {Component} from 'react';
import axios from 'axios';

class register extends Component{

    constructor(props){
        super(props)

        this.state = {
            name:"",
            emailid:"",
            password:"",
            error:""
        }

        this.handleNameChange = this.nameChangeHandler.bind(this)
        this.handleEmailChange = this.emailChangeHandler.bind(this)
        this.handlePasswordChange = this.passwordChangeHandler.bind(this)
        this.handleRegisteration = this.handleRegisteration.bind(this)
    }

    nameChangeHandler = (e) => {
        this.setState({
            name:e.target.value
        })
    }

    emailChangeHandler = (e) => {
        this.setState({
            email:e.target.value
        })
    }

    passwordChangeHandler = (e) => {
        this.setState({
            password:e.target.value
        })
    }

    handleRegisteration = (e) => {
        e.preventDefault()
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }



        axios.post('http://localhost:3001/insertIntoRegister',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.data === "Successful Register"){
                this.setState({
                    error:"Registration Successful"
                })
                localStorage.setItem("UserProfile","false")
                localStorage.setItem("ShopProfile", "false")
            }
            else if(response.data === 'existing user'){
                this.setState({
                    error:"email id is already existing"
                })
            }
            else{
                this.setState({
                    error:"Registration Unsuccessful"
                })
            }
        });
    }

    render(){
        const{error} = this.state
        return(
            <div>
            <div class="container">
                
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Register</h2>
                            <div style={{ color: "red" }}>{error}</div>
                        </div>
                        
                            <div class="form-group">
                                <input onChange = {this.nameChangeHandler} type="text" class="form-control" name="username" placeholder="Username"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.emailChangeHandler} type="text" class="form-control" name="email" placeholder="email"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                            </div>
                            <button onClick = {this.handleRegisteration} class="btn btn-primary">Register</button>              
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default register
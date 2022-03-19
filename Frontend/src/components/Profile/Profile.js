import React, {Component} from 'react';
import '../../App.css';
import {CountryDropdown} from 'react-country-region-selector'
import axios from 'axios';
import cookie from 'react-cookies';
import {Link} from 'react-router-dom';


class Profile extends Component{

    constructor(props){
        super(props)
        this.state ={
            username:"enter your name",
            gender:"",
            birthdate:"",
            address:"address",
            city:"city",
            country:"",
            email:localStorage.getItem('email'),
            phone:"phone"

        }
        
        this.changeUsername =  this.changeUsername.bind(this)
        this.setGender =  this.setGender.bind(this)
        this.changeBirthdate = this.changeBirthdate.bind(this)
        this.changeAddress = this.changeAddress.bind(this)
        this.changeCity = this.changeCity.bind(this)
        this.changeCountry = this.changeCountry.bind(this)
        this.changePhone = this.changePhone.bind(this)
        this.saveDetails = this.saveDetails.bind(this)
    }

    componentDidMount(){
        axios.get('/getProfileDetails', {
            params:{
                email:this.state.email
            }
        })
        .then((response) => {
            console.log(response.data)
            this.setState({
                username:response.data.username,
                gender : response.data.gender,
                birthdate: response.data.birthdate,
                address: response.data.address,
                city:response.data.city,
                country:response.data.country,
                phone:response.data.phonenumber
            })
        })
    }

    changeUsername = (e) => {
        console.log(e.target.value)
        this.setState({username:e.target.value})
    }

    setGender = (e) =>{
        console.log(e.target.value)
        if(e.target.value === "Male")
            this.setState({gender:"Male"})
        else if(e.target.value === "Female")
            this.setState({gender:"Female"})
        else if(e.target.value === "Other")
        this.setState({gender:"Other"})
    }

    changeBirthdate = (e) =>{
        this.setState({birthdate:e.target.value})
    }

    changeAddress = (e) => {
        this.setState({address:e.target.value})
    }

    changeCity = (e) => {
        this.setState({city:e.target.value})
    }

    changeCountry = (e) => {
        this.setState({country:e})
    }

    changePhone = (e)=>{
        console.log(e.target.value)
        this.setState({phone:e.target.value})
    }

    saveDetails = (e)=>{
        e.preventDefault()

        const data = {
            email:localStorage.getItem('email'),
            username:this.state.username,
            gender:this.state.gender,
            birthdate:this.state.birthdate,
            address:this.state.address,
            city:this.state.city,
            country:this.state.country,
            phone:this.state.phone
        }
        console.log(data)
        axios.post('/insertIntoProfile', data)
        .then(response => {
            console.log(response)
        })
    }

    render(){

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
                                <input onChange={this.changeUsername} type="text" class="form-control" name="name" placeholder={this.state.username}/>
                            </div>
                            <div class="form-group" onChange={this.setGender}>
                                <text>Gender </text>
                                <input type="radio" value="Male" name="gender" checked={this.state.gender === "Male"}/> Male
                                <input type="radio" value="Female" name="gender" checked={this.state.gender === "Female"}/> Female
                                <input type="radio" value="Other" name="gender" checked={this.state.gender === "Other"}/> Other
                            </div>
                            <div class="form-group">
                                <text>Birthday</text>
                                <input onChange={this.changeBirthdate} type="date" class="form-control" name="birthdate" value={this.state.birthdate}/>
                            </div>
                            <div class="form-group">
                                <text>Address</text>
                                <input onChange={this.changeAddress} type="text" class="form-control" name="address" placeholder={this.state.address}/>
                            </div>
                            <div class="form-group">
                                <text>City</text>
                                <input onChange={this.changeCity} type="text" class="form-control" name="city" placeholder={this.state.city}/>
                            </div>
                            <div class="form-group">
                                <text>Country</text>
                                <CountryDropdown onChange={this.changeCountry} value={this.state.country} placeholder={this.state.country}/>
                            </div>
                            <div class="form-group">
                                <text>Phone Number</text>
                                <input onChange={this.changePhone} type="text" class="form-control" name="phone" placeholder={this.state.phone}/>
                            </div>
                            <div class="form-group">
                                <Link to="/register">Purchase History</Link>
                            </div>
                            <button onClick = {this.saveDetails} class="btn btn-primary">Save Details</button>
                                          
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Profile;
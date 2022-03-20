import React, {Component} from 'react';
import '../../App.css';
import { Link } from "react-router-dom";
import Axios from 'axios';

class ShopProfile extends Component{
    constructor(props){
        super(props)

        this.state = {
            shopName:"",
            shopOwner:"",
        }

        this.onShopNameChange = this.onShopNameChange.bind(this)
        this.onShopOwnerDetails = this.onShopOwnerDetails.bind(this)
        this.updateShopDetails = this.updateShopDetails.bind(this)
        this.onFileChange = this.onFileChange.bind(this)
    }

    componentDidMount(){
        if(localStorage.getItem('ShopProfile') === 'true'){
            Axios.get('/getShopDetails', {
                params:{
                    email:localStorage.getItem('email')
                }
            })
            .then((response)=>{
                console.log(response)
                this.setState({
                    shopName:response.data.shopName,
                    shopOwner:response.data.shopOwner
                })
                console.log(this.state)
            })
        }
    }

    onFileChange = (e) => {
        e.preventDefault()
        console.log(e.target.files)
        localStorage.setItem("imageurl",'profile')
    }

    onShopNameChange = (e) => {
        this.setState({shopName:e.target.value})
    }

    onShopOwnerDetails = (e) => {
        this.setState({shopOwner:e.target.value})
    }

    updateShopDetails = (e)=>{
        e.preventDefault()
        const data = {
            email : localStorage.getItem('email'),
            shopName : this.state.shopName,
            shopOwner : this.state.shopOwner
        }
        console.log(data)
        Axios.post("/insertShopDetails",data)
        .then((response) => {
            console.log(response)
        })

        localStorage.setItem("ShopProfile", "true")
    }

    render(){
        return(
            <div>
            <div class="container">
                
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Shop Detaile</h2>
                            <p>Please enter your shop details</p>
                        </div>
                        <img src={'https://etsyitemimages.s3.amazonaws.com/'.concat(localStorage.getItem('imageurl'))} height='100' width='100'></img>
                            <div class="form-group">
                                <input type='file' class="form-group" onChange={this.onFileChange}/>
                            </div>
                            <div class="form-group">
                                <text>Shop Name</text>
                                <input type="text" onChange={this.onShopNameChange} class="form-control" name="shop name" value={this.state.shopName}/>
                            </div>
                            <div class="form-group">
                                <text>Shop Owner Details</text>
                                <input type="text" onChange={this.onShopOwnerDetails} class="form-control" name="shop owner" value={this.state.shopOwner}/>
                            </div>
                            <div class="form-group">
                                <button class="form-group" onClick={this.updateShopDetails} class="btn btn-primary">Update Shop Details</button>
                            </div>
                            <Link to="/ItemsPage">Add new Items</Link>
                                          
                    </div>
                </div>
            </div>
            </div>
        )
    }

}

export default ShopProfile
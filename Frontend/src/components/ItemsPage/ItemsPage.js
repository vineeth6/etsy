import React, {Component} from 'react';
import axios from 'axios';
import {incrementCount, decrementCount,logout} from '../../redux/actions/'
import {connect} from 'react-redux'

class ItemsPage1 extends Component{
    constructor(props){
        super(props)

        this.state = {
            url : null,
            selectedFile: null,
            imagename:"",
            description:"",
            price:"",
            quantity:"",
            category:"",
            error:""
        }

        this.onFileChange = this.onFileChange.bind(this)
        this.Upload = this.Upload.bind(this)
        this.onTextChange = this.onTextChange.bind(this)
        this.onDescriptionChange = this.onDescriptionChange.bind(this)
        this.onCategoryChange = this.onCategoryChange.bind(this)
        this.onPriceChange = this.onPriceChange.bind(this)
        this.onQuantityChange = this.onQuantityChange.bind(this)
    }

    onCategoryChange = (e) => {
        this.setState({category:e.target.value})
    }

    onDescriptionChange = (e) => {
        this.setState({description:e.target.value})
    }

    onPriceChange = (e) =>{
        this.setState({price:e.target.value})
    }

    onQuantityChange = (e) => {
        this.setState({quantity:e.target.value})
    }

    onFileChange = (e) =>{
        this.setState({selectedFile:e.target.files[0]})
    }

    onTextChange = (e) => {
        this.setState({imagename:e.target.value})
    }

    Upload=async(e) =>{
        e.preventDefault()

        const data = {
            email:localStorage.getItem('email'),
            imagename:this.state.imagename,
            description:this.state.description,
            price: this.state.price,
            quantity:this.state.quantity,
            category:this.state.category,
            outofstock:"false"
        }
        axios.get(process.env.REACT_APP_BASE_URL+'/s3Url', {
            params : {
                imagename:this.state.imagename
            }
        })
        .then(async(response)=>{
            console.log(response.data.url)
            this.setState({url:response.data.url})
    
            try{
                const response = await fetch(this.state.url , {
                    method:"PUT",
                    headers: {
                        "Content-Type" : "multipart/form-data"
                    },
                    body:this.state.selectedFile
                })
                console.log(response)
                if(response.ok){
                    console.log('file upload successful')
                }
                else{
                    console.log("file upload failed")
                }
            }
            catch(error){
                console.error(error)
            }

            axios.post(process.env.REACT_APP_BASE_URL+'/insertIntoItemInventory', data)
            .then(response => {
                if(response.data==='successful'){
                    this.setState({error:"Image inserted into Database"})
                }
                else{
                    this.setState({error:"Unable to insert"})
                }
            })

            const data1 = {
                shopName:localStorage.getItem('shName')
            }


        })

    }


    render(){
        // console.log(this.props.location.pathname)
        // return(
            
        //     <div>Hello {this.props.match.params.id}</div>
        // )

        const {error} = this.state
        console.log(this.props.location.pathname)
        console.log(this.props)
        return(
            <div>
                <div class='container'>
                    <div class='login-form'>
                        <div class='main-dev'>
                            <div class="panel">
                                <h2>Item Details</h2>
                                <p>Please enter your Item details</p>
                                <div style={{ color: "red" }}>{error}</div>
                            </div>
                            <div class="form-group">
                                <input type='file' class="form-group" onChange={this.onFileChange}/>
                            </div>
                            <div class="form-group">
                                <input type='text' class="form-group" onChange={this.onTextChange} placeholder="Image Name"/>
                            </div>
                            <div class="form-group">
                                <input type='text' class="form-group" onChange={this.onCategoryChange} placeholder="Image Category"/>
                            </div>
                            <div class="form-group">
                                <input type='text' class="form-group" onChange={this.onDescriptionChange} placeholder="Image Description"/>
                            </div>
                            <div class="form-group">
                                <input type='text' class="form-group" onChange={this.onPriceChange} placeholder="Image Price"/>
                            </div>
                            <div class="form-group">
                                <input type='text' class="form-group" onChange={this.onQuantityChange} placeholder="Image Quantity"/>
                            </div>
                            <div class="form-group">
                                <button class="form-group" onClick={this.Upload}>Upload</button>
                            </div>
                            <div>
                                <div>{this.props.count1}</div>
                                <p>
                                    <button onClick={()=>this.props.logout()}>+</button>
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('Heyyy')
    console.log(state.count)
    return {
        count1:state.count
    }
}

const mapDispatchToProps = ()=>{
    return{
        incrementCount,
        decrementCount,
        logout
    }
}

const ItemsPage = connect(mapStateToProps, mapDispatchToProps())(ItemsPage1);
export default ItemsPage
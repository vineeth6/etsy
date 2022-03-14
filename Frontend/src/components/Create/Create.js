import axios from 'axios';
import { Redirect } from "react-router";
import React, {Component} from 'react';
import cookie from 'react-cookies';

class Create extends Component{

    constructor(props)
    {
        super(props)
        this.state = {
            id:"",
            title:"",
            author:"",
            bookAdded: false
        }
    }

    handleOnIdChange = (e) => {
        e.preventDefault()
        this.setState({id:e.target.value})
        console.log(e.target.value)
    }

    handleOnTitleChange = (e) => {
        e.preventDefault()
        this.setState({title:e.target.value})
        console.log(e.target.value)
    }

    handleOnAuthorChange = (e) => {
        e.preventDefault()
        this.setState({author:e.target.value})
        console.log(e.target.value)
    }

    handleInputs = (e) => {
        e.preventDefault()
        const {id,title,author} = this.state
        const data = {
            bookid: id,
            title: title,
            author: author
        };

        axios
        .post("http://localhost:3001/create", data)
        .then((response) => {
            console.log(response)
            if(response.data === "duplicate"){
                this.setState({
                    error:"dubplicate id"
                })
            }
        })
        .catch((error) => {
            console.log(error)
        });
        this.setState({bookAdded:true})
    }

    

    render(){
        const error = this.state.error
        let redirectVar = null
        if(!cookie.load("cookie")){
            redirectVar = <Redirect to = '/login'/>
        }
        return(
            <div>
                {redirectVar}
                <br/>
                <div class="container">
                    <form onSubmit={this.handleInputs}>
                        <div style={{width: '30%'}} class="form-group">
                            <input  type="text" class="form-control" onChange={this.handleOnIdChange} name="BookID" placeholder="Book ID" value={this.state.id}/>
                            <div style={{ color: "red" }}>{error}</div>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input  type="text" class="form-control" onChange={this.handleOnTitleChange} name="Title" placeholder="Book Title" value={this.state.title}/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input  type="text" class="form-control" onChange={this.handleOnAuthorChange} name="Author" placeholder="Book Author" value={this.state.author}/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}}>
                            <button class="btn btn-success" type="submit">Create</button>
                        </div> 
                    </form>
                </div>
            </div>
        )
    }
}

export default Create;
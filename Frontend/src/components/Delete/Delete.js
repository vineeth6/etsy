import Axios from 'axios';
import React, {Component} from 'react';

class Delete extends Component{

    constructor(props){
        super(props)
        this.state={
            bookID:"",
            error:""
        }
    }

    IdChangeHandler = (e) => {
        e.preventDefault()
        this.setState({bookID:e.target.value})
    }

    handleOnDelete = (e) => {
        e.preventDefault()
        const data = {id:this.state.bookID}
        Axios
        .post("http://localhost:3001/delete", data)
        .then((response) =>{
            console.log(response)
            if(response.data === 'No'){
                console.log('No')
                this.setState({error:"BookId Not Present"})
            }
        }
        )
    }

    render(){
        const error = this.state.error
        return(
            <div class="container">
                <form onSubmit={this.handleOnDelete}>
                    <div style={{width: "50%",float: "left"}} class="form-group">
                        <input  type="text" class="form-control" onChange={this.IdChangeHandler} name="BookID" placeholder="Search a Book by Book ID" value={this.state.bookID}/>
                    </div>
                    <div style={{width: "50%", float: "right"}}>
                            <button class="btn btn-success" type="submit">Delete</button>
                    </div>
                    <div style={{ color: "red" }}>{error}</div> 
                </form>
            </div>
        )
    }
}

export default Delete;
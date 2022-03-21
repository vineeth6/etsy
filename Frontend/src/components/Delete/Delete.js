import Axios from 'axios';
import React, {Component} from 'react';

class Delete extends Component{

    constructor(props){
        super(props)
        this.state={
            itemName:"",
            itemPrice:""
        }

        this.nameChange = this.nameChange.bind(this)
        this.priceChange = this.priceChange.bind(this)
    }

    nameChange = (e) => {
        e.preventDefault()
        this.setState({itemName:e.target.value})
    }

    priceChange = (e) => {
        e.preventDefault()
        this.setState({itemPrice:e.target.value})
    }

    editPrice = (e) => {
        e.preventDefault()
        const data ={
            itemName: this.state.itemName,
            itemPrice: this.state.itemPrice
        }
        Axios.post(process.env.REACT_APP_BASE_URL+'/editItemPrice',data)
        .then(response => {
            if(response.data === "success")
                this.setState({error: "Item Price successfully changed"})
            else
                this.setState({error: "This item does not exist"})
        })
    } 

    render(){
        const error = this.state.error
        return(
            <div class="container">
                <form onSubmit={this.handleOnDelete}>
                    <div style={{width: "50%",float: "left"}} class="form-group">
                        <input  type="text" class="form-control" onChange={this.nameChange} name="BookID" placeholder="Enter name of the item" value={this.state.bookID}/>
                    </div>
                    <div style={{width: "50%",float: "left"}} class="form-group">
                        <input  type="text" class="form-control" onChange={this.priceChange} name="BookID" placeholder="Enter the new price" value={this.state.bookID}/>
                    </div>
                    <div style={{width: "50%", float: "right"}}>
                            <button onClick={this.editPrice} class="btn btn-success" type="submit">Edit</button>
                    </div>
                    <div style={{ color: "red" }}>{error}</div> 
                </form>
            </div>
        )
    }
}

export default Delete;
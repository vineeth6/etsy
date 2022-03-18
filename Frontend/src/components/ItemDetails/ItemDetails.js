import Axios from 'axios';
import React, {Component} from 'react';
import FbImageGrid from 'react-fb-image-grid'
import axios from 'axios';

class ItemDetails extends Component{
    constructor(props){
        super(props)

        this.state={
            itemName:this.props.location.pathname.split('/')[2],
            itemPrice:"",
            quantityAvailable:""
        }

    }

    componentDidMount(){
        console.log(this.state.itemName)
        axios.get('/ItemOverviewDetails', {
            
            params: {
                imagename:this.state.itemName
            }
            
        })
        .then((response) => {
            console.log(response.data.price)
            this.setState({
                itemPrice:response.data.price,
                quantityAvailable:response.data.quantityAvailable
            })
        })
    }

    render(){
        const imageLinkArray =[
            'https://etsyitemimages.s3.amazonaws.com/'.concat(this.state.itemName)
        ]

        const{itemName,itemPrice} = this.state
        
        return (
            <div>
                    <div class='container' style={{maxWidth: "300px", margin: "auto"}}>
                    <div class='login-form'>
                        <div class='main-dev'>
                            <div class="panel">
                                <h2>Item Overview</h2>
                            </div>
                            <FbImageGrid images={imageLinkArray}  width={50} height={50}/>
                            <div class="form-group">
                                <text class="form-group">Item name : {itemName}</text>
                            </div>
                            <div class="form-group">
                                <text class="form-group">Item Price : {itemPrice}</text>
                            </div>
                            <div class="form-group">
                                <input type='text' class="form-group" onChange={this.onQuantityChange} placeholder="Item Quantity"/>
                            </div>
                            <div class="form-group">
                                <button class="form-group" onClick={this.Upload}>Add to cart</button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default ItemDetails
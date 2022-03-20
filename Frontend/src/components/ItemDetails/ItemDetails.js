import Axios from 'axios';
import React, {Component} from 'react';
import FbImageGrid from 'react-fb-image-grid'
import axios from 'axios';

class ItemDetails extends Component{
    constructor(props){
        super(props)

        this.state={
            itemName:this.props.location.pathname.split('/')[2],
            itemPrice:"0",
            quantityDemand:"1"
        }

        this.onQuantityChange = this.onQuantityChange.bind(this)
        this.addToCart = this.addToCart.bind(this)
        this.addToFavorites = this.addToFavorites.bind(this)
    }

    addToFavorites = (e) => {
        e.preventDefault()
        localStorage.setItem('favorites', this.state.itemName)
    }

    onQuantityChange = (e) =>{
        this.setState({quantityDemand:e.target.value})
    }

    addToCart = (e)=>{
        e.preventDefault()
        const quantity = parseInt(this.state.quantityDemand)
        console.log(this.state.itemPrice)
        const price = quantity*parseInt(this.state.itemPrice)

        var list1=[]


        if(localStorage.getItem('cartDetails') === null)
        {
            localStorage.setItem("cartDetails", JSON.stringify(list1))
        }

        console.log(quantity)
        console.log(price)
        if(quantity>0 && price>0){
            var storedCart = JSON.parse(localStorage.getItem("cartDetails"))

            var element = {itemName:this.state.itemName, itemQuantity:this.state.quantityDemand, itemPrice:price}
            storedCart.push(element)

            console.log(storedCart)

            localStorage.setItem("cartDetails", JSON.stringify(storedCart))
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
        const{itemName,itemPrice} = this.state
        return (
            <div>
                    <div class='container' style={{maxWidth: "300px", margin: "auto"}}>
                    <div class='login-form'>
                        <div class='main-dev'>
                            <div class="panel">
                                <h2>Item Overview</h2>
                            </div>
                            <img src={'https://etsyitemimages.s3.amazonaws.com/'.concat(itemName)} height='400' width='350'></img>
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
                                <button class="form-group" onClick={this.addToCart}>Add to cart</button>
                            </div>
                            <div class="form-group">
                                <button class="form-group" onClick={this.addToFavorites}>Favorites</button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default ItemDetails
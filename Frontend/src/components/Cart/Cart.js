import React, {Component} from 'react';
import axios from 'axios';

class Cart extends Component{
    constructor(props){
        super(props)
        this.clearCart = this.clearCart.bind(this)
        this.buy = this.buy.bind(this)
    }

    // componentDidMount(){
    //     if(localStorage.getItem('cartDetails') != null){
    //         let cartDetails = JSON.parse(localStorage.getItem('cartDetails'))
    //         var totalPrice = 0
    //     }
    // }

    clearCart = (e)=>{ 
        e.preventDefault()
        localStorage.removeItem('cartDetails')
        this.props.history.push('/Cart')
    }

    buy = (e) => {
        e.preventDefault()
        if(localStorage.getItem('cartDetails') !== null){
        const data = {
            email:localStorage.getItem('email'),
            cartDetails:JSON.parse(localStorage.getItem('cartDetails')),
        }
        axios.post('/createTransactionID', data)
        .then((response)=>{
            console.log(response)
        })
        let cartDetails = JSON.parse(localStorage.getItem('cartDetails'))
        console.log(cartDetails)
        axios.post('/insertIntoTransaction',data)
        .then((response)=>{
            console.log(response)
        })

        localStorage.removeItem('cartDetails')
        this.props.history.push('/PurchasePage')
    }
    }

    render(){
        var details=[]
        var totalPrice=0
        if(localStorage.getItem('cartDetails') != null){
            let cartDetails = JSON.parse(localStorage.getItem('cartDetails'))
            console.log(cartDetails)
            details = cartDetails.map(item => {
                totalPrice += parseFloat(item.itemPrice)
                return(
                    <tr>
                        <td>{item.itemName}</td>
                        <td>{item.itemQuantity}</td>
                        <td>{item.itemPrice}</td>
                    </tr>
                )
            })
        }
        return(
            <div>
                <div class="container">
                    <h2>List of All Books</h2>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>ItemName</th>
                                    <th>Quantity</th>
                                    <th>Price for the quantity orderd</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {details}
                            </tbody>
                        </table>

                </div>
                <div class="container">
                        <text>Total Price:{totalPrice}</text>
                        <button onClick={
                            this.buy
                        }>Buy</button>
                </div>
            </div>
        )
    }
}

export default Cart
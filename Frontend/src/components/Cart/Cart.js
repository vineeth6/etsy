import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import {AddToCart} from '../../redux/actions/'

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

    buy = async(e) => {
        e.preventDefault()
        if(localStorage.getItem('cartDetails') !== null){
        const data = {
            email:localStorage.getItem('email'),
            cartDetails:JSON.parse(localStorage.getItem('cartDetails')),
        }
        axios.post(process.env.REACT_APP_BASE_URL+'/createTransactionID', data)
        .then((response)=>{
            console.log(response)
        })
        let cartDetails = JSON.parse(localStorage.getItem('cartDetails'))
        console.log(cartDetails)
        axios.post(process.env.REACT_APP_BASE_URL+'/insertIntoTransaction',data)
        .then((response)=>{
            console.log(response)
            localStorage.removeItem('cartDetails')
            this.props.history.push('/Pagination')
        })

        
    }
    }

    handleRowClick = (e,str) => {
        e.preventDefault()
        console.log("here")
        console.log(e.target.value)
        console.log(str)
        var cartdets = JSON.parse(localStorage.getItem('cartDetails'))
        var indexToBeRemoved = -1;
        console.log(isNaN(e.target.value))
        console.log(parseInt(e.target.value)===0)
        console.log(parseInt(e.target.value)>0)
        for( var i=0;i<cartdets.length;i++)
        {
            if(cartdets[i].itemName !== str)
                continue
            if(!isNaN(e.target.value) && parseInt(e.target.value)===0){
                indexToBeRemoved=i;
                cartdets.splice(i,1)
                break
            }
            else if(!isNaN(e.target.value) && parseInt(e.target.value)>0){
                cartdets[i].itemQuantity = parseInt(e.target.value)
                break
            }
            else if(cartdets[i].itemName===str)
                cartdets[i].message = e.target.value 
        }
        localStorage.setItem("cartDetails", JSON.stringify(cartdets))
        console.log(cartdets)
    }

    render(){
        var details=[]
        var totalPrice=0
        if(localStorage.getItem('cartDetails') != null){
            let cartDetails = JSON.parse(localStorage.getItem('cartDetails'))
            //let cartDetails = this.props.cart
            console.log(cartDetails)
            
            details = cartDetails.map(item => {
                totalPrice += parseFloat(item.itemPrice)
                var str = item.itemName
                return(
                    <tr onChange={(e) => this.handleRowClick(e,str)}>
                        <td>{item.itemName}</td>
                        {/* <td>{item.itemQuantity}</td> */}
                        <td><input type="text" class="form-control" name="quantity" placeholder={item.itemQuantity}/></td>
                        <td>{item.itemPrice}</td>
                        <td><input type="checkbox" name="name1"></input></td>
                        <td><input type="text" class="form-control" name="quantity"/></td>
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
                                    <th>Gift Wrap</th>
                                    <th>Gift Message</th>
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

const mapStateToProps = (state)=>{
    return{
        cart: state.cart,
        login: state.login
    }
}

export default connect(mapStateToProps, null)(Cart)
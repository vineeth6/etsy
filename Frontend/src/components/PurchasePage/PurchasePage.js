import Axios from 'axios';
import React, {Component} from 'react';


class PurchasePage extends Component{
    constructor(props){
        super(props)

        this.state = {
            shopEmail:"",
            orderDetails:[]
        }
    }

    componentDidMount(){
        Axios.get('/getTransactionDetails',{
            params:{
                email : localStorage.getItem('email')
            }
        })
        .then((response)=>{
            console.log('here')
            console.log(response.data)
            this.setState({
                orderDetails:response.data
            })
        })
        console.log('*****')
        console.log(this.state.orderDetails)
    }

    render(){
        var orderDetails = this.state.orderDetails
        console.log(this.state);
        console.log(orderDetails)
        var orderTags = orderDetails.map(item=>{
            return(
                <tr>
                    <td>{item.itemName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                </tr>
            )
            }
        )
        console.log('***')
        console.log(orderTags)
        return(
            <div>
                <div class="container">
                    <h2>Order History</h2>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>ItemName</th>
                                    <th>Quantity</th>
                                    <th>Price for the quantity ordered</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderTags}
                            </tbody>
                        </table>

                </div>
            </div>
        )
    }
}

export default PurchasePage
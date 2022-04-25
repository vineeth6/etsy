import Axios from 'axios';
import React, {Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';


class Pagination extends Component{
    constructor(props){
        super(props)
        console.log("**here")
        this.state = {
            shopEmail:"",
            orderDetails:[]
        }
    }


    componentDidMount(){
        Axios.get(process.env.REACT_APP_BASE_URL+'/getTransactionDetails',{
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
        console.log(this.state.orderDetails)
    }

    render(){

        const yourJsonData = this.state.orderDetails


// Here we define your columns

    const columns = [
        {
            dataField: 'itemName',
            text: 'Item Name'
        }, 
        {
            dataField: 'quantity',
            text: 'Quantity'
        },
        {
            dataField: 'price',
            text: 'Price'
        },
        {
            dataField: 'shopname',
            text: 'GIFT PACKING'
        }
    ];

        // Give it an option to show all quotes
        let orderDets = Number(this.state.orderDetails.length);

        // Set all of the major pagination options. You can reduce them if you want less

        const options = {
            paginationSize: 15,
            pageStartIndex: 0,
            firstPageText: 'First',
            prePageText: 'Back',
            nextPageText: 'Next',
            lastPageText: 'Last',
            nextPageTitle: 'First page',
            prePageTitle: 'Pre page',
            firstPageTitle: 'Next page',
            lastPageTitle: 'Last page',
            sizePerPageList: [{
              text: 'show 15', value: 15
            }, {
              text: 'show 2', value: 2
            },
            {
              text: 'show 5', value: 5
            },
            {
              text: 'show 10', value:10
            },
            {
              text: 'Show all', value: orderDets
            },]
          };

        return(
                <BootstrapTable 
               keyField='rowNumber' 
               data={ yourJsonData } 
               columns={ columns } 
               pagination={ paginationFactory(options) } />
            
        )
    }
}

export default Pagination
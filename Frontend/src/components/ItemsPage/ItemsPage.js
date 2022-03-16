import React, {Component} from 'react';

class ItemsPage extends Component{
    constructor(props){
        super(props)
    }
    render(){
        console.log(this.props.location.pathname)
        return(
            
            <div>Hello {this.props.match.params.id}</div>
        )
    }
}

export default ItemsPage
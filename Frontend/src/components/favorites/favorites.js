import React, {Component} from 'react';

class favorites extends Component{
    constructor(props){

        super(props)
    }

    render(){
        return(
            <div>
                <img src={'https://etsyitemimages.s3.amazonaws.com/'.concat(localStorage.getItem('favorites'))} height='400' width='350'></img>
            </div>
        )
    }
}

export default favorites
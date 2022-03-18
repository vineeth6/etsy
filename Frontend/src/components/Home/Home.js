import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import FbImageGrid from 'react-fb-image-grid'

class Home extends Component {
    constructor(){
        super();
        this.state = {  
            image:""
        }
    }  
    //get the books data from backend  
    componentDidMount(){
        axios.get('/homeImages')
                .then((response) => {
                console.log(response)
                this.setState({
                    image:response.data
                });
            });
    }

    render(){
        //iterate over books to create a table row
        const{image} = this.state
        const imageLinkArray = [
        ]
        var imageNameArray = image.split(';')
        imageNameArray.pop()
        console.log(imageNameArray)
        imageNameArray.forEach(function(imagename){
            imageLinkArray.push('https://etsyitemimages.s3.amazonaws.com/'.concat(imagename))
        })


        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div>
                {/* {redirectVar} */}
                <FbImageGrid images={imageLinkArray}/>

            </div> 
        )
    }
}
//export Home Component
export default Home;
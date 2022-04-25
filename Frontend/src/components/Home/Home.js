import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import FbImageGrid from 'react-fb-image-grid'
import { Link } from "react-router-dom";

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {  
            image:""
        }
    }  
    //get the books data from backend  
    componentDidMount(){
        console.log(process.env.REACT_APP_BASE_URL)
        const tok = localStorage.getItem('token')
        axios.get(process.env.REACT_APP_BASE_URL+'/homeImages', {headers:{
            Authorization:tok
        }})
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
        console.log(this.props)
        const imageLinkArray = [
        ]
        var imageNameArray = image.split(';')
        imageNameArray.pop()
        console.log(imageNameArray)


        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div style={{width:"1200px", margin:"auto", display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:"10px"}}>
                {imageNameArray.map((imagename) => (
                    <div 
                    style={{border:"1px solid #000", display:"flex", flexDirection:"column", justifyContent:"center",  cursor:"pointer"}} 
                    onClick={()=>( this.props.history.push('/ItemDetails/'.concat(imagename)))}>
                    <img 
                    src={'https://etsyitemimages.s3.amazonaws.com/'.concat(imagename)}
                    style={{width: "300px"}}
                    />
                    </div>
                    )
                )}

            </div> 
        )
    }
}
//export Home Component
export default Home;
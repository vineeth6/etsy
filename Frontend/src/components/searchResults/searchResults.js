import React, {Component} from 'react'
import axios from 'axios';

class searchResults extends Component{
    constructor(props){
        super(props)
        this.state = {
            image:"",
            error:""
        }
    }

    componentDidMount(){
        console.log(this.props.location.pathname.split('/')[2])
        axios.get('/searchResults',{
            params:{
                imageLike : this.props.location.pathname.split('/')[2]
            }
        })
        .then((response) => {
        console.log(response)
        this.setState({
            image:response.data
        });
    });
    }

    render(){
        const{image} = this.state
        console.log(this.props)
        const imageLinkArray = [
        ]
        var imageNameArray = image.split(';')
        imageNameArray.pop()
        console.log(imageNameArray)
        //if not logged in go to login page
        return(
            <div>
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
             <div style={{ color: "red" }}>{this.state.error}</div>
             </div>
        )
    }
}

export default searchResults
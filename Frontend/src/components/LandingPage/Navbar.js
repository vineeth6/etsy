import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);

        this.state= {
            searchstring:""
        }

        this.handleLogout = this.handleLogout.bind(this)
        this.changeText = this.changeText.bind(this)
        this.search = this.search.bind(this)
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }
    changeText = (e) => {
        this.setState({searchString:e.target.value})
    }

    search = (e)=>{
        e.preventDefault()
        var searchurl = "/searchResults/".concat(this.state.searchString)
        console.log(searchurl)
        this.props.history.push(searchurl)
    }

    render(){
        //if Cookie is set render Logout Button
        let navLogin = null;
        if(cookie.load('cookie')){
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        }else{
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
            )
        }
        let redirectVar = null;
        // if(cookie.load('cookie')){
            redirectVar = <Redirect to="/home"/>
        // }
        return(
            <div>
                {redirectVar}
            <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand">Etsy</a>
                    </div>
                    <ul class="nav navbar-nav">
                        <li class="active"><Link to="/home">Home</Link></li>
                        <li><Link to="/Profile">Profile</Link></li>
                        <li><Link to="/favorites">Favorites</Link></li>
                        <li><input type="text" onChange={this.changeText}/></li>
                        <li><button onClick={this.search}> Search</button></li>
                        <li><Link to="/ShopProfile">Shop Profile</Link></li>
                        <li><Link to="/Cart">Shopping Cart</Link></li>
                    </ul>
                    {navLogin}
                </div>
            </nav>
        </div>
        )
    }
}

export default Navbar;
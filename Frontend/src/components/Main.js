import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import Delete from './Delete/Delete';
import Create from './Create/Create';
import Navbar from './LandingPage/Navbar';
import Profile from './Profile/Profile'
import ShopProfile from './ShopProfile/ShopProfile'
import ItemsPage from './ItemsPage/ItemsPage'
import ItemDetails from './ItemDetails/ItemDetails'
import register from './register/register'

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Navbar}/>
                <Route path="/login" component={Login}/>
                <Route path="/home" component={Home}/>
                <Route path="/delete" component={Delete}/>
                <Route path="/create" component={Create}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/ShopProfile" component={ShopProfile}/>
                <Route path="/ItemsPage" component={ItemsPage}/>
                <Route path="/register" component={register}/>
                <Route path="/ItemDetails/:id" component={ItemDetails}> </Route>
            </div>
        )
    }
}
//Export The Main Component
export default Main;
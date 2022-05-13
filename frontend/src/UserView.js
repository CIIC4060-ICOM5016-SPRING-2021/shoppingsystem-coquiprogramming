import React, {Component, useState} from 'react';
import {Button, Card, Container, Divider, Header, Modal, Tab} from "semantic-ui-react";
import Dashboard from "./Dashboard";
import Products from "./Products";
import Wishlist from "./Wishlist";
import Cart from "./Cart";
import Profile from "./Profile";
import Orders from "./Orders";
import AdminParts from "./AdminParts"
import AdminAddParts from "./AdminAddPart"
import axios, {Axios} from "axios";






const clearCart = () => {
    let e = localStorage.getItem("login-data");
    let dat = JSON.parse(e)


    axios
        .delete(`http://127.0.0.1:5000/CoquiProgramming/Cart/${dat.user_id}/`,{

        } ).then((res) =>{
        console.log(res.data.json)
    }).catch(e => {
        console.log(e)
    })
}

const createOrder = () => {
    let e = localStorage.getItem("login-data");
    let dat = JSON.parse(e)


    axios
        .post(`http://127.0.0.1:5000/CoquiProgramming/newOrder/${dat.user_id}`,{

        } ).then((res) =>{
        console.log(res.data.json)
    }).catch(e => {
        console.log(e)
    })
}



function UserView(){
    let e = localStorage.getItem("login-data");
    let dat = JSON.parse(e)
    const [isAuth, setIsAuth] = useState(true)
    const [notShow, setNotShow] = useState(false)


    const panes = [
        {
            menuItem: 'Products', render: () => <Tab.Pane active={isAuth}><Container><Header>Coqui Parts</Header><Divider/></Container><Products/></Tab.Pane>
        },
        {
            menuItem: 'WishList', render: () => <Tab.Pane active={isAuth}><Wishlist></Wishlist></Tab.Pane>
        },
        {
            menuItem: 'Cart', render: () => <Tab.Pane active={isAuth}> <Button onClick ={clearCart}>CLEAR CART</Button> <Button onClick ={createOrder}>MAKE ORDER</Button> <Cart></Cart></Tab.Pane>
        },
        {
            menuItem: 'Profile', render: () => <Tab.Pane active={isAuth}><Profile></Profile></Tab.Pane>
        },
        {
            menuItem: 'Dashboard', render: () => <Tab.Pane active={isAuth}><Dashboard/></Tab.Pane>
        },
        {
            menuItem: 'Order History', render: () => <Tab.Pane active={isAuth}><Orders/></Tab.Pane>
        },

    ]
    const admin = [
        {
            menuItem: 'Products', render: () => <Tab.Pane active={isAuth}><Container><Header>Coqui Parts</Header><Divider/></Container><Products/></Tab.Pane>
        },
        {
            menuItem: 'WishList', render: () => <Tab.Pane active={isAuth}><Wishlist></Wishlist></Tab.Pane>
        },
        {
            menuItem: 'Cart', render: () => <Tab.Pane active={isAuth}> <Button onClick ={clearCart}>CLEAR CART</Button> <Button onClick ={createOrder}>MAKE ORDER</Button> <Cart></Cart></Tab.Pane>
        },
        {
            menuItem: 'Profile', render: () => <Tab.Pane active={isAuth}><Profile></Profile></Tab.Pane>
        },
        {
            menuItem: 'Dashboard', render: () => <Tab.Pane active={isAuth}><Dashboard/></Tab.Pane>
        },
        {
            menuItem: 'Order History', render: () => <Tab.Pane active={isAuth}><Orders/></Tab.Pane>
        },
        {
            menuItem: 'Part Modification (ADMIN)', render:() => <Tab.Pane active={isAuth}><Header>Admin Menu</Header><AdminParts/></Tab.Pane>
        },
        {
            menuItem: 'Add Part (ADMIN)', render:() => <Tab.Pane active={isAuth}><Header>Admin Menu</Header><AdminAddParts/></Tab.Pane>
        }
    ]
    if(dat.user_rol == true){
    return <Tab panes={admin}/>
    }
    else return <Tab panes={panes}/>

}
export default UserView;


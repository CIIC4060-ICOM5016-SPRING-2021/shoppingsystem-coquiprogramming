import React, {Component, useState} from 'react';
import {Button, Card, Container, Divider, Header, Modal, Tab} from "semantic-ui-react";
import Dashboard from "./Dashboard";
import Products from "./Products";
import Wishlist from "./Wishlist";
import Cart from "./Cart";
import Profile from "./Profile";


function UserView(){
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
            menuItem: 'Cart', render: () => <Tab.Pane active={isAuth}><Cart></Cart></Tab.Pane>
        },
        {
            menuItem: 'Profile', render: () => <Tab.Pane active={isAuth}><Profile></Profile></Tab.Pane>
        },
        {
            menuItem: 'Dashboard', render: () => <Tab.Pane active={isAuth}><Dashboard/></Tab.Pane>
        }
    ]

    return <Tab panes={panes}/>

}
export default UserView;


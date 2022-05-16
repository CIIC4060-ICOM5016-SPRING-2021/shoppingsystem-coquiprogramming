import React, {Component, useState} from 'react';
import {Button, Card, Container, Divider, Header, Modal, Segment, Tab} from "semantic-ui-react";
import Dashboard from "./Dashboard";
import Products from "./Products";
import Wishlist from "./Wishlist";
import Cart from "./Cart";
import Profile from "./Profile";
import Orders from "./Orders";
import AdminParts from "./AdminParts"
import AdminAddParts from "./AdminAddPart"
import axios, {Axios} from "axios";
import {Link} from "react-router-dom";



let user = JSON.parse(localStorage.getItem('user_info'))
// const LogOut = () => {
//     console.log(localStorage)
//     localStorage.clear();
//     console.log(" despues de borrar    " + localStorage)
//
//
// }
//
// const clearCart = () => {
//     let e = localStorage.getItem("login-data");
//     let dat = JSON.parse(e)
//
//
//     axios
//         .delete(`http://127.0.0.1:5000/CoquiProgramming/Cart/${dat.user_id}/`,{
//
//         } ).then((res) =>{
//         console.log(res.data.json)
//     }).catch(e => {
//         console.log(e)
//     })
// }

// const createOrder = () => {
//     let e = localStorage.getItem("login-data");
//     let dat = JSON.parse(e)
//
//
//     axios
//         .post(`http://127.0.0.1:5000/CoquiProgramming/newOrder/${dat.user_id}`,{
//         } ).then((res) =>{
//         console.log(res.data.json)
//         alert("Order has been placed!")
//         handleChange()
//     }).catch(e => {
//         console.log(e)
//     })
// }

function UserView(){

    let e = localStorage.getItem("login-data");
    let dat = JSON.parse(e)
    const [isAuth, setIsAuth] = useState(true)
    const [notShow, setNotShow] = useState(false)
    const [openOrder, setOpenOrder] = useState(false)
    const [openNoFunds, setOpenNoFunds] = useState(false)
    const [orderid, setOrder] = useState('')

    const LogOut = () => {
        console.log(localStorage)
        localStorage.clear();
        console.log(" despues de borrar    " + localStorage)
    }

    const clearCart = () => {
        let e = localStorage.getItem("login-data");
        let dat = JSON.parse(e)
        axios
            .delete(`http://127.0.0.1:5000/CoquiProgramming/Cart/${dat.user_id}/`,{
            }).then((res) =>{
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
            }).then((res) =>{
            console.log(res.data.json)

            console.log("SET ORDERRRR"+ orderid)
            handleChange()
        }).catch(e => {
            console.log(e)
            insufficientFunds()
        })

            axios
                .get(`http://127.0.0.1:5000/CoquiProgramming/Order/getId/${dat.user_id}`)
                .then(res =>{
                    setOrder(res.data[0].order_id)
                    console.log("SET ORDERRRR"+ orderid)
                }).catch(e=> {
                    console.log(e)
            })
    }

    const handleChange = () => {
        setOpenOrder(true);
    }

    const insufficientFunds = () => {
        setOpenNoFunds(true);
    }

    const panes = [
        {
            menuItem: 'Products', render: () => <Tab.Pane active={isAuth}><Container><Header>Coqui Parts</Header><Divider/></Container><Products/></Tab.Pane>
        },
        {
            menuItem: 'WishList', render: () => <Tab.Pane active={isAuth}><Wishlist></Wishlist></Tab.Pane>
        },
        {
            menuItem: 'Cart', render: () => <Tab.Pane active={isAuth}> <Button onClick ={clearCart}>CLEAR CART</Button><Button onClick={createOrder}>MAKE ORDER</Button><Cart></Cart></Tab.Pane>
        },
        {
            menuItem: 'Profile', render: () => <Tab.Pane active={isAuth}><Button color = 'black' as={Link} to="/Home" onClick = {LogOut}>Log Out</Button><Profile></Profile></Tab.Pane>
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
            menuItem: 'Profile', render: () => <Tab.Pane active={isAuth}><Button color = 'black'as={Link} to="/Home" onClick = {LogOut}>Log Out</Button><Profile></Profile></Tab.Pane>
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
    const customSegment = {
        backgroundColor: "DodgerBlue",
        padding: "50px"
    }
    if(dat.user_rol == true){
        return <Segment style={customSegment}>
            <Tab panes={admin}/>
            {<Modal
                centered={false}
                open={openOrder}
                onClose={() => setOpenOrder(false)}
                onOpen={() => setOpenOrder(true)}
            >
                <Modal.Header>Your order has placed successfully!</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        Your ORDER ID is: {orderid}
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setOpenOrder(false)}>OK</Button>
                </Modal.Actions>
            </Modal>}
        </Segment>
    }
    else
        return <div style={customSegment}><Segment>
            <Tab panes={panes}/>
            {<Modal
                centered={false}
                open={openOrder}
                onClose={() => setOpenOrder(false)}
                onOpen={() => setOpenOrder(true)}
            >
                <Modal.Header>Your order has been placed successfully!</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        Your ORDER ID is ...
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setOpenOrder(false)}>Continue Sshopping</Button>
                </Modal.Actions>
            </Modal>}

            {<Modal
                centered={false}
                open={openNoFunds}
                onClose={() => setOpenNoFunds(false)}
                onOpen={() => setOpenNoFunds(true)}
            >
                <Modal.Header>Your order could not be processed.</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        Insufficient funds to complete order.
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setOpenNoFunds(false)}>Keep browsing</Button>
                </Modal.Actions>
            </Modal>}
        </Segment></div>



}
export default UserView;


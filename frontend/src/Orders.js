import React, {Component, useEffect, useState} from 'react';
import {Button, Card, Container, Modal, Tab} from "semantic-ui-react";
import AllProducts from "./AllProducts";
import axios from "axios";
import AllOrders from "./AllOrders";

function Orders() {

    const [orders, setOrder] = useState([]);

    useEffect(() => {
        const getAllOrders = async() => {
            const orders = await getOrders();
            if(orders) setOrder(orders)

        };

        getAllOrders()

    }, []);

    const getOrders = async() => {

        let e = localStorage.getItem("login-data");
        let dat = JSON.parse(e)

        axios.get(`http://127.0.0.1:5000/CoquiProgramming/Order/getOrders/${dat.user_id}`, {
        })
            .then(data => {
                setOrder(data.data)
                //console.log(data.data)
            }).catch(error => console.log(error))


    };

    //console.log(getParts())
    let random_info = new Array(orders.length)

    for(let i = 0; i < orders.length; i++) {
        random_info[i] = orders[i]
    }

    return <Card.Group>
        <AllOrders info={random_info}/>
    </Card.Group>


}
export default Orders;
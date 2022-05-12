import React, {Component, useState} from 'react';
import {Button, Form, Card, Container, Modal, Tab, Grid, Divider} from "semantic-ui-react";
import axios from 'axios'
import {Link} from "react-router-dom";



    const GetOrderDetail = (order_id) => {
        
        axios
            .get(`http://127.0.0.1:5000/CoquiProgramming/Order/${order_id}`)
            .then(res => {
                console.log(res.data)
                let newPop = window.open("OrderDetails", "Order Details", "width=1020,height=1020")
                for(let i = 0 ;  i < res.data.order.length ; i++){
                    newPop.document.write("Part Name: "  +res.data.order[i].part_name + " Price: "+res.data.order[i].part_price + " Quantity Bought: "+ res.data.order[i].quantity + " Amount: " +res.data.order[i].partstotal + " ID: " +res.data.order[i].part_id + "<br></br>")
                }
                newPop.document.writeln(" Total Order: "+res.data.total)




            }).catch(error => console.log(error))


    }




function allOrders(props) {


   props.info.forEach(value => console.log(value.order_id, value.total, value.date));
    return props.info.map(value => {
        return <Card>
        <Card.Content>
            <Card.Header>Order ID: {value.order_id}</Card.Header>
            <Card.Meta> Total: {value.total}</Card.Meta>
            <Card.Description>
               Order Created At: {value.date}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <div className=' two buttons'>
                <Button content='Order Details' onClick = {() => GetOrderDetail(value.order_id)} size='medium'/>



            </div>


        </Card.Content>
    </Card>});
}
export default allOrders;
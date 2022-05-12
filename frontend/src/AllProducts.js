import React, {Component, useState} from 'react';
import {Button,Form, Card, Container, Modal, Tab} from "semantic-ui-react";
import axios from 'axios'



const addPartToCart =(part, getQuantity) => {
    let e = localStorage.getItem("login-data");
    let dat = JSON.parse(e)

    console.log(" part :" + part + " Quantity  " + getQuantity)

    axios
        .post('http://127.0.0.1:5000/CoquiProgramming/Cart',
            JSON.stringify({user_id:dat.user_id ,part_id : part, quantity:getQuantity}),{
        headers:{ 'Content-Type' : 'application/json'},

    }).then((res) => {
        console.log(res.data.json)
    }).catch(e => {
        console.log(e)
    })
}

const addPartToWish =(part) => {
    let e = localStorage.getItem("login-data");
    let dat = JSON.parse(e)

    axios
        .post('http://127.0.0.1:5000/CoquiProgramming/WishList',
            JSON.stringify({user_id:dat.user_id ,part_id : part}),{
                headers:{ 'Content-Type' : 'application/json'},

            }).then((res) => {
        console.log(res.data.json)
    }).catch(e => {
        console.log(e)
    })
}


function AllProducts(props) {

    const [getQuantity, setQuantity] = useState(' ')

    //console.log(props)
    props.info.forEach(value => console.log(value.part_name, value.part_price));
    return props.info.map(value => {return <Card>
        <Card.Content>
            <Card.Header>{value.part_name}</Card.Header>
            <Card.Meta>{value.part_price}</Card.Meta>
            <Card.Description>
                {value.part_info}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <div className=' two buttons'>
                <Button onClick ={() => addPartToWish(value.part_id)} basic color='red'>
                    Add to Wish List
                </Button>
                <Button  onClick ={() => addPartToCart(value.part_id, getQuantity)} basic color='blue'>
                    Add to Cart
                </Button>
                 <Form.Input type = "int" placeholder = 'quantity' onChange={(e) => {setQuantity(e.target.value)}}/>
            </div>


        </Card.Content>
    </Card>});
}
export default AllProducts;
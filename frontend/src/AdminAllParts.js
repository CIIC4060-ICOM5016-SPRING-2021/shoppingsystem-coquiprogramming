import React, {Component, useState} from 'react';
import {Button, Form, Card, Container, Modal, Tab, Image} from "semantic-ui-react";
import axios from 'axios'




const modifyPart =(part,quantity,price) => {
    let e = localStorage.getItem("login-data");
    let dat = JSON.parse(e)
    console.log(dat.user_id)
    console.log(price)
    console.log(quantity)
    console.log(part)
    axios
        .put(`http://127.0.0.1:5000/CoquiProgramming/Parts/${part}`,{
            admin_id:dat.user_id ,part_price : price, quantity:quantity})
        .then(res =>{
        console.log(res)
    }).catch(error => console.log(error))
}

const deletePart = (part) => {
    let e = localStorage.getItem("login-data");
    let dat = JSON.parse(e)

    axios
        .delete(`http://127.0.0.1:5000/CoquiProgramming/Parts/${part}`,{
            data : {
                admin_id : dat.user_id
            }}
        )
        .then(res => {
        console.log(res)
    }).catch(error => console.log(error))
}


function AllParts(props) {

    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')

    //console.log(props)
    props.info.forEach(value => console.log(value.part_name, value.part_price));
    return props.info.map(value => {return <Card>
        <Card.Content>
            <Card.Header>{value.part_name} </Card.Header>
            <Card.Meta>${value.part_price}  STOCK: {value.quantity}</Card.Meta>
            <Card.Description>
                {value.part_info}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <div className=' two buttons'>
                <Form.Input type = "int" placeholder = 'Quantity on Stock: 'onChange={(e) => {setStock(e.target.value)}}></Form.Input>
                <Form.Input type = "int" placeholder = 'New Price: ' onChange={(e) => {setPrice(e.target.value)}}></Form.Input>
                <Button color = 'black' onClick ={()=> modifyPart(value.part_id,stock,price)}>Modify</Button>
                <Button color = 'red' onClick ={() => deletePart(value.part_id)}>DELETE PART</Button>

            </div>


        </Card.Content>
    </Card>});
}
export default AllParts;
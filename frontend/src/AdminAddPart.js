import React, {Component, useEffect, useState} from 'react';
import {Button, Card, Container, Form, Modal, Tab} from "semantic-ui-react";
import AllProducts from "./AllProducts";
import axios from "axios";
import HomePage from "./HomePage";
import WishlistProduct from "./WishlistProducts";

const AddPart =(partname, partprice, partinfo, stock, cat) => {


        let e = localStorage.getItem("login-data");
        let dat = JSON.parse(e)
    console.log("PRUEBA DE ADD")

        axios
            .post(`http://127.0.0.1:5000/CoquiProgramming/Parts`, {
                admin_id: dat.user_id, part_name: partname,
                part_price: partprice, part_info: partinfo,
                quantity: stock, cat_id: cat
            }).then((res) => {
            console.log(res.data)
        }).catch(e => {
            console.log(e)
        })

}

function AddPartsAdmin() {

    const [name, setName]=useState('')
    const [price, setPrice]=useState('')
    const [info, setInfo]=useState('')
    const [cat, setCat]=useState('')
    const [stock, setStock]=useState('')

    //RetrieveParts

    return <Card>
        <Card.Content>


            <Card.Description>
                Here you can add a new Part into the Store!
                Fill The data accordingly
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <div className=' two buttons'>
                Part Name <Form.Input type = "text" placeholder = 'Part Name: ' onChange={(e) => {setName(e.target.value)}}></Form.Input>
                Part Price <Form.Input type = "Int" placeholder = 'Part Price: ' onChange={(e) => {setPrice(e.target.value)}}></Form.Input>
                Part Description <Form.Input type = "text" placeholder = 'Info: ' onChange={(e) => {setInfo(e.target.value)}}></Form.Input>
                Category ID <Form.Input type = "Int" placeholder = 'Category ID: ' onChange={(e) => {setCat(e.target.value)}}></Form.Input>
                Quantity Stock <Form.Input type = "Int" placeholder = 'Quantity: ' onChange={(e) => {setStock(e.target.value)}}></Form.Input>
                <Button color = 'red' onClick ={() => {AddPart(name, price, info, cat, stock)}}>SUBMIT</Button>

            </div>


        </Card.Content>
    </Card>







    //console.log(getParts())
    let random_info = new Array(1)


    return <Card.Group>
        <WishlistProduct info={random_info}/>
    </Card.Group>

}
export default AddPartsAdmin;
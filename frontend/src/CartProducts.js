import React, {Component, useState} from 'react';
import {Button, Card, CardMeta, Container, Grid, Modal, Tab} from "semantic-ui-react";
import axios from 'axios'



const deleteFrom =(part) => {
    let e = localStorage.getItem("login-data");
    let dat = JSON.parse(e)

    axios
        .delete('http://127.0.0.1:5000/CoquiProgramming/Cart',{
           data : {
            user_id : dat.user_id, part_id : part
    }}
        ).then((res) => {
            console.log(res.data.json)
            alert("PART DELETED")
    }).catch(e => {
        console.log(e)
    })
}




    function CartProducts(props) {


        props.info.forEach(value => console.log(value.part_name, value.part_price, value.part_id));


         return props.info.map( value => {
            //console.log(props.info[0])
            return <Card>

                <Card.Content>
                    <Card.Header>{value.part_name}</Card.Header>
                    <Card.Meta>Price: {value.part_price}</Card.Meta>
                    <Card.Meta>Quantity {value.quantity}</Card.Meta>


                    <Card.Description>
                        {value.part_info}
                    </Card.Description>
                </Card.Content>
                <Card.Content>
                    <div className='remove button'>
                        <Button  onClick ={() => deleteFrom(value.part_id)}  basic color='red'>
                            Remove from Cart
                        </Button>


                    </div>

                </Card.Content>

            </Card>



        } )
    }


export default CartProducts;
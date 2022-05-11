import React, {Component, useState} from 'react';
import {Button, Card, Container, Modal, Tab} from "semantic-ui-react";
import axios from 'axios'

const deleteFrom =(part) => {
    let e = localStorage.getItem("login-data");
    let dat = JSON.parse(e)

    axios
        .delete('http://127.0.0.1:5000/CoquiProgramming/WishList',{
            data : {
                user_id : dat.user_id, part_id : part
            }}
        ).then((res) => {
        console.log(res.data.json)

    }).catch(e => {
        console.log(e)
    })
}


function WishlistProduct(props) {


    //console.log(props)

        props.info.forEach(value => console.log(value.part_name, value.part_price));
        return props.info.map(value => {
            return <Card>
                <Card.Content>
                    <Card.Header>{value.part_name}</Card.Header>
                    <Card.Meta>Price: {value.part_price}</Card.Meta>
                    <Card.Description>
                        {value.part_info}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className=' two buttons'>
                        <Button onClick = {() => deleteFrom(value.part_id)}basic color='red'>
                            Remove from Wishlist
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        })

}
export default WishlistProduct;
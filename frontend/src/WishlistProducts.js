import React, {Component, useState} from 'react';
import {Button, Card, Container, Icon, Modal, Tab} from "semantic-ui-react";
import axios from 'axios'

// const deleteFrom =(part) => {
//     let e = localStorage.getItem("login-data");
//     let dat = JSON.parse(e)
//
//     axios
//         .delete('http://127.0.0.1:5000/CoquiProgramming/WishList',{
//             data : {
//                 user_id : dat.user_id, part_id : part
//             }}
//         ).then((res) => {
//         console.log(res.data.json)
//
//     }).catch(e => {
//         console.log(e)
//     })
// }


function WishlistProduct(props) {
    const [open, setOpen] = useState(false)
    const handleDelete = () => {
        setOpen(true);
    }
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
            handleDelete()
        }).catch(e => {
            console.log(e)
        })
    }

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
                        <Button animated='vertical' onClick = {() => deleteFrom(value.part_id)}basic color='red'>
                            <Button.Content visible>Remove from wishlist</Button.Content>
                            <Button.Content hidden><Icon name='trash alternate'/></Button.Content>
                        </Button>
                        {<Modal
                            centered={true}
                            size='mini'
                            open={open}
                            onClose={() => setOpen(false)}
                            onOpen={() => setOpen(true)}
                        >
                            <Modal.Header>Item removed from cart.</Modal.Header>
                            <Modal.Content>
                                <Modal.Description>
                                    The item has been successfully removed from your cart.
                                </Modal.Description>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button onClick={() => setOpen(false)}>OK</Button>
                            </Modal.Actions>
                        </Modal>}
                </Card.Content>
            </Card>
        })

}
export default WishlistProduct;
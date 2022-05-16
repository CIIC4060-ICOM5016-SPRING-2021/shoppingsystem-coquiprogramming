import React, {Component, useState} from 'react';
import {Button, Form, Card, Container, Modal, Tab, Image, Icon, Dropdown} from "semantic-ui-react";
import axios from 'axios'



// const addPartToCart =(part, getQuantity) => {
//     let e = localStorage.getItem("login-data");
//     let dat = JSON.parse(e)
//
//     console.log(" part :" + part + " Quantity  " + getQuantity)
//
//     axios
//         .post('http://127.0.0.1:5000/CoquiProgramming/Cart',
//             JSON.stringify({user_id:dat.user_id ,part_id : part, quantity:getQuantity}),{
//         headers:{ 'Content-Type' : 'application/json'},
//
//     }).then((res) => {
//         console.log(res.data.json)
//     }).catch(e => {
//         console.log(e)
//     })
// }
//
// const addPartToWish =(part) => {
//     let e = localStorage.getItem("login-data");
//     let dat = JSON.parse(e)
//
//     axios
//         .post('http://127.0.0.1:5000/CoquiProgramming/WishList',
//             JSON.stringify({user_id:dat.user_id ,part_id : part}),{
//                 headers:{ 'Content-Type' : 'application/json'},
//
//             }).then((res) => {
//         console.log(res.data.json)
//     }).catch(e => {
//         console.log(e)
//     })
// }


function AllProducts(props) {

    const [getQuantity, setQuantity] = useState(' ')
    const [openCart, setOpenCart] = useState(false)
    const [openWish, setOpenWish] = useState(false)
    const handleChangeCart = () => {
        setOpenCart(true);
    }
    const handleChangeWishlist = () => {
        setOpenWish(true);
    }
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
            handleChangeCart()
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
            handleChangeWishlist()
        }).catch(e => {
            console.log(e)
        })
    }
    //console.log(props)
    props.info.forEach(value => console.log(value.part_name, value.part_price));
    return props.info.map(value => {return <Card>
        {<Modal
            centered={true}
            size='mini'
            open={openCart}
            onClose={() => setOpenCart(false)}
            onOpen={() => setOpenCart(true)}
        >
            <Modal.Header>Item added to cart</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    This item has been added to your cart.
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => setOpenCart(false)}>OK</Button>
            </Modal.Actions>
        </Modal>}
        {<Modal
            centered={true}
            size='mini'
            open={openWish}
            onClose={() => setOpenWish(false)}
            onOpen={() => setOpenWish(true)}
        >
            <Modal.Header>Item added to wishlist</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    This item has been added to your wishlist.
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => setOpenWish(false)}>OK</Button>
            </Modal.Actions>
        </Modal>}
        <Card.Content>
            <Card.Header>{value.part_name} </Card.Header>
            <Image src='https://i.etsystatic.com/20335151/r/il/ec9b15/2925018714/il_794xN.2925018714_2w3h.jpg' size='small' />
            <Card.Meta>${value.part_price}</Card.Meta>
            <Card.Description>
                {value.part_info}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <div className='two buttons'>
                <Form.Input size='mini' type = "int" placeholder = 'quantity' onChange={(e) => {setQuantity(e.target.value)}}/>
                <Button animated='vertical' circular onClick ={() => addPartToWish(value.part_id)} basic color='red'>
                    <Button.Content visible>Add to wishlist</Button.Content>
                    <Button.Content hidden><Icon name='list'/></Button.Content>
                </Button>
                <Button  animated='vertical' circular onClick ={() => addPartToCart(value.part_id, getQuantity)} basic color='blue'>
                    <Button.Content visible>Add to cart</Button.Content>
                    <Button.Content hidden><Icon name='cart arrow down'/></Button.Content>
                </Button>
            </div>
        </Card.Content>
    </Card>});
}
export default AllProducts;
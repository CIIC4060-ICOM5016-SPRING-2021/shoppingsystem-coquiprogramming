import React, {Component, useEffect, useState} from 'react';
import {Button, Card, Container, Modal, Tab} from "semantic-ui-react";
import AllProducts from "./AllProducts";
import axios from "axios";
import HomePage from "./HomePage";
import WishlistProduct from "./WishlistProducts";
function Wishlist() {

    const [parts, setParts] = useState([]);
    //const[info, setinfo] =useState(false);
    const[name, setname] =useState('');

    //RetrieveParts


    useEffect(() => {
        const getWishlist = async() => {
            const contains = await getinfo();
            if(contains){
            setParts(contains)
                console.log("esto es setparts " + parts)
        }

        };

        getWishlist()

    }, []);





    function getinfo() {

            let e = localStorage.getItem("login-data");
            let dat = JSON.parse(e)
            axios.get(`http://127.0.0.1:5000/CoquiProgramming/WishList/View/${dat.user_id}`, {

            })
                .then(res => {
                    console.log(res.data)
                    setParts(res.data.wishlist)
                }).catch(e => console.log(e))
}

    //console.log(getParts())
    let random_info = new Array(parts.length)

    for(let i = 0; i < parts.length; i++) {
        random_info[i] = parts[i]
    }

    return <Card.Group>
        <WishlistProduct info={random_info}/>
    </Card.Group>

}
export default Wishlist;
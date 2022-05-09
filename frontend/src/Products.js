import React, {Component, useEffect, useState} from 'react';
import {Button, Card, Container, Modal, Tab} from "semantic-ui-react";
import AllProducts from "./AllProducts";
import axios from "axios";

function Products() {

    const [parts, setParts] = useState([]);

    //RetrieveParts


    useEffect(() => {
        const getAllParts = async() => {
            const allParts = await getParts();
            if(allParts) setParts(allParts)

        };

        getAllParts()

    }, []);

    const getParts = async() => { await
        axios

            .get("http://127.0.0.1:5000/CoquiProgramming/Parts")
            .then(data => {

               setParts(data.data.parts)


            }).catch(error => console.log(error))


    };

    //console.log(getParts())
    let random_info = new Array(parts.length)

    for(let i = 0; i < parts.length; i++) {
        random_info[i] = parts[i]
    }

        return <Card.Group>
            <AllProducts info={random_info}/>
        </Card.Group>



}
export default Products;
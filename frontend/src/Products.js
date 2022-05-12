import React, {Component, useEffect, useState} from 'react';
import {Button, Card, Container, Dropdown, Modal, Tab} from "semantic-ui-react";
import AllProducts from "./AllProducts";
import axios from "axios";

function Products() {

    const [parts, setParts] = useState([]);

    //RetrieveParts


    useEffect(() => {

        const getAllParts = async() => {

            const allParts = await getAll;
                if(allParts) setParts(allParts)
        };

        getAll()

    }, []);

   /* const getParts = async(filter) => {

        await


        axios

            .get(`http://127.0.0.1:5000/CoquiProgramming/Parts/${filter}`)
            .then(data => {

               setParts(data.data.parts)
                console.log(setParts)


            }).catch(error => console.log(error))


    };*/

    const getAll = async(filter) => {

        if(filter === 'All' | filter === undefined) {
        await
            axios

                .get(`http://127.0.0.1:5000/CoquiProgramming/Parts`)
                .then(data => {

                    setParts(data.data.parts)


                }).catch(error => console.log(error))

    }

        else if(filter != 'All' & filter != 'undefined'){
            await
        axios


            .get(`http://127.0.0.1:5000/CoquiProgramming/Parts/${filter}`)
            .then(data => {
                console.log(" ESTO ES DATAAAA " + data)
                setParts(data.data)
                //console.log(setParts)


            }).catch(error => console.log(error))

    }
    };

    //console.log(getParts())
    let random_info = new Array(parts.length)

    for(let i = 0; i < parts.length; i++) {
        random_info[i] = parts[i]
    }

    return<text>  <Dropdown text = 'Category'>
        <Dropdown.Menu>
            <Dropdown.Item text = 'All'  value = 'All' onClick = {() => getAll('All') }/>
        <Dropdown.Item text = 'Keyboards'  value = 'Keyboards' onClick = {() => getAll('Keyboards') }/>
            <Dropdown.Item text = 'Processors' value = 'Processors' onClick = {() => getAll('Processors') }/>
            <Dropdown.Item text = 'Memory' value = 'Memory'onClick = {() => getAll('Memory') }/>
            <Dropdown.Item text = 'Motherboards' value = 'Motherboards'onClick = {() => getAll('Motherboards') }/>
            <Dropdown.Item text = 'Computer Cases' value = 'Computer Cases' onClick = {() => getAll('Computer Cases') }/>
            <Dropdown.Item text = 'Power Supplies' value = 'Power Supplies' onClick = {() => getAll('Power Supplies') }/>
            <Dropdown.Item text = 'Monitors' value = 'Monitors'onClick = {() => getAll('Monitors') }/>
            <Dropdown.Item text = 'Mouse' value = 'Mouse' onClick = {() => getAll('Mouse') }/>
            <Dropdown.Item text = 'Storage' value = 'Storage'onClick = {() => getAll('Storage') }/>
            <Dropdown.Item text = 'Video Graphic Devices' value = 'Video Graphic Devices' onClick = {() => getAll('Video Graphic Devices') }/>
        </Dropdown.Menu>
    </Dropdown>
        <Dropdown text = 'Order By Name'>
            <Dropdown.Menu>
                <Dropdown.Item text = 'Ascending' value = 'OrderedAsc' onClick = {() => getAll('OrderedAsc') }/>
                <Dropdown.Item text = 'Descending' value = 'OrderedAsc' onClick = {() => getAll('OrderedDesc') }/>
            </Dropdown.Menu>

        </Dropdown>

    <Dropdown text = 'Order By Price'>
        <Dropdown.Menu>
            <Dropdown.Item text = 'Ascending' value = 'OrderedAsc' onClick = {() => getAll('OrderedAscByPrice') }/>
            <Dropdown.Item text = 'Descending' value = 'OrderedAsc' onClick = {() => getAll('OrderedDescByPrice') }/>
        </Dropdown.Menu>

    </Dropdown>

        <Card.Group>
            <AllProducts info={random_info}/>
        </Card.Group> </text>



}
export default Products;
import React, {Component, useState} from 'react';
import {Button, Card, Container, Modal, Tab} from "semantic-ui-react";
import axios from 'axios'




function AllProducts(props) {



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
                <Button basic color='red'>
                    Add to Wish List
                </Button>
                <Button basic color='blue'>
                    Add to Cart
                </Button>
            </div>
        </Card.Content>
    </Card>});
}
export default AllProducts;
import React, {Component,useEffect, useState} from 'react';
import {Button, Card, Container, Modal, Segment, Divider, Header } from "semantic-ui-react";
import {Bar, BarChart, CartesianGrid, Label, ResponsiveContainer, Legend, Tooltip, XAxis, YAxis } from "recharts";
import axios from "axios";
import {Link} from "react-router-dom";
export default


function Dashboard(){

    useEffect(() => {
        getTopCatBought();
        getTopProductBought();
        getCheapest();
        getExpensive();
        getMostLiked();
    })

    const [BoughtCategories, setBoughtCategories] = useState([]);
    const [BoughtProduct, setBoughtProduct] = useState([]);
    const [Cheapest, setCheapest]  = useState([]);
    const [Expensive, setExpensive]  = useState([]);
    const [Liked, setLiked]  = useState([]);


    const getTopCatBought = async () => {
        axios.get('http://127.0.0.1:5000/CoquiProgramming/GlobalRank/topCatBought').then((data) => {
            if(data){
                setBoughtCategories((data));
            }
        });
    }

    const getTopProductBought = async () => {
        axios.get('http://127.0.0.1:5000/CoquiProgramming/GlobalRank/topProductBought').then((data) => {
            if(data){
                setBoughtProduct((data));
            }
        });
    }

    const getCheapest = async () => {
        axios.get('http://127.0.0.1:5000/CoquiProgramming/GlobalRank/Cheapest').then((data) => {
            if(data){
                setCheapest((data));
            }
        });
    }


    const getExpensive = async () => {
        axios.get('http://127.0.0.1:5000/CoquiProgramming/GlobalRank/MostExpensive').then((data) => {
            if(data){
                setExpensive((data));
            }
        });
    }

    const getMostLiked = async () => {
        axios.get('http://127.0.0.1:5000/CoquiProgramming/GlobalRank/MostLiked').then((data) => {
            if(data){
                setLiked((data));
            }
        });
    }


    const CategoriesBought = BoughtCategories.map(item =>{
        return{
            "Category":item.Category  ,
            "Sold":item.Sold
        }
    })
    const ProductsBought = BoughtProduct.map(item =>{
        return{
            "Part Name":item.part_name  ,
            "Sold":item.Sold
        }
    })
    const CheapestProd = Cheapest.map(item =>{
        return{
            "part_name":item.part_name  ,
            "part_price":item.part_price
        }
    })
    const ExpensiveProd = Expensive.map(item =>{
        return{
            "part_name":item.part_name  ,
            "part_price":item.part_price
        }
    })
    const LikedProd = Liked.map(item =>{
        return{
            "part_name":item.part_name  ,
            "Likes":item.Likes
        }
    })


    return (

        <Segment>
            <Header dividing textAlign="center" size="huge" > Global Statistics </Header>

            <h4 class="ui horizontal divider header">
                Most Liked Product
            </h4>


            <Container style={{ width: "100vw", height: 500 }}>
                <ResponsiveContainer>
                    <BarChart width={1250} height={350} data={LikedProd}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="part_name" />
                        <YAxis label={{ value: '# of Times Liked', angle: -90, position: 'Left' }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Liked" fill="#A318E8" />
                    </BarChart>
                </ResponsiveContainer>
            </Container>

            <h4 class="ui horizontal divider header">
                Most Expensive Product
            </h4>

            <Container style={{ width: "100vw", height: 500 }}>
                <ResponsiveContainer>
                    <BarChart width={1250} height={350} data={ExpensiveProd} >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="part_name" />
                        <YAxis label={{ value: 'Most Expensive', angle: -90, position: 'Left' }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="part_price" fill="#15DDFC" />
                    </BarChart>
                </ResponsiveContainer>
            </Container>

        </Segment >


    )






}
// export default Dashboard;

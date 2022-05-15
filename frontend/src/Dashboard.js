import React, {Component,useEffect, useState} from 'react';
import {Button, Card, Container, Modal, Segment, Divider, Header } from "semantic-ui-react";
import {Bar, BarChart,RadialBarChart, RadialBar, CartesianGrid, Label, ResponsiveContainer, Legend, Tooltip, XAxis, YAxis } from "recharts";
import axios from "axios";
import {Link} from "react-router-dom";
export default







function Dashboard(){

    useEffect(() => {
        const getLiked = async() =>{
            const getlikes = await getLiked;
            if(getlikes) setLiked(getlikes)
            const getexpensive = await getExpensive
            if (getexpensive) setExpensive(getexpensive)
            const getcheapest = await getCheapest
            if(getcheapest) setCheapest(getcheapest)
            const topproduct = await getTopProductBought()
            if(topproduct) setBoughtProduct(topproduct)
            const topcat = await getTopCatBought;
            if(topcat) setBoughtCategories(topcat)
        }

        getTopCatBought();
        getTopProductBought();
        getCheapest();
        getExpensive();
        getMostLiked();
    },[])

    const [BoughtCategories, setBoughtCategories] = useState([]);
    const [BoughtProduct, setBoughtProduct] = useState([]);
    const [Cheapest, setCheapest]  = useState([]);
    const [Expensive, setExpensive]  = useState([]);
    const [Liked, setLiked]  = useState([]);


    const getTopCatBought = async () => {
        axios.get('http://127.0.0.1:5000/CoquiProgramming/GlobalRank/topCatBought').then((data) => {
            if(data){
                console.log(data.data)
                setBoughtCategories((data));
            }
        });
    }

    const getTopProductBought = async () => {
        axios.get('http://127.0.0.1:5000/CoquiProgramming/GlobalRank/topProductBought').then((data) => {
            if(data){
                console.log(data.data)
                setBoughtProduct((data));
            }
        });
    }

    const getCheapest = async () => {
        axios.get('http://127.0.0.1:5000/CoquiProgramming/GlobalRank/Cheapest').then((data) => {
            if(data){
                console.log(data.data)
                setCheapest((data));
            }
        });
    }


    const getExpensive = async () => {
        axios.get('http://127.0.0.1:5000/CoquiProgramming/GlobalRank/MostExpensive').then((data) => {
            console.log(data.data)
                setExpensive((data));

        });
    }

    const getMostLiked = async () => {
        axios.get('http://127.0.0.1:5000/CoquiProgramming/GlobalRank/MostLiked').then((data) => {

                console.log(data.data)
                setLiked((data));

        });
    }


   /* const CategoriesBought = BoughtCategories.map(item =>{
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
    })*/

    const style = {
        top: '50%',
        right: 0,
        transform: 'translate(0, -50%)',
        lineHeight: '24px',
    };



    return (

        <Segment>
            <Header dividing textAlign="center" size="huge" > Global Statistics </Header>






            <h4 className="ui horizontal divider header">
                Most Liked Product
            </h4>
            <Container style={{ width: "100vw", height: 400 }}>

                <ResponsiveContainer>
                    <BarChart width={300} height={350} data={Liked.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="part_name" />
                        <YAxis label={{ value: '# of Times Liked', angle: -90, position: 'Left' }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Likes" fill="#A318E8" />
                    </BarChart>
                </ResponsiveContainer>

            </Container>




                <Container style={{ width: "100vw", height: 400 }} >

                    <h4 className="ui horizontal divider header">
                        Most Products Bought
                    </h4>

                    <ResponsiveContainer>
                        <BarChart width={300} height={300} data={BoughtProduct.data}>
                            <CartesianGrid strokeDasharray="100 100" />
                            <XAxis dataKey="part_name" />
                            <YAxis label={{ value: '# of Times Liked', angle: -90, position: 'Left' }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="sold" fill="#A318E8" />
                        </BarChart>
                    </ResponsiveContainer>

            </Container>


        <Container style={{ width: "100vw", height: 400 }}>

            <h4 className= "ui horizontal divider header"></h4>
            <h4 className="ui horizontal divider header">
                Top Category sales
               <line> </line>
            </h4>


            <ResponsiveContainer>

                <BarChart width={300} height={300} data={BoughtCategories.data}>
                    <CartesianGrid strokeDasharray="100 100" />
                    <XAxis dataKey="category" />
                    <YAxis label={{ value: '# of Times Liked', angle: -90, position: 'Left' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sold" fill="#A318E8" />
                </BarChart>
            </ResponsiveContainer>
        </Container>

            <Container style={{ width: "100vw", height: 400 }}>
                <h4 className= "ui horizontal divider header"></h4>
                <h4 className= "ui horizontal divider header"></h4>
                <h4 className= "ui horizontal divider header"></h4>

                <p>CHEAPEST PRODUCT: {Cheapest.data[0].part_name}
                </p>

                <h4 className= "ui horizontal divider header"></h4>
                <h4 className= "ui horizontal divider header"></h4>
                <h4 className= "ui horizontal divider header"></h4>

                <p>
                    MOST EXPENSIVE PRODUCT: {Expensive.data[0].part_name}
                </p>

            </Container>




            {/*<h4 class="ui horizontal divider header">*/}
            {/*    Top 10 Product Bought</h4>*/}



        </Segment >


    )






}
// export default Dashboard;

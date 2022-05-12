import React, {Component,useEffect, useState} from 'react';
import {Grid,Segment,Button, Card, Container, Modal} from "semantic-ui-react";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import axios from "axios";
import {Link} from "react-router-dom";
export default


function Dashboard(){
/*
    const [data, setData] = useState([{"name": 1, "Counts": 5},
                                                {"name": 2, "Counts": 4},
                                                {"name": 3, "Counts": 3},
                                                {"name": 4, "Counts": 2},
                                                {"name": 5, "Counts": 1}]);

    return <Container style={{ height: 800 }}>

        <BarChart width={730} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Counts" fill="#8884d8" />
        </BarChart>
    </Container>

*/
const [BoughtCategories, setBoughtCategories] = useState([]);
const [BoughtProduct, setBoughtProduct] = useState([]);
const [Cheapest, setCheapest]  = useState([]);
const [Expensive, setExpensive]  = useState([]);
const [Liked, setLiked]  = useState([]);

const[t,sett] = useState(false);

function componentDidMount (){
    if(t === false){
        axios.get('http://127.0.0.1:5000/CoquiProgramming/GlobalRank/topCatBought').then(res => {
            // let BoughtCategories = res.data
            setBoughtCategories(res.data)

            console.log(res.data)
        })
        axios.get('http://127.0.0.1:5000/CoquiProgramming/GlobalRank/topProductBought').then(res => {
            // let BoughtProduct = res.data
            setBoughtProduct(res.data)

            console.log(res.data)
        })
        axios.get('http://127.0.0.1:5000/CoquiProgramming/GlobalRank/Cheapest').then(res => {
            // let Cheapest = res.data
            setCheapest(res.data)

            console.log(res.data)
        })
        axios.get('http://127.0.0.1:5000/CoquiProgramming/GlobalRank/MostExpensive').then(res => {
            // let Expensive = res.data
            setExpensive(res.data)

            console.log(res.data)
        })
        axios.get('http://127.0.0.1:5000/CoquiProgramming/GlobalRank/MostLiked').then(res => {
            // let Liked = res.data
            setExpensive(res.data)

            console.log(res.data)
        })

        sett(true)
    }
}

useEffect( () => {
    componentDidMount()
})

    return <>
    <Segment>
      <Segment placeholder>
         <Grid columns={5} stackable textAlign='center'>
             <Grid.Row verticalAlign = 'middle'>

                 <Grid.Column>
                     <h5> Top Category Bought:
                         <li>

                             <table style={{marginLeft : "auto", marginRight:"auto"}}>
                                 <thead>
                                 <tr>
                                     <th style={{padding:"5px",border:"1px solid black"}} scope ={"col"} >Category</th>
                                     <th style={{padding:"5px",border:"1px solid black"}} scope ={"col"} >Quantity Sold</th>
                                 </tr>
                                 </thead>

                                 <tbody>
                                 {
                                     BoughtCategories.map(item => {
                                         return (
                                             <tr>
                                                 <td style={{padding:"5px",border:"1px solid black"}} >{item.Category}</td>
                                                 <td style={{padding:"5px",border:"1px solid black"}} >{item.Sold}</td>
                                             </tr>
                                         )
                                     })
                                 }
                                 </tbody>

                             </table>
                         </li>

                     </h5>
                 </Grid.Column>

                 <Grid.Column>
                     <h5> Top Product Bought: <ul>
                         <li>

                             <table style={{marginLeft : "auto", marginRight:"auto"}}>
                                 <thead>
                                 <tr>
                                     <th style={{padding:"5px",border:"1px solid black"}} scope ={"col"} >Product</th>
                                     <th style={{padding:"5px",border:"1px solid black"}} scope ={"col"} >Quantity Sold</th>
                                 </tr>
                                 </thead>

                                 <tbody>
                                 {
                                     BoughtProduct.map(item => {
                                         return (
                                             <tr>
                                                 <td style={{padding:"5px",border:"1px solid black"}} >{item.Part_Name}</td>
                                                 <td style={{padding:"5px",border:"1px solid black"}} >{item.Sold}</td>
                                             </tr>
                                         )
                                     })
                                 }
                                 </tbody>

                             </table>
                         </li>
                     </ul>
                     </h5>
                 </Grid.Column>

                 <Grid.Column>

                 </Grid.Column>

                 <Grid.Column>

                 </Grid.Column>

                 <Grid.Column>

                 </Grid.Column>

             </Grid.Row>
         </Grid>


      </Segment>






    </Segment>







    </>

}
// export default Dashboard;

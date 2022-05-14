import React, {Component, useState} from 'react';
import axios from "axios"
import{useNavigate} from "react-router-dom";
import {Button, Divider, Form, Grid, Header, Modal, Segment, Tab} from 'semantic-ui-react';
import SignUpPage from "./SignUpPage";
import {Route, Link} from "react-router-dom";
import {render} from "react-dom";



function HomePage() {
    const [open, setOpen] = useState(false);
    const [userEmail,setEmail] =useState("");
    const [userPwd,setPassword] = useState("");
    const [data,setData] = useState("");
    console.log(open);
    const handleChange = () => {
        setOpen(true);
    }

    const handleLogin = () => {
        navigate('/UserView')
    }
    const navigate = useNavigate();

    const check = () => {
        axios

            .post("http://127.0.0.1:5000/CoquiProgramming/User/account",
                JSON.stringify({user_email:userEmail ,user_password : userPwd}),{
                headers:{ 'Content-Type' : 'application/json'},
                },)
            .then((res)=> {
                setData(res.data)
                console.log(res)
                if(res.data.user_id) {
                    handleLogin()
                    localStorage.removeItem("login-data")
                    localStorage.setItem("login-data", JSON.stringify(res.data))
                }

        }).catch(e =>{
            console.log(e)
            handleChange()
        })


        console.log(localStorage.getItem("login-data"))
        return false
    }
    // const registerChange = (event, newValue) => {
    //     <Route exact path="/Register" element={<SignUpPage/>} />
    // }
    const homeDiv = {
        color: "white",
        backgroundColor: "DodgerBlue",
        padding: "20px",
        fontFamily: "Helvetica"
    }
    const homeHeader = {
        color: "black",
        fontFamily: "Gill Sans"
    }
    return (<div style={homeDiv}><Segment><Header style={homeHeader} dividing textAlign="center" size="huge">Coqui PC Shop</Header>
            {<Modal
                centered={false}
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
            >
                <Modal.Header>Invalid Email Or Password</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        Wrong email or password, please try again.
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setOpen(false)}>OK</Button>
                </Modal.Actions>
            </Modal>}
            <Segment placeholder>
                <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column>
                        <Form>
                            <Form.Input
                                icon='user'
                                iconPosition='left'
                                label='Email'
                                placeholder='Email'
                                onChange= {(e) => {setEmail(e.target.value)}}
                            />
                            <Form.Input
                                icon='lock'
                                iconPosition='left'
                                label='Password'
                                placeholder="**********"
                                type='password'
                                onChange={(e) => {setPassword(e.target.value)}}
                            />
                        </Form>
                        <Button content='Login' primary onClick={check}/>
                    </Grid.Column>
                    <Grid.Column verticalAlign='middle'>
                        <Button content='Sign up'  icon='signup' size='big' onClick={() => {navigate("/Register")}}/>
                    </Grid.Column>
                </Grid>
                <Divider vertical>Or</Divider>
            </Segment>
        </Segment></div>
    )
}


export default HomePage;

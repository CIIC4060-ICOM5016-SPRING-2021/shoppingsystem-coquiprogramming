import React, {Component, useState} from 'react';
import axios from "axios"
import{useNavigate} from "react-router-dom";
import {Button, Divider, Form, Grid, Header, Image, Message, Modal, Segment, Tab} from 'semantic-ui-react';
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
    return <Grid textAlign='center' style={{ height: '100vh'}} verticalAlign={'middle'}>
        <Grid.Column style={{ maxWidth: 500}}>
            <Header as='h2' color='teal' textAlign='center'>
                Log-in to your account
            </Header>
            <Form size='large'>
                <Segment stacked>
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
                    <Form>
                        <Form.Input
                            fluid
                            icon='user'
                            iconPosition='left'
                            label='E-mail'
                            placeholder='E-mail'
                            onChange= {(e) => {setEmail(e.target.value)}}
                        />
                        <Form.Input
                            icon='lock'
                            iconPosition='left'
                            label='Password'
                            placeholder="Password"
                            type='password'
                            onChange={(e) => {setPassword(e.target.value)}}
                        />
                    </Form>
                    <Button color='teal' fluid  size='large' primary onClick={check}>Login</Button>
                    <Message>
                        New user? <a href='/Register'>Sign Up</a>
                    </Message>
                </Segment>
            </Form>
        </Grid.Column>
    </Grid>
}


export default HomePage;


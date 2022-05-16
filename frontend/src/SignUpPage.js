import React, {Component, useState} from 'react';
import {Button, Divider, Form, Grid, Header, Message, Modal, Segment, Tab} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import axios from "axios";



function SignUpPage() {
    const [open, setOpen] = useState(false);
    const [err, setErr] = useState(false);
    const [userEmailReg, setUserEmail] = useState('')
    const [userPassReg, setUserPass] = useState('')
    const [userNameReg, setUserName] = useState('')
    const [userBalReg, setUserBal] = useState('')

    const register = () => {
        axios.post("http://127.0.0.1:5000/CoquiProgramming/User", {
            user_email : userEmailReg,
            user_password : userPassReg,
            full_name : userNameReg,
            balance : userBalReg},
        ).then ((response) => {
            console.log(response);
            if(response) handleChange()
            else {
                handleErr()
            }

        })


    };


    console.log(open);
    const handleChange = (event, newValue) => {
        setOpen(true);
    }
    const handleSignup = (event, newValue) => {
        setOpen(true);
    }
    const handleErr = (event, newValue) => {
        setErr(true);
    }

    return <Grid textAlign='center' style={{height: '100vh'}} verticalAlign={'middle'}>
        <Grid.Column style={{ maxWidth: 500}}>
            <Header as='h2' color='teal' textAlign='center'>
                Register your account
            </Header>
            <Form size='large'>
                <Segment stacked>
                    {<Modal
                        centered={false}
                        open={err}
                        onClose={() => setErr(false)}
                        onOpen={() => setErr(true)}
                    >
                        <Modal.Header>Email already exist, please try another</Modal.Header>
                        <Modal.Content>
                            <Modal.Description>
                                Page will Refresh
                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button content='OK' as={Link} to="/Register" size='big'/>
                        </Modal.Actions>
                    </Modal>}
                    <Form>
                        <Form.Input required
                            icon='mail'
                            iconPosition='left'
                            label='E-mail'
                            placeholder='Email'
                            type = 'email' onChange = {
                            (e)=> {setUserEmail(e.target.value)}}
                        />
                        <Form.Input required
                            icon='key'
                            iconPosition='left'
                            label='Password'
                            placeholder='Password'
                            type = 'password' onChange = {(e)=> {setUserPass(e.target.value)}}
                        />

                        <Form.Input required
                            icon='user'
                            iconPosition='left'
                            label='Full Name'
                            placeholder='Manuel Rodriguez'
                            type = 'text' onChange = {(e)=> {setUserName(e.target.value)}}
                        />

                        <Form.Input required
                            icon='money'
                            iconPosition='left'
                            label='Balance'
                            placeholder='$0.00'
                            type = 'int' onChange = {
                            (e)=> {setUserBal(e.target.value)}}
                        />
                    </Form>
                    <Button color='teal' fluid  size='large' primary onClick={register} as={Link} to='/Home'>Sign Up</Button>
                    <Message>
                        Already a user? <a href='/Home'>Login</a>
                    </Message>
                </Segment>
            </Form>
        </Grid.Column>
    </Grid>
}


export default SignUpPage;


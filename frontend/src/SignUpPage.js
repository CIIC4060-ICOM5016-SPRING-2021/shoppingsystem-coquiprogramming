import React, {Component, useState} from 'react';
import {Button, Divider, Form, Grid, Header, Modal, Segment, Tab} from 'semantic-ui-react';
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
            balance : userBalReg
        }).then ((response) => {
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
    const handleErr = (event, newValue) => {
        setErr(true);
    }

    return (<Segment><Header dividing textAlign="center" size="huge">Register User</Header>
            <Modal
                centered={false}
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
            >
                <Modal.Header>Register Succesful</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        You will be redirected to the HomePage
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button content='OK' as={Link} to="/Home" size='big'/>
                </Modal.Actions>
            </Modal>

            <Modal
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
            </Modal>


            <Segment placeholder>

                <Grid columns={1} relaxed='very' stackable>
                    <Grid.Column>
                        <Form>
                            <Form.Input
                                icon='mail'
                                iconPosition='left'
                                label='Email'
                                placeholder='Email'
                                type = 'email' onChange = {
                                (e)=> {setUserEmail(e.target.value)}}
                            />
                            <Form.Input
                                icon='key'
                                iconPosition='left'
                                label='Password'
                                placeholder='*******'
                                type = 'password' onChange = {(e)=> {setUserPass(e.target.value)}}
                            />

                            <Form.Input
                                icon='user'
                                iconPosition='left'
                                label='Full Name'
                                placeholder='Manuel Rodriguez'
                                type = 'text' onChange = {(e)=> {setUserName(e.target.value)}}
                            />

                            <Form.Input
                                icon='money'
                                iconPosition='left'
                                label='Balance'
                                placeholder='$0.00'
                                type = 'int' onChange = {
                                (e)=> {setUserBal(e.target.value)}}
                            />

                        </Form>
                    </Grid.Column>
                    <Grid.Column verticalAlign='top'>
                        <Button content='Sign up' icon='signup' size='big' onClick={register}/>
                        <p>

                        </p>
                        <Button content='Already a user?' as={Link} to="/Home" size='big'/>
                    </Grid.Column>
                </Grid>


            </Segment>
        </Segment>
    )
}


export default SignUpPage;

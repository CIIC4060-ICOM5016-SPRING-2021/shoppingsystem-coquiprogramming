import React, {Component, useState} from 'react';
import {Button, Divider, Form, Grid, Header, Modal, Segment, Tab} from 'semantic-ui-react';
import axios from "axios";



function SignUpPage() {
    const [open, setOpen] = useState(false);
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
        })

    };


    console.log(open);
    const handleChange = (event, newValue) => {
        setOpen(true);

    }

    return (<Segment><Header dividing textAlign="center" size="huge">Register User</Header>
            <Modal
                centered={false}
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
            >
                <Modal.Header>Needs changing!</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        This is a modal but it serves to show how buttons and functions can be implemented.
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setOpen(false)}>OK</Button>
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
                                type = 'text' onChange = {
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
                    </Grid.Column>
                </Grid>


            </Segment>
        </Segment>
    )
}


export default SignUpPage;

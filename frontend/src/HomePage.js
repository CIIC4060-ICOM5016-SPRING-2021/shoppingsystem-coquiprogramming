import React, {Component, useState} from 'react';
import axios from "axios"
import{ useNavigate} from "react-router-dom";
import {Button, Divider, Form, Grid, Header, Modal, Segment, Tab} from 'semantic-ui-react';
import SignUpPage from "./SignUpPage";
import {Route, Link} from "react-router-dom";



function HomePage() {
    const [open, setOpen] = useState(false);
    const [email,setEmail] =useState("");
    const [password,setPassword] = useState("");
    const [data,setData] = useState("");
    console.log(open);
    const handleChange = () => {
        setOpen(true);
    }

    const handleLogin = () => {
        navigate('/dashboard')
    }
    const navigate = useNavigate();

    function check(){
        axios.get("http://127.0.0.1:5000/CoquiProgramming/User/account", {'user_email':email , 'user_password':password}).then(res=>
        {
            setData(res.data);
        })
        if(data === ""){
            return true
        }
        localStorage.removeItem("login-data")
        localStorage.setItem("login-data", JSON.stringify(data))
        console.log(localStorage.getItem("login-data"))
        return false
    }
    // const registerChange = (event, newValue) => {
    //     <Route exact path="/Register" element={<SignUpPage/>} />
    // }

    return (<Segment><Header dividing textAlign="center" size="huge">Welcome to CoquiProgramming's DB Demo</Header>
            <Modal
                centered={false}
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
            >
                <Modal.Header>Invalid Email Or Password</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        Either the Email Or Password is invalid, please try again.
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setOpen(false)}>OK</Button>
                </Modal.Actions>
            </Modal>
            <Segment placeholder>

                <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column>
                        <Form>
                            <Form.Input
                                icon='user'
                                iconPosition='left'
                                label='Email'
                                placeholder='Email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <Form.Input
                                icon='lock'
                                iconPosition='left'
                                label='Password'
                                type='password'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <Button content='Login' primary onClick={check()? handleChange:handleLogin}/>
                        </Form>
                    </Grid.Column>
                    <Grid.Column verticalAlign='middle'>
                        <Button content='Sign up'  icon='signup' size='big' onClick={() => {navigate("/Register")}}/>
                    </Grid.Column>
                </Grid>

                <Divider vertical>Or</Divider>
            </Segment>
        </Segment>
    )
}


export default HomePage;

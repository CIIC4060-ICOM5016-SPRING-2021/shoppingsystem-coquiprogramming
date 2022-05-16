import React, {Component, useEffect, useState} from 'react';
import axios from "axios"
import{ useNavigate} from "react-router-dom";
import {Button, Divider, Form, Grid, Header, Modal, Segment, Tab} from 'semantic-ui-react';
import SignUpPage from "./SignUpPage";
import {Route, Link} from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function Profile() {
    const [open, setOpen] = useState(false);
    const [userEmail,setEmail] =useState("");
    const [userPwd,setPassword] = useState("");
    const [Balance, setBalance] = useState('');
    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');
    const [data,setData] = useState("");
    const [info,setInfo] = useState(false);
    const [r, setr] = useState(false);
    console.log(open);


    const handleChange = () => {
        setOpen(true);
    }

    const handleUpdate = () => {
        navigate('/Home')
    }

    const y = () => {
        setr(true)
    }
    const navigate = useNavigate();

    function getinfo() {
        if(info === false){
            let e = localStorage.getItem("login-data");
            let dat = JSON.parse(e)
            axios.get(`http://127.0.0.1:5000/CoquiProgramming/User/${dat.user_id}`)
                .then(res => {
                    setName(res.data)
                    console.log("Esto es res " + name.full_name)
                })
            setInfo(true)
            console.log(name)
        }

    }

    //update account


    function checkAcc() {
        if ( !y) {
            return false
        } else {
            let e = localStorage.getItem("login-data");
            let dat = JSON.parse(e)
            let data = {
                "admin_id":1,
                "user_id": dat.user_id,
                "user_password":userPwd,
                "user_email": userEmail,
                "full_name": userName,
                "balance": Balance,
                "user_rol": dat.user_rol
            }
            if(userName === ""){
                data.full_name = name.full_name
                console.log(name);
            }
            if(userEmail === ""){
                data.user_email= name.user_email;
            }
            if(userPwd === ""){
                data.user_password= name.user_password;
            }
            if(Balance === ""){
                data.balance= name.balance;
            }
            axios.put('http://127.0.0.1:5000/CoquiProgramming/User',data).then(res => {
                setData(res.data)
                window.location.reload(false);
            })
            console.log(data)
            return true
        }

    }


    // delete account

    const deleteAcc =() => {
        let e = localStorage.getItem("login-data");
        let dat = JSON.parse(e)

        axios
            .delete('http://127.0.0.1:5000/CoquiProgramming/User',{
                data : {
                    user_id : dat.user_id, "Admin ID" : 1
                }}
            ).then((res) => {
            console.log(res.data.json)
            navigate('/Home')
        }).catch(e => {
            console.log(e)

        })
    }

    const checkBeforeDelete = () => {

        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this? This action cannot be undone',
            buttons: [
                {
                    color: 'red',label: 'Yes I want to delete',
                    onClick:  () => deleteAcc()
                },
                {
                    label: 'No',
                    onClick: () => alert('Account has not been deleted.')
                }
            ]
        });
    }




    useEffect(()=>{getinfo()})

    return (<Segment><Header dividing textAlign="center" size="huge">User Profile</Header>
            {<Modal
                centered={false}
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
            >
                <Modal.Header>This will update your info</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        Are you sure you want to proceed?
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setOpen(false)}>cancel</Button>
                    <Button onClick={() => setOpen(true)}>yes I want to update</Button>
                </Modal.Actions>
            </Modal>}
            <Segment placeholder>

                <Grid columns={2} stackable>
                    <Grid.Column>
                    <Form>
                            <Form.Input
                                icon='mail'
                                fluid
                                iconPosition='left'
                                label='Email'
                                placeholder='Insert Email'
                                onChange= {(e) => {setEmail(e.target.value)}}
                            />
                            <Button content='update' primary onClick={checkAcc}/>
                            <Form.Input
                                icon='lock'
                                iconPosition='left'
                                label='Password'
                                type='password'
                                placeholder='Insert Password'
                                onChange={(e) => {setPassword(e.target.value)}}
                            />
                            <Button content='update' primary onClick={checkAcc}/>
                    </Form>

                    </Grid.Column>

                    <Grid.Column>
                    <Form>
                                <Form.Input
                                    icon='dollar sign'
                                    fluid
                                    iconPosition='left'
                                    label='Balance'
                                    placeholder='Amount'
                                    onChange= {(e) => {setBalance(e.target.value)}}
                                />
                                <Button content='update' primary onClick={checkAcc}/>
                                <Form.Input
                                    icon='user'
                                    fluid
                                    iconPosition='left'
                                    label='Full Name'
                                    placeholder='Insert Full Name'
                                    onChange={(e) => {setUserName(e.target.value)}}
                                />
                                <Button content='update' primary onClick={checkAcc}/>
                    </Form>
                </Grid.Column>
                </Grid>
                <Button variant="danger" color={'red'} onClick={checkBeforeDelete}>DELETE ACCOUNT</Button>
            </Segment>
        </Segment>
    )
}


export default Profile;

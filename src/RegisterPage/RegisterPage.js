import React from 'react';
import allUsers from '../allUsers';
import './RegisterPage.css';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import messages from '../Components/messages';
import BlankUser from '../BlankUser.png';
import Token from '../Token.js';
import { useEffect, useState } from 'react';


function RegisterPage(props) {
    const [RegisterData, setRegisterData] = React.useState({
        username: "",
        password: "",
        repeatPassword: "",
        nickname: "",
        image: ""
    })

    let history = useHistory();

    function handleChange(event) {
        const { name, value, type, files} = event.target
        setRegisterData(prevRegisterData => ({
            ...prevRegisterData,
            [name]: type === "file" ? URL.createObjectURL(files[0]) : value 
        }))
    }
    
    const [erroMessageRemoval, setErroMessageRemoval] = React.useState(true)

    // function handleSubmit(event) {
    //     event.preventDefault()
    //     if (RegisterData.username.length === 0) {
    //         setUserValid(false)
    //         return
    //     } else {
    //         setUserValid(true)
    //     }
    //     if (RegisterData.password.length === 0) {
    //         setpasswordValid(false)
    //     } else {
    //         let matchPattern = RegisterData.password.match(/\d+/g);
    //         if (!(matchPattern != null) || !(/[a-zA-Z]+/.test(RegisterData.password))) {
    //             console.log('The input string not contain numbers');
    //             setpasswordValid(false);
    //             return
    //         } else {
    //             setpasswordValid(true)
    //         }
    //     }

    //     if (RegisterData.password !== RegisterData.repeatPassword) {
    //         setrepeatPasswordValid(false)
    //         return
    //     } else {
    //         setrepeatPasswordValid(true)
    //     }
    //     if (RegisterData.nickname.length === 0) {
    //         setnicknamerValid(false)
    //         return
    //     } else {
    //         setnicknamerValid(true)
    //     }
    //     finalCheck();
    // }
    
    // function finalCheck() {
    //     if(userValid && passwordValid && repeatPasswordValid && nicknameValid) {
    //         let flag = findIfUsernameExist();
    //         if(flag) {
    //             setregisterValid(false);
    //         } else {

    //             setregisterValid(true);
    //             allUsers.push(RegisterData);
    //             messages.push({user: RegisterData.username, 
    //                 chats: []
    //             })
    //             history.push("/chatPage");
    //             props.updateUser(RegisterData.username);
    //         }
    //     }
    //     console.log(allUsers)
    // }

    const [errorMassageFromServer, setErrorMassageFromServer] = React.useState('')

    function handleSubmit(event) {
        event.preventDefault()
        if ((RegisterData.username.length === 0) || (RegisterData.password.length === 0) || (RegisterData.repeatPassword.length === 0)
             || (RegisterData.nickname.length === 0)) {
                setErrorMassageFromServer("Empty fields are forbidden")
                setErroMessageRemoval(false);
                return
        }

        fetch('https://localhost:7267' + '/API/Register/' + RegisterData.username.toString() + '&' + RegisterData.password.toString()
                + '&' + RegisterData.repeatPassword.toString() + '&' + RegisterData.nickname.toString(), {
            method:"POST", 
        }).then(res => {
            res.text().then(t => {
                Token.set(t)
            })
            if(res.ok) {
                history.push("/chatPage");
                props.updateUser(RegisterData.username);
            } else {
                setErrorMassageFromServer(Token.get());
                setErroMessageRemoval(false);
            }
        })
    }

    function findIfUsernameExist() {
        let flag = false;
        allUsers.forEach(user => {
            if(user.username === RegisterData.username) {
                flag = true;
            }
        });
        return flag;
    }


    return (
        <div id="registerArea">
            <h1 className="display-3" id="welcomRegister">Registration</h1>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <label htmlFor="inputUsername3" className="col-sm-2 col-form-label">Username</label>
                    <div className="col-sm-10">
                        <input type="Username" className="form-control" placeholder="Enter Username" id="inputUsername3"
                            name="username" onChange={handleChange} value={RegisterData.username}></input>
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" placeholder="Enter Password" id="inputPassword3"
                            name="password" onChange={handleChange} value={RegisterData.password}></input>
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="inputRepeatPassword3" className="col-sm-2 col-form-label">Verify Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" placeholder="Verify Password" id="inputRepeatPassword3"
                            name="repeatPassword" onChange={handleChange} value={RegisterData.repeatPassword}></input>
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="inputNickname3" className="col-sm-2 col-form-label">Nickname</label>
                    <div className="col-sm-10">
                        <input type="Nickname" className="form-control" placeholder="Enter Nickname" id="inputNickname3"
                            name="nickname" onChange={handleChange} value={RegisterData.nickname}></input>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="imageFile" className="form-label">Upload Image</label>
                    <input className="form-control" type="file" id="imageFile"
                     name="image" onChange={handleChange} file={RegisterData.image}></input>
                </div>

                <div className="mb-3"></div>
                <button type="submit" className="btn btn-primary" id="RegisterButton">Register</button>
                <div>{!erroMessageRemoval && <small className="invalid--data">{errorMassageFromServer}</small>}</div>
                <div id="registerdHelpBlock" className="form-text">
                    Already registerd? <Link className="click--here" to="/">Click here</Link> to login.
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;
import React from 'react';
import ReactDOM from 'react-dom/client';
import allUsers from '../allUsers';
import './RegisterPage.css';


function RegisterPage(props) {
    const [RegisterData, setRegisterData] = React.useState({
        username: "",
        password: "",
        repeatPassword: "",
        nickname: "",
        image: {}
    })

    function handleChange(event) {
        const { name, value, type, files} = event.target
        setRegisterData(prevRegisterData => ({
            ...prevRegisterData,
            [name]: type === "file" ? URL.createObjectURL(files[0]) : value 
        }))
    }
    
    console.log(RegisterData);

    const [userValid, setUserValid] = React.useState(true)
    const [passwordValid, setpasswordValid] = React.useState(true)
    const [repeatPasswordValid, setrepeatPasswordValid] = React.useState(true)
    const [nicknameValid, setnicknamerValid] = React.useState(true)
    const [registerValid, setregisterValid] = React.useState(true)

    console.log(passwordValid)
    function handleSubmit(event) {
        event.preventDefault()
        if (RegisterData.username.length === 0) {
            setUserValid(false)
        } else {
            setUserValid(true)
        }
        if (RegisterData.password.length === 0) {
            setpasswordValid(false)
        } else {
            let matchPattern = RegisterData.password.match(/\d+/g);
            if (!(matchPattern != null) || !(/[a-zA-Z]+/.test(RegisterData.password))) {
                console.log('The input string not contain numbers');
                setpasswordValid(false);
            } else {
                setpasswordValid(true)
            }
        }

        if (RegisterData.password !== RegisterData.repeatPassword) {
            setrepeatPasswordValid(false)
        } else {
            setrepeatPasswordValid(true)
        }
        if (RegisterData.nickname.length === 0) {
            setnicknamerValid(false)
        } else {
            setnicknamerValid(true)
        }

        if(userValid && passwordValid && repeatPasswordValid && nicknameValid) {
            let flag = findIfUsernameExist();
            console.log(" flag : " + flag);
            if(flag) {
                setregisterValid(false);
            } else {
                setregisterValid(true);
            }
        }
    }

    const sss = [
        {username: "or",
        password: "or123",
        nickname: "or",
        image: {}},
    
        {username: "yotam",
        password: "y123",
        nickname: "yotam",
        image: {}},
      ];

    function findIfUsernameExist() {
        let flag = false;
        sss.forEach(user => {
            if(user.username === RegisterData.username) {
                flag = true;
            }
            console.log(user);
        });
        return flag;
    }


    return (
        <div id="registerArea">
            <h1 className="display-3" id="welcomRegister">Welcom to Register Page</h1>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <label htmlFor="inputUsername3" className="col-sm-2 col-form-label">Username</label>
                    <div className="col-sm-10">
                        <input type="Username" className="form-control" placeholder="Enter Username" id="inputUsername3"
                            name="username" onChange={handleChange} value={RegisterData.username}></input>
                        <div>{!userValid && <small className="invalid--data">Enter Username!</small>}</div>
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" placeholder="Enter Password" id="inputPassword3"
                            name="password" onChange={handleChange} value={RegisterData.password}></input>
                        <div>{!passwordValid && <small className="invalid--data">Password must contains numbers and characters!</small>}</div>
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="inputRepeatPassword3" className="col-sm-2 col-form-label">Re Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" placeholder="Repeat Password" id="inputRepeatPassword3"
                            name="repeatPassword" onChange={handleChange} value={RegisterData.repeatPassword}></input>
                        <div>{!repeatPasswordValid && <small className="invalid--data">Password doesn't mach!</small>}</div>
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="inputNickname3" className="col-sm-2 col-form-label">Nickname</label>
                    <div className="col-sm-10">
                        <input type="Nickname" className="form-control" placeholder="Enter Nickname" id="inputNickname3"
                            name="nickname" onChange={handleChange} value={RegisterData.nickname}></input>
                        <div>{!nicknameValid && <small className="invalid--data">Enter Nickname!</small>}</div>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="imageFile" className="form-label">Upload Image</label>
                    <input className="form-control" type="file" id="imageFile"
                     name="image" onChange={handleChange} file={RegisterData.image}></input>
                </div>

                <div className="mb-3"></div>
                <button type="submit" className="btn btn-primary" id="RegisterButton">Register</button>
                <div>{!registerValid && <small className="invalid--data">Username already exist, pls try different one</small>}</div>
                <div id="registerdHelpBlock" className="form-text">
                    Already registerd? <a className="click--here" onClick={props.handleClick}>Click here</a> to login.
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;
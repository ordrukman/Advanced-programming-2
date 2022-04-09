import React from 'react';
import ReactDOM from 'react-dom/client';
import './LogInPage.css';
import allUsers from '../allUsers';

function LogInPage(props) {
    const [loginData, setLoginData] = React.useState({
        username: "",
        password: ""
    })

    function handleChange(event) {
        const { name, value } = event.target
        setLoginData((prevloginData) => ({
            ...prevloginData,
            [name]: value
        }))
    }

    const [userValid, setUserValid] = React.useState(true)
    const [passwordValid, setpasswordValid] = React.useState(true)
    const [logInValid, setlogInValid] = React.useState(true)

    console.log(userValid)
    function handleSubmit(event) {
        event.preventDefault()
        if (loginData.username.length === 0) {
            setUserValid(false);
        } else {
            setUserValid(true);
        }
        if(loginData.password.length === 0) {
            setpasswordValid(false);
        } else {
            setpasswordValid(true);
        }
        if(userValid && passwordValid) {
            console.log("aas");
            let flag = findUsernameAndPassword();
            console.log(" flag : " + flag);
            if(flag) {
                setlogInValid(true);
            } else {
                setlogInValid(false);
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

    function findUsernameAndPassword() {
        let flag = false;
        sss.forEach(user => {
            if(user.username === loginData.username && user.password === loginData.password) {
                flag = true;
            }
            console.log(user);
        });
        return flag;
    }
   

    return (
        <div id="loginArea">
            <h1 className="display-3" id="welcomLogin">Welcom to Login Page</h1>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <label htmlFor="inputUsername3" className="col-sm-2 col-form-label">Username</label>
                    <div className="col-sm-10">
                        <input type="Username" className="form-control" placeholder="Enter Username" id="inputUsername3"
                            name="username" onChange={handleChange} value={loginData.username}></input>
                        <div>{!userValid && <small className="invalid--data">Enter Username!</small>}</div>
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" placeholder="Enter Password" id="inputPassword3"
                            name="password" onChange={handleChange} value={loginData.password}></input>
                            <div>{!passwordValid && <small className="invalid--data">Enter Password!</small>}</div>
                    </div>
                </div>


                <button type="submit" className="btn btn-primary" id="loginButton">Login</button>
                <div>{!logInValid && <small className="invalid--data">Username or password incorrect</small>}</div>
                <div id="registerdHelpBlock" className="form-text">
                    Not registerd? <a className="click--here" onClick={props.handleClick}>Click here</a> to register.
                </div>
            </form>
        </div>
    );
}

export default LogInPage;
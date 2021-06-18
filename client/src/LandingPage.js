import React, { useRef } from 'react'
import Staff from "./images/staff.png"
import Nav from "./Nav.js"
import "./LandingPage.scss"
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { login } from "./features/counterSlice"
function LandingPage() {
    const password = useRef(null);
    const id = useRef(null);
    const history = useHistory();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user.value);

    if (userData != null) {
        history.push('/home')
    }

    const logIn = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:7000/login/patient", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                id: id.current.value,
                password: password.current.value
            })
        });
        console.log(response)
        console.log('Hello')
        const data = await response.json();
        console.log(data)
        let patientData={};
        patientData.uId=data.identifier[0].value;
        patientData.birthDate=data.birthDate;
        patientData.gender=data.gender;
        patientData.firstName=data.name[0].given[0];
        patientData.lastName=data.name[0].family;
        data.telecom.forEach((tel)=>
            patientData[tel.system]=tel.value
        )
        patientData.maritalStatus=data.maritialStatus.text;
        patientData.photo=data.photo.url;
        data.address.forEach((val)=>{
            let arr=Object.getOwnPropertyNames(val);
            arr.forEach((name)=>{
                patientData[`address${val.type}${name}`]=val[name]
            })
        })
        console.log(data);
        console.log(patientData)
        dispatch(login(patientData));

    }
    return (
        <div className="landingPage">
            <Nav />
            <div className="landingPage__content">
                <h1>Manage Personal Health Data</h1>
                <p>Where you can access the history of patient</p>
            </div>
            <form className="landingPage__login" onSubmit={logIn}>
                <h1>Log In</h1>
                <input ref={id} type="text" id="Email" placeholder="ID" aria-label="ID" />
                <input ref={password} type="password" id="Password" placeholder="Password" aria-label="Password" />
                <button type="submit" id="logIn">Log In</button>
            </form>
            <div className="landingPage__imgBox">
                <img src={Staff} alt="Docs" />
            </div>
        </div>
    )
}

export default LandingPage

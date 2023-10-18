import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

export default function Register() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [type, setType] = useState("Default");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    
    let processForm = (e) => {
        document.getElementById("type_error").innerHTML = "";
        document.getElementById("email_error").innerHTML = "";
        document.getElementById("password_error").innerHTML = "";
        document.getElementById("password2_error").innerHTML = "";
        let errors = 0;
        
        if (password.length < 8) {
            document.getElementById("password_error").innerHTML = "Password must be at least 8 characters long!!!";
            errors += 1;
        }
        
        if (password !== password2) {
            document.getElementById("password2_error").innerHTML = "Passwords don't match!!!";
            errors += 1;
        }
        
        if (!validateEmail(email)) {
            document.getElementById("email_error").innerHTML = "Invalid email address!!!";
            errors += 1;
        }
        
        if (type === "Default") {
            document.getElementById("type_error").innerHTML = "Select a valid type!!!";
            errors += 1;
        }
        
        if(errors === 0) {
            console.log('====================================');
            console.log("password:", password);
            console.log("password2:", password2);
            console.log("email:", email);
            console.log("type:", type);
            console.log('====================================');
            fetch("https://localhost:44345/api/Users", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "email": email,
                        "password": password,
                        "type": type
                    }
                )
            })
            .then(res => {
                alert("New account created successfully");
                router.push("/Auth/Login");
            })
            .catch(err => {
                console.log("error creating account:", err);
                alert("Error creating account:" + err)
            })
        }
    };
    
    let validateEmail = (mail) => {
        const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return res.test(String(mail).toLowerCase());
    }
    
    return (
        <div>
            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-7 col-lg-5">
                            <div className="wrap">
                                <div className="img"></div>
                                <div className="login-wrap p-4 p-md-5">
                                    <div className="d-flex">
                                        <div className="w-100">
                                            <h3 className="mb-4">Register</h3>
                                        </div>
                                    </div>
                                    <div id='reg_form' className="signin-form">
                                    
                                        <div className="form-group mt-3">
                                            <label
                                                className="form-control-placeholder"
                                            >
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                required
                                                onInput={e => setEmail(e.target.value) }
                                            />
                                            <span id="email_error" className="text-danger"></span>
                                        </div>

                                        <div className="form-group mt-3">
                                            <label className="form-control-placeholder" htmlFor="password">Password</label>
                                            <input
                                                id="password-field"
                                                type="password"
                                                className="form-control"
                                                required
                                                onChange={e => setPassword(e.target.value)}
                                            />
                                            <span id="password_error" className="text-danger"></span>
                                            <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span>
                                        </div>
                                        
                                        <div className="form-group mt-3">
                                            <label className="form-control-placeholder" htmlFor="password">Confirm Password</label>
                                            <input
                                                id="password2-field"
                                                type="password"
                                                className="form-control"
                                                required
                                                onChange={e => setPassword2(e.target.value)}
                                            />
                                            <span id="password2_error" className="text-danger"></span>
                                            <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span>
                                        </div>
                                        
                                        <div className="form-group mt-3">
                                            <label className="form-control-placeholder" htmlFor="password">Type</label>
                                            
                                            <select
                                                name="type" id="type"
                                                className="form-control"
                                                onChange={e => setType(e.target.value)}
                                            >
                                                <option value="Default">Select</option>
                                                <option value="admin">Admin</option>
                                                <option value="doctor">Doctor</option>
                                                <option value="patient">Patient</option>
                                                <option value="phamacist">Phamacist</option>
                                            </select>
                                            <span id="type_error" className="text-danger"></span>
                                            <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span>
                                        </div>

                                        <div className="form-group mt-3">
                                            <button
                                                id='reg_form'
                                                className="form-control btn btn-primary rounded submit px-3"
                                                onClick={processForm}
                                            >
                                                Register
                                            </button>
                                        </div>

                                        <div className="form-group d-md-flex mt-3 align-items-center justify-content-center">
                                            <div className="w-50 text-md-right">
                                                <Link href="/Auth/Forgot">Forgot Password?</Link>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <p className="text-center">Already a member? <Link data-toggle="tab" href="/Auth/Login">Sign In</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

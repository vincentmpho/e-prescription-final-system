import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getUser, setUser } from '../User/data';
import { useRouter } from 'next/router';

export default function Login() {
    const router = useRouter();
    const [remember, setRemember] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let processForm = () => {
        console.log("Processing...");
        fetch("https://localhost:44345/api/Users")
            .then(res => res.json())
            .then(res => {
                console.log(res);
                let found = false
                for (let i = 0; i < res.length; i++) {
                    let item = res[i];
                    console.log(item.email, " | ", username);
                    if (item.email === username) {
                        found = true;
                        if (item.password === password) {
                            
                            window.localStorage.setItem('user', JSON.stringify(item));
                            console.log("user logged in:", window.localStorage.getItem('user').email);
                            alert("Login successful");
                            router.push("/");
                            break;
                            
                        } else {
                            alert("Wrong password!!!");
                        }
                    }
                }
                if (!found) {
                    alert("The username does not exist!");
                }
            })
            .catch(err => {
                console.log("Error fetching data: " + err)
            })
    }

    return (
        <div className="container">
            <section className="ftco-section">
                <div>
                    <div className="row justify-content-center">
                        <div className="col-md-7 col-lg-5">
                            <div className="wrap">
                                <div className="img"></div>
                                <div className="login-wrap p-4 p-md-5">
                                    <div className="d-flex">
                                        <div className="w-100">
                                            <h3 className="mb-4">Sign In</h3>
                                        </div>
                                        <div className="w-100">
                                            <p className="social-media d-flex justify-content-end">
                                                <a href="#" className="social-icon d-flex align-items-center justify-content-center"><span className="fa fa-facebook"></span></a>
                                                <a href="#" className="social-icon d-flex align-items-center justify-content-center"><span className="fa fa-twitter"></span></a>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="signin-form">
                                        <div className="form-group mt-3">
                                            <label
                                                className="form-control-placeholder"
                                                htmlFor="username"
                                            >
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                required
                                                onChange={e => setUsername(e.target.value)}
                                            />
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
                                            <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span>
                                        </div>

                                        <div className="form-group mt-3">
                                            <button
                                                id='submit'
                                                className="form-control btn btn-primary rounded submit px-3"
                                                onClick={processForm}
                                            >
                                                Sign In
                                            </button>
                                        </div>

                                        <div className="form-group d-md-flex mt-3 align-items-center">
                                            <div className="w-50 text-left">
                                                <label className="checkbox-wrap checkbox-primary mb-0">Remember Me
                                                    <input
                                                        type="checkbox"
                                                        onChange={e => setRemember(e.target.value)}
                                                        className="ms-1"
                                                    />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                            <div className="w-50 text-md-right">
                                                <Link href="/Auth/Forgot">Forgot Password</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-center">Not a member? <Link data-toggle="tab" href="/Auth/Register">Sign Up</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

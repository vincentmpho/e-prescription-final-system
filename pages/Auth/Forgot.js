import React, { useState } from 'react';
import { useRouter } from 'next/router'

export default function Forgot() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let processForm = () => {
        console.log("Processing...");
        if(password.length < 8) {
            alert("Password must be at least 8 characters long!!!");
            return;
        }
        fetch("https://localhost:44345/api/Users")
            .then(res => res.json())
            .then(res => {
                console.log(res);
                let found = false
                let user = null;
                for (let i = 0; i < res.length; i++) {
                    let item = res[i];
                    if (item.email === username) {
                        found = true;
                        user = item;
                    }
                }
                if (found) {
                    user.password = password;
                    let update_url = `https://localhost:44345/api/Users/${username}`
                    fetch(update_url, {
                        method: 'PUT',
                        body: JSON.stringify({
                            email: user.email,
                            password: password,
                            type: user.type
                        })
                    })
                    .then(res => res.json())
                    .then(res => {
                        alert("Password changed successfully");
                        router.push("/Auth/Login");
                    })
                    .catch(err => {
                        alert("Error", err)
                    })
                } else {
                    alert("The username you have entered does not exist!!!");
                }
            })
            .catch(err => {
                console.log("Error fetching data: " + err)
            })
    }
    
    return (
        <div className="container">
            <div className="form">
                <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input type="text" placeholder='Email' onChange={e => setUsername(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" onClick={processForm}>Change Password</button>
                </div>


            </div>
        </div>
    )
}

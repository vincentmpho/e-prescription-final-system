import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Add() {
    let router = useRouter();
    
    const [PhamacyNumber, setPhamacyNumber] = useState("");
    const [PhamacyName, setPhamacyName] = useState("");
    const [PhamacyContact, setPhamacyContact] = useState("");
    const [PhamacyEmail, setPhamacyEmail] = useState("");
    const [PhamacyLicenceNumber, setPhamacyLicenceNumber] = useState("");

    let validateEmail = (mail) => {
        const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return res.test(String(mail).toLowerCase());
    }

    let displayError = (id) => {
        let input = document.getElementById(`${id}`);
        let error_div = document.getElementById(`${id}_error`);
        error_div.style.display = "block";
        input.style.borderColor = "red";
        if (!input.className.includes("is-invalid")) {
            input.classList.add("is-invalid");
        }
    }

    let removeError = (id) => {
        let input = document.getElementById(`${id}`);
        let error_div = document.getElementById(`${id}_error`);
        error_div.style.display = "none";
        // input.style.borderColor = "#ced4da";
        input.style.borderColor = "green";
        if (input.className.includes("is-invalid")) {
            input.classList.remove("is-invalid");
        }
    }

    let handleData = () => {
        let errors = 0;
        if (!PhamacyNumber || PhamacyNumber.length !== 12) {
            displayError("number");
            errors += 1;
        } else {
            removeError("number");
        }

        if (!PhamacyName) {
            displayError("name");
            errors += 1;
        } else {
            removeError("name");
        }

        if (!validateEmail(PhamacyEmail)) {
            displayError("email");
            errors += 1;
        } else {
            removeError("email");
        }

        if ((PhamacyContact[0] !== "0") || (PhamacyContact.length !== 10)) {
            displayError("contact");
            errors += 1;
        } else {
            removeError("contact");
        }

        if (PhamacyLicenceNumber.length !== 6) {
            displayError("licence");
            errors += 1;
        } else {
            removeError("licence");
        }

        if (errors === 0) {
            fetch("https://localhost:44345/api/Phamacies")
                .then(res => res.json())
                .then(res => {
                    console.log('====================================');
                    console.log(JSON.stringify({
                        "phamacyNumber": PhamacyNumber + "",
                        "phamacyName": PhamacyName + "",
                        "phamacyContact": PhamacyContact + "",
                        "phamacyEmail": PhamacyEmail + "",
                        "phamacyLicenceNumber": Number(PhamacyLicenceNumber)
                    }));
                    
                    console.log('====================================');
                    let exists = false;
                    for (let i = 0; i < res.length; i++) {
                        if (PhamacyNumber === res[i].doctorNumber) {
                            alert("The phamacy number you have entered already exists!!!!");
                            exists = true;
                        }
                    }
                    if (!exists) {
                        let payload = 
                        fetch('https://localhost:44345/api/Phamacies', {
                            method: 'post',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                "phamacyNumber": PhamacyNumber + "",
                                "phamacyName": PhamacyName + "",
                                "phamacyContact": PhamacyContact + "",
                                "phamacyEmail": PhamacyEmail + "",
                                "phamacyLicenceNumber": Number(PhamacyLicenceNumber)
                            })
                        })
                            .then(res => res.json)
                            .then(res => {
                                console.log("Result:", res);
                                alert("Success");
                                router.push("/Phamacies");
                            })
                            .catch(err => {
                                console.log("Error result:", err);
                                alert(err);
                            });
                    }
                })
                .catch(err => alert("Error fetching data from api", err))
        }

    }
    return (
        <div className="container">
            <div className="signin-form">
                <h1 className="my-2">Add new phamacy</h1>
                <hr />
                <div className="form-group">
                    <label className="control-label" htmlFor="name">Phamacy Number</label>
                    <input
                        className="form-control"
                        type="number"
                        required
                        id='number'
                        onChange={e => setPhamacyNumber(e.target.value)}
                    />
                    <div id="number_error" className="invalid-feedback">
                        Please enter a valid 12 digit number!!!
                    </div>
                </div>

                <div className="form-group">
                    <label className="control-label" htmlFor="name">Phamacy Name</label>
                    <input
                        className="form-control"
                        type="text"
                        id='name' name='name'
                        onChange={e => setPhamacyName(e.target.value)}
                    />
                    <div id="name_error" className="invalid-feedback">
                        Please enter a valid name.
                    </div>
                </div>


                <div className="form-group">
                    <label htmlFor="contact" className="control-label">Contact Number</label>
                    <input
                        className="form-control"
                        type="number"
                        id='contact' name='contact'
                        onChange={e => setPhamacyContact(e.target.value)}
                    />
                    <div id="contact_error" className="invalid-feedback">
                        Please enter a valid 10 digit contact number that starts with 0.
                    </div>
                </div>

                <div className="form-group">
                    <label asp-for="email" className="control-label">Email</label>
                    <input
                        className="form-control"
                        type="email"
                        id='email' name='email'
                        onChange={e => setPhamacyEmail(e.target.value)}
                    />
                    <div id="email_error" className="invalid-feedback">
                        Please enter a valid email address.
                    </div>
                </div>

                <div className="form-group">
                    <label className="control-label">Licence Number</label>
                    <input
                        className="form-control"
                        type="number"
                        required
                        id='licence'
                        onChange={e => setPhamacyLicenceNumber(e.target.value)}
                    />
                    <div id="licence_error" className="invalid-feedback">
                        Please enter a valid 6 digit licence number.
                    </div>
                </div>

                <div className="form-group mt-2 my-4 d-flex justify-content-around">
                    <Link href="/Phamacies">
                        <a className="btn btn-warning">Back to List</a>
                    </Link>
                    <span className="btn btn-primary" onClick={handleData}>ADD</span>
                </div>
            </div>
        </div>
    )
}

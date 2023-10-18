import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Add() {
    let router = useRouter();
    const [phamacistNumber, setPhamacistNumber] = useState("");
    const [phamacistName, setPhamacistName] = useState("");
    const [phamacistSurname, setPhamacistSurname] = useState("");
    const [phamacistContact, setPhamacistContact] = useState("");
    const [phamacistEmail, setPhamacistEmail] = useState("");
    const [phamacistRegistrationNumber, setPhamacistRegistrationNumber] = useState("");
    const [phamacyNumber, setPhamacyNumber] = useState("");
    const [phamacy, setPhamacy] = useState(null);
    const [phamacies, setPhamacies] = useState([]);

    // -------------

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
    
    let handlePhamacy = (e) => {
        setPhamacyNumber(e.target.value);
        phamacies.map((item, index) => {
            if (item.phamacyNumber === e.target.value) {
                setPhamacy(item);
            }
        })
    }

    let handleSubmit = () => {

        let errors = 0;
        if (!phamacistNumber || phamacistNumber.length !== 12) {
            displayError("number");
            errors += 1;
        } else {
            removeError("number");
        }

        if (!phamacistName) {
            displayError("name");
            errors += 1;
        } else {
            removeError("name");
        }

        if (!phamacistSurname) {
            displayError("surname");
            errors += 1;
        } else {
            removeError("surname");
        }

        if (!validateEmail(phamacistEmail)) {
            displayError("email");
            errors += 1;
        } else {
            removeError("email");
        }

        if ((phamacistContact[0] !== "0") || (phamacistContact.length !== 10)) {
            displayError("contact");
            errors += 1;
        } else {
            removeError("contact");
        }

        if ((!phamacistRegistrationNumber) || (phamacistRegistrationNumber.length !== 6)) {
            displayError("registrationNumber");
            errors += 1;
        } else {
            removeError("registrationNumber");
        }

        if (!phamacyNumber) {
            displayError("phamacyNumber");
            errors += 1;
        } else {
            removeError("phamacyNumber");
        }

        if (errors === 0) {
            let payload = {
                "phamacistNumber": phamacistNumber,
                "phamacistName": phamacistName,
                "phamacistSurname": phamacistSurname,
                "phamacistContact": phamacistContact,
                "phamacistEmail": phamacistEmail,
                "phamacistRegistrationNumber": phamacistRegistrationNumber,
                "phamacyNumber": phamacyNumber
            }
            console.log(JSON.stringify(payload));

            fetch("https://localhost:44345/api/Phamacists")
                .then(res => res.json())
                .then(res => {
                    let found = false;
                    res.map((item, index) => {
                        if (item.phamacistNumber === phamacistNumber) {
                            found = true;
                            alert("Phamacist number already exists!!!");
                        }
                    })
                    if (!found) {
                        fetch('https://localhost:44345/api/Phamacists', {
                            method: "POST",
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload),
                        })
                            .then(res => res.json())
                            .then(() => {
                                alert("Success");
                                router.push("/Phamacists");
                            })
                            .catch(err => {
                                console.log("Error:", err);
                                alert("Error: " + err)
                            })
                    }
                })
                .catch(err => {
                    alert("Error fetching data!!!");
                    console.log("Error:", err);
                })
        }
    }
    // ----------------------------------------------------

    useEffect(() => {
        fetch('https://localhost:44345/api/Phamacies')
            .then(res => res.json())
            .then(res => {
                
                setPhamacies(res);
                setPhamacyNumber(res.length > 0 ? (res[0].phamacyNumber) : "")
            })
            .catch(err => {
                console.log("Error getting data from api:", err);
                alert(err)
            })
    }, [])
    return (
        <div className="container">
            <h1>Create</h1>

            <h4>Phamacist</h4>
            <hr />
            <div className="signin-form">

                <div className="form-group">
                    <label className="control-label">Phamacist Number</label>
                    <input
                        id="number" className="form-control"
                        type="number"
                        onChange={e => setPhamacistNumber(e.target.value)}
                    />
                    <span id="number_error" className="invalid-feedback">
                        Enter a valid 12 digit number
                    </span>
                </div>

                <div className="form-group">
                    <label className="control-label">Phamacist Name</label>
                    <input
                        id="name" className="form-control"
                        onChange={e => setPhamacistName(e.target.value)}
                    />
                    <span id="name_error" className="invalid-feedback">
                        Enter a valid name
                    </span>
                </div>

                <div className="form-group">
                    <label className="control-label">Phamacist Surname</label>
                    <input
                        id="surname" className="form-control"
                        onChange={e => setPhamacistSurname(e.target.value)}
                    />
                    <span id="surname_error" className="invalid-feedback">Enter a valid surname</span>
                </div>

                <div className="form-group">
                    <label className="control-label">Phamacist Contact</label>
                    <input
                        id="contact" className="form-control"
                        onChange={e => setPhamacistContact(e.target.value)}
                    />
                    <span id="contact_error" className="invalid-feedback">
                        Enter a valid 10 digit contact number
                    </span>
                </div>

                <div className="form-group">
                    <label className="control-label">Phamacst Email</label>
                    <input
                        id="email" className="form-control"
                        onChange={e => setPhamacistEmail(e.target.value)}
                    />
                    <span id="email_error" className="invalid-feedback">
                        Enter a valid email
                    </span>
                </div>

                <div className="form-group">
                    <label className="control-label">Phamacist Registration Number</label>
                    <input
                        id="registrationNumber" className="form-control"
                        onChange={e => setPhamacistRegistrationNumber(e.target.value)}
                    />
                    <span id="registrationNumber_error" className="invalid-feedback">
                        Enter a valid 6 digit number
                    </span>
                </div>

                <div className="form-group">
                    <label className="control-label">Phamacy</label>
                    <select
                        name="phamacyNumber" id="phamacyNumber"
                        className="form-control"
                        onChange={e => handlePhamacy(e)}
                    >
                        {phamacies.map((item, index) => (
                            <option value={item.phamacyNumber} key={index}>
                                {item.phamacyName} - {item.phamacyNumber}
                            </option>
                        ))}
                    </select>
                    {/* <input id="phamacyNumber" className="form-control" /> */}
                    <span id="phamacyNumber_error" className="invalid-feedback">
                        Select a phamacy
                    </span>
                </div>

                <div className="form-group mt-2 my-4 d-flex justify-content-around">
                    <Link href="/Phamacists">
                        <a className="btn btn-warning">Back to List</a>
                    </Link>
                    <span className="btn btn-primary" onClick={handleSubmit}>SUBMIT</span>
                </div>
            </div>
        </div>
    )
}

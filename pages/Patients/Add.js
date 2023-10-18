import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Add() {
    let router = useRouter();
    const [patientNumber, setPatientNumber] = useState("");
    const [patientName, setPatientName] = useState("");
    const [patientSurname, setPatientSurname] = useState("");
    const [patientAddress, setPatientAddress] = useState("");
    const [patientContact, setPatientContact] = useState("");
    const [patientEmail, setPatientEmail] = useState("");
    const [patientDOB, setPatientDOB] = useState("");

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
    
    let validateDate = () => {
        let currentDate = new Date();
        let dt = Date.parse(patientDOB);
        return dt < Date.parse(currentDate);
    }

    let handleSubmit = () => {
        console.log(validateDate());
        
        let errors = 0;
        if (!patientNumber || patientNumber.length !== 12) {
            displayError("number");
            errors += 1;
        } else {
            removeError("number");
        }

        if (!patientName) {
            displayError("name");
            errors += 1;
        } else {
            removeError("name");
        }

        if (!patientSurname) {
            displayError("surname");
            errors += 1;
        } else {
            removeError("surname");
        }

        if (!validateEmail(patientEmail)) {
            displayError("email");
            errors += 1;
        } else {
            removeError("email");
        }

        if ((patientContact[0] !== "0") || (patientContact.length !== 10)) {
            displayError("contact");
            errors += 1;
        } else {
            removeError("contact");
        }
        
        if ((!patientAddress) || (patientAddress.length < 10)) {
            displayError("address");
            errors += 1;
        } else {
            removeError("address");
        }
        
        if (!validateDate()) {
            displayError("dob");
            errors += 1;
        } else {
            removeError("dob");
        }
        
        if(errors === 0) {
            let payload = {
                "patientNumber": patientNumber,
                "patientName": patientName,
                "patientSurname": patientSurname,
                "patientAddress": patientAddress,
                "patientContact": Number(patientContact),
                "patientEmail": patientEmail,
                "patientDOB": patientDOB
                }
            console.log(payload);
            
            fetch("https://localhost:44345/api/Patients")
            .then(res => res.json())
            .then(res => {
                let found = false;
                res.map((item, index) => {
                    if(item.patientNumber === patientNumber) {
                        found = true;
                        alert("Patient number already exists!!!");
                    }
                })
                if(!found) {
                    fetch('https://localhost:44345/api/Patients', {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                    })
                    .then(res => res.json())
                    .then(() => {
                        alert("Success");
                        router.push("/Patients");
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
    return (
        <div className="container">
            <h4>Add Patient</h4>
            <hr />
            <div className="row">
                <div>
                    <div className="form-group mt-2">
                        <label className="control-label">Patient ID</label>
                        <input
                            id="number" className="form-control"
                            type="number"
                            onChange={e => setPatientNumber(e.target.value)}
                        />
                        <span id="number_error" className="invalid-feedback">
                            Enter a valid 12 digit number
                        </span>
                    </div>
                    
                    <div className="form-group mt-2">
                        <label className="control-label">Patient Name</label>
                        <input
                            id="name" className="form-control"
                            onChange={e => setPatientName(e.target.value)}
                        />
                        <span id="name_error" className="invalid-feedback">
                            Enter a valid name
                        </span>
                    </div>
                    
                    <div className="form-group mt-2">
                        <label className="control-label">Patient Surname</label>
                        <input
                            id="surname" className="form-control"
                            onChange={e => setPatientSurname(e.target.value)}
                        />
                        <span id="surname_error" className="invalid-feedback">
                            Enter a valid surname
                        </span>
                    </div>
                    
                    <div className="form-group mt-2">
                        <label className="control-label">Patient Address</label>
                        <input
                            id="address" className="form-control"
                            onChange={e => setPatientAddress(e.target.value)}
                        />
                        <span id="address_error" className="invalid-feedback">
                            Enter a valid physical address with at least 10 characters
                        </span>
                    </div>
                    
                    <div className="form-group mt-2">
                        <label className="control-label">Patient Contact</label>
                        <input
                            id="contact" className="form-control"
                            type="number"
                            onChange={e => setPatientContact(e.target.value)}
                        />
                        <span id="contact_error" className="invalid-feedback">
                            Enter a valid 10 digit contact number
                        </span>
                    </div>
                    
                    <div className="form-group mt-2">
                        <label className="control-label">Patient Email</label>
                        <input
                            id="email" className="form-control"
                            type="email"
                            onChange={e => setPatientEmail(e.target.value)}
                        />
                        <span id="email_error" className="invalid-feedback">
                            Enter a valid email address
                        </span>
                    </div>
                    
                    <div className="form-group mt-2">
                        <label asp-for="dob" className="control-label">Date of Birth</label>
                        <input
                            id="dob" className="form-control"
                            type="datetime-local"
                            onChange={e => setPatientDOB(e.target.value)}
                        />
                        <span id="dob_error" className="invalid-feedback">
                            Select a valid date of birth
                        </span>
                    </div>
                    
                    <div className="form-group mt-2 my-4 d-flex justify-content-around">
                        <Link href="/Patients">
                            <a className="btn btn-warning">Back to List</a>
                        </Link>
                        <span className="btn btn-primary" onClick={handleSubmit}>SUBMIT</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

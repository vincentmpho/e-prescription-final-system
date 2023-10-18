import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Add() {
    const router = useRouter();

    const [practiceNumber, setPracticeNumber] = useState(null);
    const [name, setName] = useState(null);
    const [address, setAddress] = useState(null);
    const [contact, setContact] = useState(null);
    const [email, setEmail] = useState(null);
    
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
    
    let handleSubmit = () => {

        let errors = 0;
        if (!practiceNumber || practiceNumber.length !== 12) {
            displayError("practiceNumber");
            errors += 1;
        } else {
            removeError("practiceNumber");
        }

        if (!name) {
            displayError("name");
            errors += 1;
        } else {
            removeError("name");
        }

        if (!validateEmail(email)) {
            displayError("email");
            errors += 1;
        } else {
            removeError("email");
        }

        if ((!contact) || (contact[0] !== "0") || (contact.length !== 10)) {
            displayError("contact");
            errors += 1;
        } else {
            removeError("contact");
        }

        if ((!address) || (address.length < 10)) {
            displayError("address");
            errors += 1;
        } else {
            removeError("address");
        }

        if (errors === 0) {
            let payload = {
                "practiceNumber": practiceNumber,
                "name": name,
                "address": address,
                "contact": contact,
                "email": email
            }
            console.log(payload);

            fetch("https://localhost:44345/api/MedicalPractices")
                .then(res => res.json())
                .then(res => {
                    let found = false;
                    res.map((item, index) => {
                        if (item.practiceNumber === practiceNumber) {
                            found = true;
                            alert("Medical Practice number already exists!!!");
                        }
                    })
                    if (!found) {
                        fetch('https://localhost:44345/api/MedicalPractices', {
                            method: "POST",
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload),
                        })
                            .then(() => {
                                alert("Success");
                                router.push("/MedicalPractices");
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
            <h1 className="my-3">Create a new Medical Practice</h1>
            <hr />

            <div className="form-group">
                <label className="control-label">Practice Number</label>
                <input
                    id="practiceNumber" className="form-control"
                    type="number"onChange={e => setPracticeNumber(e.target.value)}
                />
                <span id="practiceNumber_error" className="invalid-feedback">
                    Enter a valid 12 digit practice number
                </span>
            </div>
            
            <div className="form-group">
                <label className="control-label">Contact</label>
                <input
                    id="contact" className="form-control"
                    type="number"
                    onChange={e => setContact(e.target.value)}
                />
                <span id="contact_error" className="invalid-feedback">
                    Enter a valid 10 digit contact number
                </span>
            </div>
            
            <div className="form-group">
                <label className="control-label">Medical Practice Name</label>
                <input
                    id="name" className="form-control"
                    onChange={e => setName(e.target.value)}
                />
                <span id="name_error" className="invalid-feedback">
                    Enter a valid name
                </span>
            </div>
            
            <div className="form-group">
                <label asp-for="Address" className="control-label">Address</label>
                <input
                    id="address" className="form-control"
                    onChange={e => setAddress(e.target.value)}
                />
                <span id="address_error" className="invalid-feedback">
                    Enter a valid address
                </span>
            </div>
            
            <div className="form-group">
                <label className="control-label">Email</label>
                <input
                    id="email" className="form-control"
                    type="email"
                    onChange={e => setEmail(e.target.value)}
                />
                <span id="email_error" className="invalid-feedback">
                    Enter a valid email address
                </span>
            </div>
            <div className="form-group mt-2 my-4 d-flex justify-content-around">
                <Link href="/MedicalPractices">
                    <a className="btn btn-warning">Back to List</a>
                </Link>
                <span className="btn btn-primary" onClick={handleSubmit}>SUBMIT</span>
            </div>
        </div>
    )
}

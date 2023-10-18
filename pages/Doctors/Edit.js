import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Edit() {
    let router = useRouter();
    let { id } = router.query;
    
    const [DoctorNumber, setDoctorNumber] = useState(null);
    const [DoctorName, setDoctorName] = useState(null);
    const [DoctorSurname, setDoctorSurname] = useState(null);
    const [DoctorContact, setDoctorContact] = useState(null);
    const [DoctorEmail, setDoctorEmail] = useState(null);
    const [DoctorQualification, setDoctorQualification] = useState(null);
    const [DoctorPracticeNumber, setDoctorPracticeNumber] = useState(null);
    const [DoctorHCRN, setDoctorHCRN] = useState(null);

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
        if (!DoctorNumber || DoctorNumber.length !== 12) {
            displayError("number");
            errors += 1;
        } else {
            removeError("number");
        }

        if (!DoctorName) {
            displayError("name");
            errors += 1;
        } else {
            removeError("name");
        }

        if (!DoctorSurname) {
            displayError("surname");
            errors += 1;
        } else {
            removeError("surname");
        }

        if (!DoctorEmail || !validateEmail(DoctorEmail)) {
            displayError("email");
            errors += 1;
        } else {
            removeError("email");
        }

        if (!DoctorContact || (DoctorContact[0] !== "0") || (DoctorContact.length !== 10)) {
            displayError("contact");
            errors += 1;
        } else {
            removeError("contact");
        }

        if (!DoctorPracticeNumber || (DoctorPracticeNumber + "").length !== 6) {
            displayError("practice");
            errors += 1;
        } else {
            removeError("practice");
        }

        if (!DoctorQualification || DoctorQualification.length <= 3) {
            displayError("qualification");
            errors += 1;
        } else {
            removeError("qualification");
        }

        if (!DoctorHCRN || (DoctorHCRN + "").length !== 5) {
            displayError("hcrn");
            errors += 1;
        } else {
            removeError("hcrn");
        }


        if (errors === 0) {
            fetch(`https://localhost:44345/api/Doctors/${DoctorNumber}`, {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "doctorNumber": DoctorNumber + "",
                    "doctorName": DoctorName + "",
                    "doctorSurname": DoctorSurname + "",
                    "doctorContact": DoctorContact + "",
                    "doctorEmail": DoctorEmail + "",
                    "doctorQualification": DoctorQualification + "",
                    "doctorPracticeNumber": Number(DoctorPracticeNumber),
                    "doctorHCRN": Number(DoctorHCRN)
                })
            })
                .then(res => {
                    console.log("Result:", res);
                    alert("Success");
                    router.push("/Doctors");
                })
                .catch(err => {
                    console.log("Error result:", err);
                    alert(err);
                });
        }

    }

    useEffect(() => {
        fetch(`https://localhost:44345/api/Doctors/${id}`)
            .then(res => res.json())
            .then(res => {
                console.log('====================================');
                console.log(res);
                console.log('====================================');
                // ---------------------------
                setDoctorNumber(res.doctorNumber);
                setDoctorName(res.doctorName);
                setDoctorSurname(res.doctorSurname);
                setDoctorContact(res.doctorContact);
                setDoctorEmail(res.doctorEmail);
                setDoctorQualification(res.doctorQualification);
                setDoctorPracticeNumber(res.doctorPracticeNumber);
                setDoctorHCRN(res.doctorHCRN);
                // ---------------------------

                document.getElementById("number").placeholder = res.doctorNumber;
                document.getElementById("name").placeholder = res.doctorName;
                document.getElementById("surname").placeholder = res.doctorSurname;
                document.getElementById("contact").placeholder = res.doctorContact;
                document.getElementById("email").placeholder = res.doctorEmail;
                document.getElementById("qualification").placeholder = res.doctorQualification;
                document.getElementById("practice").placeholder = res.doctorPracticeNumber;
                document.getElementById("hcrn").placeholder = res.doctorHCRN;

                document.getElementById("number").value = res.doctorNumber;
                document.getElementById("name").value = res.doctorName;
                document.getElementById("surname").value = res.doctorSurname;
                document.getElementById("contact").value = res.doctorContact;
                document.getElementById("email").value = res.doctorEmail;
                document.getElementById("qualification").value = res.doctorQualification;
                document.getElementById("practice").value = res.doctorPracticeNumber;
                document.getElementById("hcrn").value = res.doctorHCRN;
            })
            .catch(err => {
                alert(err);
            })
    }, [])
    return (
        <div className="container">
            <h1>Edit doctor record</h1>
            <div className="signin-form">
                <div className="form-group">
                    <label className="control-label" htmlFor="name">Doctor Number</label>
                    <input
                        className="form-control"
                        type="number"
                        disabled
                        id='number' name='name'
                        onChange={e => setDoctorNumber(e.target.value)}
                    />
                    <div id="number_error" className="invalid-feedback">
                        Please enter a valid 12 digit number!!!
                    </div>
                </div>

                <div className="form-group">
                    <label className="control-label" htmlFor="name">Name</label>
                    <input
                        className="form-control"
                        type="text"
                        id='name' name='name'
                        onChange={e => setDoctorName(e.target.value)}
                    />
                    <div id="name_error" className="invalid-feedback">
                        Please enter a valid name.
                    </div>
                </div>

                <div className="form-group">
                    <label className="control-label">Surname</label>
                    <input
                        className="form-control"
                        type="text"
                        id='surname' name='surname'
                        onChange={e => setDoctorSurname(e.target.value)}
                    />
                    <div id="surname_error" className="invalid-feedback">
                        Please enter a valid surname.
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="contact" className="control-label">Contact Number</label>
                    <input
                        className="form-control"
                        type="number"
                        id='contact' name='contact'
                        onChange={e => setDoctorContact(e.target.value)}
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
                        onChange={e => setDoctorEmail(e.target.value)}
                    />
                    <div id="email_error" className="invalid-feedback">
                        Please enter a valid email address.
                    </div>
                </div>

                <div className="form-group">
                    <label className="control-label">Qualification</label>
                    <input
                        className="form-control"
                        required
                        id='qualification' name='qualification'
                        onChange={e => setDoctorQualification(e.target.value)}
                    />
                    <div id="qualification_error" className="invalid-feedback">
                        Please enter a valid qualification.
                    </div>
                </div>

                <div className="form-group">
                    <label className="control-label">Practice Number</label>
                    <input
                        className="form-control"
                        type="number"
                        required
                        id='practice' name='practice'
                        onChange={e => setDoctorPracticeNumber(e.target.value)}
                    />
                    <div id="practice_error" className="invalid-feedback">
                        Please enter a valid 6 digit practice number.
                    </div>
                </div>

                <div className="form-group">
                    <label className="control-label">Health Council Registration Number</label>
                    <input
                        className="form-control"
                        required
                        id='hcrn' name='hcrn'
                        onChange={e => setDoctorHCRN(e.target.value)}
                    />
                    <div id="hcrn_error" className="invalid-feedback">
                        Please enter a valid 5 digit Health Council Registration Number.
                    </div>
                </div>

                <div className="form-group mt-2 my-4 d-flex justify-content-around">
                    <Link href="/Doctors">
                        <a className="btn btn-warning">Back to List</a>
                    </Link>
                    <span className="btn btn-primary" onClick={handleData}>SUBMIT</span>
                </div>
            </div>
        </div>
    )
}

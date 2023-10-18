import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Edit() {
    let router = useRouter();
    const { id } = router.query;

    const [original, setOriginal] = useState(null)
    const [phamacistNumber, setPhamacistNumber] = useState("");
    const [phamacistName, setPhamacistName] = useState("");
    const [phamacistSurname, setPhamacistSurname] = useState("");
    const [phamacistContact, setPhamacistContact] = useState("");
    const [phamacistEmail, setPhamacistEmail] = useState("");
    const [phamacistRegistrationNumber, setPhamacistRegistrationNumber] = useState("");
    const [phamacyNumber, setPhamacyNumber] = useState("");
    const [phamacies, setPhamacies] = useState([]);

    // -------------

    let dataChanged = (load) => {

        if (load.phamacistContact !== original.phamacistContact) {
            return true;
        }
        if (load.phamacistEmail !== original.phamacistEmail) {
            return true;
        }
        if (load.phamacistName !== original.phamacistName) {
            return true;
        }
        if (load.phamacistNumber !== original.phamacistNumber) {
            return true;
        }
        if (load.phamacistRegistrationNumber !== original.phamacistRegistrationNumber) {
            return true;
        }
        if (load.phamacistSurname !== original.phamacistSurname) {
            return true;
        }
        if (load.phamacyNumber !== original.phamacyNumber) {
            return true;
        }
        return false
    }

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
            console.log(payload);
            console.log(original);
            if (dataChanged(payload)) {
                fetch(`https://localhost:44345/api/Phamacists/${id}`, {
                    method: "put",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                })
                    .then(() => {
                        alert("Success");
                        router.push("/Phamacists");
                    })
                    .catch(err => {
                        console.log("Error:", err);
                        alert("Error: " + err)
                    })
            } else {
                alert("No changes were made!!!")
            }
        }
    }
    // ----------------------------------------------------

    useEffect(() => {
        fetch('https://localhost:44345/api/Phamacies')
            .then(res => res.json())
            .then(res => {
                setPhamacies(res);
            })
            .catch(err => {
                console.log("Error getting data from api:", err);
                alert(err)
            })

        fetch(`https://localhost:44345/api/Phamacists/${id}`)
            .then(res => res.json())
            .then(res => {
                setOriginal(res);

                setPhamacistNumber(res.phamacistNumber)
                setPhamacistName(res.phamacistName)
                setPhamacistSurname(res.phamacistSurname)
                setPhamacistContact(res.phamacistContact)
                setPhamacistEmail(res.phamacistEmail)
                setPhamacistRegistrationNumber(res.registrationNumber)
                setPhamacyNumber(res.phamacyNumber)

                document.getElementById("number").placeholder = res.phamacistNumber;
                document.getElementById("name").placeholder = res.phamacistName;
                document.getElementById("surname").placeholder = res.phamacistSurname;
                document.getElementById("contact").placeholder = res.phamacistContact;
                document.getElementById("email").placeholder = res.phamacistEmail;
                document.getElementById("registrationNumber").placeholder = res.phamacistRegistrationNumber;
                document.getElementById("phamacyNumber").placeholder = res.phamacyNumber;

                document.getElementById("number").value = res.phamacistNumber;
                document.getElementById("name").value = res.phamacistName;
                document.getElementById("surname").value = res.phamacistSurname;
                document.getElementById("contact").value = res.phamacistContact;
                document.getElementById("email").value = res.phamacistEmail;
                document.getElementById("registrationNumber").value = res.phamacistRegistrationNumber;
                document.getElementById("phamacyNumber").value = res.phamacyNumber;
            })
            .catch(err => {
                console.log("Error getting data from api:", err);
                alert(err)
            })
    }, [])

    return (
        <div className="container">

            <h1 className="my-2">Edit</h1>

            <div className="signin-form">

                <div className="form-group">
                    <label className="control-label">Phamacist Number</label>
                    <input
                        id="number" className="form-control"
                        type="number"
                        disabled
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
                        Enter a valid email address
                    </span>
                </div>

                <div className="form-group">
                    <label className="control-label">Phamacist Registration Number</label>
                    <input
                        id="registrationNumber" className="form-control"
                        onChange={e => setPhamacistRegistrationNumber(e.target.value)}
                    />
                    <span id="registrationNumber_error" className="invalid-feedback">
                        Enter a valid 6 digit registration number
                    </span>
                </div>

                <div className="form-group">
                    <label className="control-label">Phamacy</label>
                    <select
                        name="phamacyNumber" id="phamacyNumber"
                        className="form-control"
                        onChange={e => setPhamacyNumber(e.target.value)}
                    >
                        {phamacies.map((item, index) => (
                            <option value={item.phamacyNumber} key={index}>
                                {item.phamacyName} - {item.phamacyNumber}
                            </option>
                        ))}
                    </select>
                    {/* <input id="phamacyNumber" className="form-control" /> */}
                    <span id="phamacyNumber_error" className="invalid-feedback"></span>
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
